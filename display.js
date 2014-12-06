function transpose(a) {
	var newArray = a[0].map(function(col, i) { 
		return a.map(function(row) { 
		return row[i] 
		})
	});
	return newArray
}

function array2csv(D, ef) {
    var csv = "";
    
    for (var i = 0; i < D.length; i++) {
        csv += D.get_value(i) + ",";
        
        for (var n = 0; n < ef.length; n++) {
            csv += ef[n][i];
            
            if (n != ef.length - 1) {
                csv += ",";
            }
        }
        
        csv += "\n";
    }
	
    return csv;
}

function create_data(D,ef,ev) {
	//var resultsT2 = [['x'],['Y1'],['Y2']];
	var Da = D.array;
	//var results = [Da,ef[0],ef[1],ef[3],ef[4],ef[5],ef[6],ef[7]]; 	//funziona solo per un array ef di dimensione 2xY con Y arbitrario! <-- FIX THIS SHIT
	var results = [Da,ef[0]];
	for (var i = 1; i < ev.length; i++) {
        results.push(ef[i]);											//questo dovrebbe funzionare... almeno mi pare. è dinamico..?
	}
        
	var resultsT = transpose(results);
	//resultsT2.push.apply(resultsT2,resultsT);
	//console.log(resultsT2)
	return resultsT
}

function create_V_data(D,V) {
	var Da = D.array;
	var results = [Da,V];
	var resultsT = transpose(results);
	return resultsT
}

//dominio, potential, eigenvalues, eigenfunction, computation time
function display(D, V, ev, ef, t=0) {
    
    //console.log("ev",ev);
    
    g = new Dygraph(
		document.getElementById("graphup"),
		create_data(D,ef,ev),//array2csv(D, ef),
		{
		legend: 'always',
		labelsDiv: document.getElementById('labelsSX'),
		labelsSeparateLines: true,
		//labels: ["X", "Y1", "Y2"]										//usare l'array ev possibilmente in seguito
		}
		);
    //console.log(array2csv(D, ef));
    
    f = new Dygraph(
		document.getElementById("graphdown"),
		create_V_data(D,V),
		{
		legend: 'always',
		labelsDiv: document.getElementById('labelsDX'),
		labelsSeparateLines: true,
		labels: ["X", "potenziale"]
		}
		);
		
	/*pot = new Dygraph(
		document.getElementById("potential"),
		create_data(D,V),
		{
		legend: 'always',
		labelsDiv: document.getElementById('labelsSX'),
		labelsSeparateLines: true
		}
		);*/
}

function show_popup(name) {
	var popup = document.getElementById(name);
	popup.style.visibility = "visible";
}

function hide_popup(name) {
	var popup = document.getElementById(name);
	popup.style.visibility = "hidden";
}

function norm_check() {
	var norm = document.getElementById("norm");
	var prob = document.getElementById("prob");
	if (norm.checked == false) {
		prob.checked = false;
		prob.setAttribute('disabled', 'disabled');
	}
	if (norm.checked == true) {
		prob.removeAttribute('disabled');
	}
}

function examples(i) {
	var pot = document.getElementById("potential");
    var int_start = document.getElementById("int_start");
    var int_end = document.getElementById("int_end");    
    var npoint = document.getElementById("npoint");
    var b_start = document.getElementById("b_start");
    var b_end = document.getElementById("b_end");
    var E_start = document.getElementById("E_start");
    var E_end = document.getElementById("E_end");
    var E_number = document.getElementById("E_number");
    var dE = document.getElementById("dE");
    
	if (i == 0) {
		pot.value='0';
		int_start.value='-1';
		int_end.value='1';
		npoint.value='250';
		b_start.value='1';
		b_end.value='2';
		E_start.value='0';
		E_end.value='10';
		E_number.value='';
		dE.value='';
		//planck.defaultSelected;
	}
	if (i == 1) {
		pot.value='0';
		int_start.value='-3.5';
		int_end.value='3.5';
		npoint.value='5000';
		b_start.value='0';
		b_end.value='0';
		E_start.value='0';
		E_end.value='1000';
		E_number.value='';
		dE.value='';
		//planck.defaultSelected;
	}
	if (i == 2) {
		pot.value='x*x';
		int_start.value='-1.5';
		int_end.value='1.5';
		npoint.value='5000';
		b_start.value='2.25';
		b_end.value='2.25';
		E_start.value='0';
		E_end.value='1000';
		E_number.value='';
		dE.value='';
		//planck.defaultSelected;
	}
	if (i == 3) {
		pot.value='abs(x)';
		int_start.value='-3.5';
		int_end.value='3.5';
		npoint.value='5000';
		b_start.value='3.5';
		b_end.value='3.5';
		E_start.value='0';
		E_end.value='1000';
		E_number.value='';
		dE.value='';
		//planck.defaultSelected;
	}
}
