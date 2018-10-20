var cmd=require('node-cmd');
const fs = require('fs');
var schedule = require('node-schedule');

var j = schedule.scheduleJob('*/1 * * * *', function(fireDate){
  cmd.get(
        'ps -aux',
        function(err, data, stderr){
            //console.log('Datos del ls:\n\n',data)
            var datos = data.split("\n")
            datos.forEach( function(valor, indice, array) {
			    var index = valor.search("Sl+")
			    if(index!=-1){
			    	let columnas = valor.split(" ");
			    	let columnas2 = hacerArrelog(columnas);
			    	if(columnas2[7] === "Sl+"){
			    		let texto = columnas2[10];
			    		let existe = texto.search('node');
			    		if(existe == -1){
			    			//console.log(columnas2);
			    			let escito = columnas2[1] + "," +columnas2[10];
			    			fs.writeFile("/deadlock_detect/lock", escito, function (err) {
							    if (err) {
							        return console.log(err);
							    }
							    console.log("The file was saved!");
							});
			    		}
			    	}
			    }
			});
        }
    );
});

 

function hacerArrelog (columnas){
	let arreglo = [];
	columnas.forEach((elemento)=>{
		if(elemento!='') arreglo.push(elemento);
	});
	return arreglo;
}