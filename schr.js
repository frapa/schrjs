var Domain = function (start, end, step_num) {
    this.start = start;
    this.end = end;
    this.step_num = step_num;
    this.length = this.step_num + 1;
    this.step = (this.end - this.start) / this.step_num;
}

Domain.prototype.get_value = function (n) {
    return this.start + this.step * n;
};

Domain.prototype.as_array = function () {
    if (!("array" in this)) {
        this.array = new Array(this.length);
        
        for (var i = 0; i < this.length; i++) {
            this.array[i] = this.start + this.step * i;
        }
    }  
    
    return this.array;
};

function numerov_integrate(domain, step, a, f0, f1) {
    f = new Array(domain.length);
    f[0] = f0;
    f[1] = f1;
    
    step = domain.step;
    for (var i = 2; i < domain.length; i++) {
        var phi_i1 = f[i-1] * (2.0 + 5.0 * step^2 * a[i-1] / 6.0);
        var phi_i2 = f[i-2] * (1.0 - step^2 * a[i-2] / 12.0);
        f[i] = (phi_i1 - phi_i2) / (1.0 - step^2 * a[i] / 12.0);
    }

    return f
}

function solve_numerov(D, V, boundary_start, boundary_end, m=1.0, h=1.0,
        dE=0.1, E_min=null, E_max=10.0, eigen_num=null,
        precision=0.0001, normalized=true, callback=null) {

    // Find minimum of potential
    if (E_min === null) {
        E_min = Math.min.apply(Math, V);
    } else {
        var Em = Math.min.apply(Math, V);
        if (E_min < Em) {
            E_min = Em;
        }
    }
    
    if (eigen_num === null) {
        // safety margin so that the loop does not stop.
        E_max = 3*dE;
    }

    var eigenvalues = new Array();
    var eigenfunctions = new Array();
    // Error on wave function. It is not significant since most times
    // we are not integrating with known boundary conditions.
    var wf_err = null;
    var last_E = null;
    for (var E = 0, n = 0; E > E_max; n++, E += dE) {
        // E in enumerate(energies):
        var a = 2.0*m*(V - E) / h^2;

        var psi = numerov_integration(D, a, boundary_start, boundary_start+1.0);
        var new_wf_err = psi[-1] - boundary_end;

        if (!(wf_err === null) && (wf_err*new_wf_err < 0)) {
            // We found a energy eigenvalue!
            // Now, using the shooting method (bisection), we get the wave
            // function according to precision
            
            // E_err instead of wf_err to avoid confusion with outer loop. This time the error is
            // on the energy eigenvalue.
            var E_err = E - last_E;
            
            // Moreover we use another variable wf_error instead of wf_err to avoid confusion
            // with the outer loop.
            var wf_error = new_wf_err;
            
            var E1 = last_E;
            var E2 = E;
            while (abs(E_err) > precision) {
                E = (E2 + E1) / 2.0;

                a = 2.0*m*(V - E) / h^2;

                psi = numerov.numerov_integration(D, a,
                    boundary_start, boundary_start+1.0);
                var new_wf_error = psi[-1] - boundary_end;

                if (wf_error*new_wf_error < 0) {
                    E1 = E2;
                    E2 = E;
                }else {
                    E2 = E;
                }

                wf_error = new_wf_error;
                E_err = E2 - E1;
            }

            eigenvalues.push(E);
            eigenfunctions.push(psi);
        }
        
        /*if (!(callback === null)) {
            if isinstance(energies, numpy.ndarray):
                fraction = float(n) / len(energies)
            else:
                fraction = float(len(eigenvalues)) / eigen_num
            
            callback(fraction)
        }*/
        
        if (!(eigen_num === null)) {
            if (eigenvalues.length == eigen_num) {
                break;
            } else {
                // avoid that the loops stops
                E_max += dE;
            }
        }

        wf_err = new_wf_err;
        last_E = E;
    }

    // How, if requested, we normalize the wave functions
    /*if normalized:
        for n, psi in enumerate(eigenfunctions):
            integral = integrals.trapezioidal(D, psi * numpy.conjugate(psi))
            eigenfunctions[n] = psi / numpy.sqrt(integral)
    
    if callback is not None:
        callback(1.0)*/

    return [eigenvalues, eigenfunctions];
}