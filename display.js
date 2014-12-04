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

//dominio, potential, eigenvalues, eigenfunction, computation time
function display(D, V, ev, ef, t=0) {
    g = new Dygraph(document.getElementById("graph"),
        array2csv(D, ef));
    //console.log(array2csv(D, ef));
}

function start_computation() {
	var popup= document.getElementById("wait_popup");
	popup.style.visibility = "visible";
}

function hide_popup() {
	var popup= document.getElementById("wait_popup");
	popup.style.visibility = "hidden";
}
