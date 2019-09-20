/*let obj=new Usuario();
let cerrar=document.getElementById('cerrar');
cerrar.addEventListener("click",function(){
	obj.deslogearUsuario();
})*/



let usuario = new Usuario();
let listado=document.getElementById('lista-contacto');
let listado_personas=[]; //lista vacia para llenar los contactos
let btn_registrar=document.getElementById('btn-registrar');
let id_usuario = usuario.obtenerIdUsuario(); //id que viene de la clase usuario

if (!usuario.estadoLogin()) window.location = '../html/NuevoLogin.html';

obtenerListado();

//boton registrar contacto
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

			//arreglo de objetos
			listado_personas.unshift(usuarioJson);//coloca el contacto ingresado en el inicio
			let html = dibujar(listado_personas);
			listado.innerHTML = html;	
			}
		}
	}
})


//búsqueda de contacto
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
	
	 
//desloguearse
let desloguear=document.getElementById('desloguearse');
desloguear.addEventListener("click", function(){
	usuario.deslogearUsuario();
	window.location="NuevoLogin.html";
})

//función reutilizable para dibujar la lista
function dibujar(lista) {
	let temp = "";
	for (item of lista) {
		temp=temp+`<li onclick='pagar("${item.nombres}","${item.apellidos}","${item.telefono}" )' class="list-group-item">${item.nombres}  ${item.apellidos}</li>`;
	}
	return temp;
}

//obtener el listado, síncrono
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


//viene del onclick pagar de la lista
function pagar(nombre,apellido,telefono){
	//mostrar el modal
	$("#exampleModal").modal("show");

	//console.log(nombre,apellido,telefono)
	//mostrar el nombre apellido y telefono 
	document.getElementById("inp-nombre-contacto").value=nombre + " " + apellido;
	document.getElementById("inp-telefono-contacto").value=telefono;
}

//function para registrar pago
let registrarpago=document.getElementById("btn-registrar-pago");
registrarpago.addEventListener("click",function(){
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