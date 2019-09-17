class Usuario{
	constructor(){

	}
	datoRequerido(valor){

		let sin_espacios=valor.trim();
		
		let estado=false;
		if(sin_espacios.length>2){
			estado=true;
		}
		return estado;
	}
	datosLoginValidar(data_formulario){

		let estado=false;
		let correo=data_formulario.get("correo");
        let password=data_formulario.get("password");
        console.log("entro a datosloginvalidar", correo, password);
        console.log(correo);
        console.log(password);

		
		if(this.datoRequerido(correo) && this.datoRequerido(password)){
			estado=true;
		}
		return estado;

	}
	guardarUsuario(p_usuario,p_estado=true){
		localStorage.usuario=p_usuario;
		localStorage.login=p_estado;	
	}
	deslogearUsuario(){
		localStorage.login=false;
	}
	estadoLogin(url_destino){
		let estado=false;
		if(localStorage.login=="true"){
			estado=true;
			window.location=url_destino
		}
		return estado;
	}
	
	loginConusltar(datos_login){
		let estado=false;
		let config={
				method:"POST",
				body:datos_login
			}
		fetch(url_login,config)
			.then((data)=>{return data.json()})
			.then((data)=>{
				console.log(data.length)
				if(data.length>=1){
					//obj.guardarUsuario(data[0].correo);
					window.location="../html/Listadopagoprofe.html"
                    console.log(data);
                    estado=true;
				}
				else{

				}

			})
			return estado;
	}

}