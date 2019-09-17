
let inp_nombres=document.getElementById('inp-nombres');
let inp_apellidos=document.getElementById('inp-apellidos');
let inp_correo=document.getElementById('inp-correo');
let inp_telf=document.getElementById('inp-telf');

let btn_registrar=document.getElementById('btn-registrar');
btn_registrar.addEventListener('click', function(){

	let registro="https://sminnova.com/recurso_clase/api/usuarios/agregar";

	let formulario_registro=document.getElementById('formulario');
	let datos_registro=new FormData(formulario_registro);
	let xhr= new XMLHttpRequest();

		xhr.open("POST",registro);
		xhr.send(datos_registro);

		xhr.onreadystatechange=function(){
			if (xhr.readyState==4){
				if(xhr.status==200){
					let resultado=JSON.parse(xhr.response);
					//console.log(resultado);
						if(resultado.length>=1){
							console.log("usuario existe");
							console.log(resultado);
							window.location="./NuevoLogin.html";
						}

				}
			}
		}


})




