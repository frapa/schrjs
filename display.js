function transpose(D, ef) {
    var tr_array = new Array();

    // This assumes all arrays in args have the same length
    for (var i = 0; i < D.length; i++) {
        var row = [D[i]];

        // This cycles all the arrays
        for (var j = 0; j < ef.length; j++) {
            row.push(ef[j][i]);
        }

        tr_array.push(row);
    }

    return tr_array;
}

function create_labels(evalue) {
	var labels = ["x", "autovalore 0"]
	for (var i = 1; i < evalue.length; i++) {
        labels.push("autovalore ");
        labels[i+1] += i;
	}
	return labels
}

/*function array2csv(D, ef) {
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
	var Da = D.array; // questo dovrebbe essere .as_array(). .array può fallire se non è già stato inizializzato.
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
}*/

//dominio, potential, eigenvalues, eigenfunction, computation time
function display(D, V, ev, ef, t=0) {
	var time = document.getElementById("time");
    var E_precision = document.getElementById("E_precision");
	var to_time = "tempo di elaborazione: ";
	to_time += t;
	to_time += "ms";
	time.innerHTML= to_time;
	
    console.log(D.as_array()[1]);
    //console.log(create_labels(ev));
	var xpos = document.getElementById("xpos");
    var auto = document.getElementById("auto");
    var ypos = document.getElementById("ypos");
	var eigval = [];
	for (var i = 0; i < ev.length; i++) {
		eigval[i] = ev[i].toFixed(-Math.floor(Math.log10(E_precision.value)) - 1);
		console.log(eigval[i]);
	};

    g = new Dygraph(
	    document.getElementById("graphup"),
	    transpose(D.as_array(), ef),
		{   
			title: 'densità di probabilità e',
		    legend: 'never',
		    //labelsDiv: document.getElementById('labelsUP'),
		    labelsSeparateLines: true,
		    labels: create_labels(ev),
			xlabel: "X",
			ylabel: "densità di probabilità",
			
			highlightCallback: function(e, x, pts) {
				var xvar = "x : " + x.toFixed(4);
				xpos.innerHTML = xvar;
				
				var auto = "\n";
				var pts_short = [];
				
				for (var i = 0; i < ev.length; i++) {
					pts_short[i] = pts[i].yval.toFixed(2);
				};
				for (var i = 0; i < ev.length; i++) {
					auto += pts_short[i];
					auto += "<br />";
				}
				ypos.innerHTML = auto
            },
            unhighlightCallback: function(e) {
				xpos.innerHTML = "<br />";
				ypos.innerHTML = "";
			}
		}
	);
    
    pot = new Dygraph(
		document.getElementById("graphdown"),
		transpose(D.as_array(), [V]),
		{
			title: 'densità di probabilità e potenziale',
			legend: 'always',
			labelsDiv: document.getElementById('labelsDW'),
			labelsSeparateLines: true,
			labelsShowZeroValues: false,
			labels: ["X", "potenziale"],
			xlabel: "X",
			ylabel: "potenziale",
		}
	);
	
	colors = g.getColors();
	var evtab = document.getElementById("evtab");
	evtab.innerHTML="";
	
	for (var i = 0; i < ev.length; i++) {
		var tr = document.createElement("tr");
		var td_eigen = document.createElement("td");
		var td_coord = document.createElement("td");
		td_coord.id = "coord" + i;
		
		td_eigen.style.background = colors[i];
		td_eigen.innerHTML = eigval[i];
		
		tr.appendChild(td_eigen);
		tr.appendChild(td_coord);
		evtab.appendChild(tr);
	}
	auto.innerHTML = ev_text;
	//pot_color = pot.getColors();
	
	
	//------ex function data export------//
	var data = document.getElementById("data_popup");
	
	var to_data = "<table>";
	for (var i = 0; i < (D.as_array()); i++) {
			to_data += "<tr>";
			to_data += "<td>";
			to_data += D.as_array()[i];
			to_data += "</td>";
			for (var j = 0; j < (ev.length+1); j++) {
				to_data += "<td>";
				to_data += ev[i][j];
				console.log(ev[i][j]);
				to_data += "</td>";
			};
			to_data += "</tr>";
	};
	to_data += "</table>";
	to_data += "<input type='reset' id='hide' value='Nascondi dati' onclick='hide_popup('data_popup');show_popup('graphup');show_popup('graphdown');'/></div>";	
	data.innerHTML = to_data;
	//-----------------------------------//
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
    var dE = document.getElementById("dE");
    var E_precision = document.getElementById("E_precision");
    var E_number = document.getElementById("E_number");
    
	if (i == 0) {
		pot.value='0';
		int_start.value='-1';
		int_end.value='1';
		npoint.value='250';
		b_start.value='1';
		b_end.value='2';
		E_start.value='0';
		E_end.value='10';
		dE.value='1';
		E_precision.value='0.0001';
		E_number.value='';
		//planck.defaultSelected;
	}
	if (i == 1) {
		pot.value='0';
		int_start.value='-3.5';
		int_end.value='3.5';
		npoint.value='1000';
		b_start.value='0';
		b_end.value='0';
		E_start.value='0';
		E_end.value='10';
		E_number.value='';
		dE.value='';
		//planck.defaultSelected;
	}
	if (i == 2) {
		pot.value='x*x';
		int_start.value='-1.5';
		int_end.value='1.5';
		npoint.value='1000';
		b_start.value='2.25';
		b_end.value='2.25';
		E_start.value='0';
		E_end.value='10';
		E_number.value='';
		dE.value='';
		//planck.defaultSelected;
	}
	if (i == 3) {
		pot.value='abs(x)';
		int_start.value='-3.5';
		int_end.value='3.5';
		npoint.value='1000';
		b_start.value='3.5';
		b_end.value='3.5';
		E_start.value='0';
		E_end.value='1000';
		E_number.value='';
		dE.value='';
		//planck.defaultSelected;
	}
	if (i == 4) {
		pot.value='0.5*x^2';
		int_start.value='-5';
		int_end.value='5';
		npoint.value='1000';
		b_start.value='0';
		b_end.value='0';
		E_start.value='0';
		E_end.value='10';
		E_number.value='';
		dE.value='';
		//planck.defaultSelected;
	}
}

/*function data_export(D, V, ev, ef, t=0) {
	var data = document.getElementById("data_popup");
	
	var to_data = "<table>";
	for (var i = 0; i < (D.as_array()); i++) {
			to_data += "<tr>";
			to_data += "<td>";
			to_data += D.as_array()[i];
			to_data += "</td>";
			for (var j = 0; j < (ev.length+1); j++) {
				to_data += "<td>";
				to_data += ev[i][j];
				to_data += "</td>";
			};
			to_data += "</tr>";
	};
	to_data += "</table>";
	to_data += "<input type='reset' id='hide' value='Nascondi dati' onclick='hide_popup('data_popup');show_popup('graphup');show_popup('graphdown');'/></div>";	
	data.innerHTML = to_data;
}
*/
