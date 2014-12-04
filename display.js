//dominio, potential, eigenvalues, eigenfunction, computation time
function display(D, V, ev, ef, t=0) {

  g = new Dygraph(

    // containing div
    document.getElementById("graphdiv1sx"),

    // CSV or path to a CSV file.
    "Time,position\n" +
    "-7,49\n" +
    "-6,36\n" +
    "-5,25\n" +
    "-4,16\n" +
    "-3,9\n" +
    "-2,4\n" +
    "-1,1\n" +
    "0,0\n" +
    "1,1\n" +
    "2,4\n" +
    "3,9\n" +
    "4,16\n" +
    "5,25\n" +
    "6,36\n" +
    "7,49\n"
  );
  
  f = new Dygraph(

    // containing div
    document.getElementById("graphdiv1dx"),

    // CSV or path to a CSV file.
    "Time,position\n" +
    "-7,-49\n" +
    "-6,-36\n" +
    "-5,-25\n" +
    "-4,-16\n" +
    "-3,-9\n" +
    "-2,-4\n" +
    "-1,-1\n" +
    "0,-0\n" +
    "1,-1\n" +
    "2,-4\n" +
    "3,-9\n" +
    "4,-16\n" +
    "5,-25\n" +
    "6,-36\n" +
    "7,-49\n"
  );
}

function start_computation() {
	var popup= document.getElementById("wait_popup");
	popup.style.visibility = "visible";
}

function hide_popup() {
	var popup= document.getElementById("wait_popup");
	popup.style.visibility = "hidden";
}
