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
    
    console.log("ev",ev);
    
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

function check() {
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
