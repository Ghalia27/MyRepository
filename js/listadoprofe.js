/*let obj=new Usuario();
let cerrar=document.getElementById('cerrar');
cerrar.addEventListener("click",function(){
	obj.deslogearUsuario();
})*/


//boton registrar
let usuario = new Usuario();
let listado=document.getElementById('lista-contacto');
let listado_personas=[];
let btn_registrar=document.getElementById('btn-registrar');
let id_usuario = usuario.obtenerIdUsuario();

if (!usuario.estadoLogin()) window.location = '../html/NuevoLogin.html';

obtenerListado();

btn_registrar.addEventListener("click", function(){
	console.log("ya");
	let usuariosReg=document.getElementById('usuarioReg');
  let datosUsuarios= new FormData(usuariosReg);
	datosUsuarios.append("id_usuario",id_usuario);
    
    //nombre, apellido y cel en un objeto
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
                    //arreglo de objetos
					let html = dibujar(listado_personas);
					listado_personas.unshift(usuarioJson);
					listado.innerHTML = html;
                    //listar();

                }
			}
		}
	}
})
//buscar 


	let inp_lista=document.getElementById('inp-lista');
	inp_lista.addEventListener("input", function(){
		let busqueda=inp_lista.value;
		console.log(busqueda);
		let filtrado=listado_personas.filter(function (persona) {
			let nombre_completo = (persona.nombres + " " + persona.apellidos).toLowerCase();
			return nombre_completo.includes(busqueda.toLowerCase());
		});
		let li=dibujar(filtrado);
		listado.innerHTML=li;
	})
	
	 
//deslogearse

let desloguear=document.getElementById('desloguearse');
desloguear.addEventListener("click", function(){
	usuario.deslogearUsuario();
	window.location="NuevoLogin.html";
})


/*
function listar(){
	
	//let temporal=listado.innerHTML;
	let temporal_elementos="";
	for (let i = 0 ; i < listado_personas.length; i++) {
		let item=listado_personas[i];

    temporal_elementos=temporal_elementos+`<li class="mt-4 mb-4" onclick='pagar("${item.nombres}","${item.apellidos}","${item.telefono}" )'class="list-group-item">${item.nombres}  ${item.apellidos}</li>`;

	}
	listado.innerHTML=temporal_elementos;


}
*/
function dibujar(lista) {
	let temp = "";
	for (item of lista) {
		temp=temp+`<li onclick='pagar("${item.nombres}","${item.apellidos}","${item.telefono}" )' class="list-group-item">${item.nombres}  ${item.apellidos}</li>`;
	}
	return temp;
}



//let lista=document.getElementById("listado");
async function obtenerListado(){
	let url="https://sminnova.com/recurso_clase/api/contacto/listado";
	let datos=new FormData();
	datos.append("id",id_usuario);

	let peticion=await fetch(url,{method:"POST",body:datos})
	let resultado=await peticion.json();

	console.log(resultado);
	let res=resultado instanceof Array
	console.log(res);
	let temp=""
	if(res){
		listado_personas = [...resultado];
		let html = dibujar(resultado);
		listado.innerHTML = html;
	}
	else{
		listado.innerHTML='<li class="list-group-item">No tienes contactos registrados</li>';
	}
}



function pagar(nombre,apellido,telefono){
	$("#exampleModal").modal("show");
	//console.log(nombre,apellido,telefono)

	document.getElementById("inp-nombre-contacto").value=nombre + " " + apellido;

	document.getElementById("inp-telefono-contacto").value=telefono;
}


let registrar=document.getElementById("btn-registrar-pago");
registrar.addEventListener("click",function(){
	let nombre= document.getElementById("inp-nombre-contacto").value
	let telefono=document.getElementById("inp-telefono-contacto").value
	let pago=document.getElementById("inp-monto-pago").value
	let fecha=Date.now();
	//console.log(nombre,telefono,pago,fecha);
	let datos=new FormData();
	datos.append("nombres",nombre);
	datos.append("telefono",telefono);
	datos.append("monto",pago);
	datos.append("fecha",fecha);
	datos.append("id_usuario",id_usuario);

	let url="https://sminnova.com/recurso_clase/api/contacto/pago";
	let config={
		method:"POST",
		body:datos
	}
	fetch(url,config)
	.then((data)=>{return data.json()})
	.then((data)=>{
			console.log('pago', data);
		//oculta modal
			$("#exampleModal").modal("hide");
	});

})