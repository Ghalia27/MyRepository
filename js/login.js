let obj=new Usuario();
// validas que exista registro de login
// si esta registrado te envia a la url como parametro
if (obj.estadoLogin()) window.location = "../html/ListadoContacto.html";


let btn=document.getElementById('btn-login');
let url_login="https://sminnova.com/recurso_clase/api/usuario/login"


btn.addEventListener("click",function(){

	let formulario_login=document.getElementById('formulario');
	let datos_login=new FormData(formulario_login);
	console.log(datos_login);

	
	if(obj.datosLoginValidar(datos_login)){
		let estadoLogin=obj.loginConusltar(datos_login);
		console.log("validar");
		
		console.log(datos_login);
		console.log(estadoLogin);
	}else{

	}


	

})

//desloger.addEventListener()
//obj.deslogearUsuario();