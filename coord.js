function solve() {
    // Take inputs
    var pot_ele = document.getElementById("potential");
    var pot_text = pot_ele.value;
    
    var npoint_ele = document.getElementById("npoint");
    var int_start_ele = document.getElementById("int_start");
    var int_end_ele = document.getElementById("int_end");
    var npoint = parseFloat(npoint_ele.value);
    var int_start = parseFloat(int_start_ele.value);
    var int_end = parseFloat(int_end_ele.value);
    
    var b_start_ele = document.getElementById("b_start");
    var b_end_ele = document.getElementById("b_end");
    var b_start = parseFloat(b_start_ele.value);
    var b_end = parseFloat(b_end_ele.value);
    
    var E_start_ele = document.getElementById("E_start");
    var E_end_ele = document.getElementById("E_end");
    var E_start = parseFloat(E_start_ele.value);
    var E_end = parseFloat(E_end_ele.value);
    
    // Domain
    var D = new Domain(int_start, int_end, npoint);
    
    // Parse potential and build potential array
    var parser = Parser.parse(pot_text);
    var V = new Array(D.length);
    D.as_array().forEach(function (x, i, D_) {
        V[i] = parser.evaluate({x: x});
    })
    
    var worker = new Worker('schr.js');
    worker.addEventListener('message', function(e) {
        var data = e.data;
        switch (data.msg) {
            case 'started':
				show_popup("wait_popup");
				hide_popup('right_col_content');
                break;
            case 'finished':
				hide_popup("wait_popup");
				show_popup('right_col_content');
                display(D, V, data.ev, data.ef, data.t);
                break;
        };
    }, false);
    worker.postMessage({cmd: "start", D: D, V: V, bs: b_start, be: b_end,
        Es: E_start, Ee: E_end});
}
