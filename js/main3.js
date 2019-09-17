let modal=document.getElementById('modal');

let listado=document.getElementById('listado');

let btn_registrar=document.getElementById('btn-registrar');
btn_registrar.addEventListener("click", function(){
	console.log("ya");
	let usuariosReg=document.getElementById('usuarioReg');
	let datosUsuarios= new FormData(usuariosReg);
	const usuarioJson = Object.fromEntries(datosUsuarios)

	let registrousu="https://sminnova.com/recurso_clase/api/contacto/agregar";

	let xhr= new XMLHttpRequest();
	xhr.open("POST", registrousu);
	xhr.send(datosUsuarios);

	xhr.onreadystatechange=function(){
		if (xhr.readyState==4){
			
			if (xhr.status==200){
			let resultado=JSON.parse(xhr.response);
			console.log(resultado);
				if (resultado.length>=1){
				
				 listado.innerHTML +=`<div class="p-2 bd-highlight" >${usuarioJson.nombre}<button onclick="mostrarDetalle()" type="button">Ver mas</button></div>`;
				}
			}
		}
	}
})

function mostrarDetalle(){
	
	let titulo=document.getElementById('title-modal');
	let contenido=document.getElementById('content-modal');

	titulo.innerHTML=`<h2>${usuarioJson.nombre}` `${usuarioJson.apellido}</h2>`;
	contenido.innerHTML=`<div>${usuarioJson.cel}</div>`;
	modal.style.display="block";
}

let cerrar_modal=document.getElementById('cerrar-modal');
cerrar_modal.addEventListener("click",cerrar);

function cerrar(){
	modal.style.display="none";
}



