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

function create_data(D,ef) {
	//var resultsT2 = [['x'],['Y1'],['Y2']];
	var Da = D.array;
	var results = [Da,ef[0],ef[1]]; 									//funziona solo per un array ef di dimensione 2xY con Y arbitrario! <-- FIX THIS SHIT
	var resultsT = transpose(results);
	//resultsT2.push.apply(resultsT2,resultsT);
	//console.log(resultsT2)
	return resultsT
}

//dominio, potential, eigenvalues, eigenfunction, computation time
function display(D, V, ev, ef, t=0) {
    
    g = new Dygraph(
		document.getElementById("graphsx"),
		create_data(D,ef),//array2csv(D, ef),
		{
		legend: 'always',
		labelsDiv: document.getElementById('labelsSX'),
		labelsSeparateLines: true,
		labels: ["X", "Y1", "Y2"]
		}
		);
    //console.log(array2csv(D, ef));
    
    f = new Dygraph(
		document.getElementById("graphdx"),
		create_data(D,ef),
		{
		legend: 'always',
		labelsDiv: document.getElementById('labelsDX'),
		labelsSeparateLines: true,
		labels: ["X", "Y1", "Y2"]
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

function start_computation() {
	var popup= document.getElementById("wait_popup");
	popup.style.visibility = "visible";
}

function hide_popup(name) {
	var popup = document.getElementById(name);
	popup.style.visibility = "hidden";
}

/*function reset() {
	var = document.getElementById("");
	.value=
*/
