let usu= new Usuario();
let historial=document.getElementById('lista-historial');
let listado_historial=[];
let id_usuario = usu.obtenerIdUsuario();




async function obtenerListadoHistorial(){
	let url="https://sminnova.com/recurso_clase/api/contacto/pago/id";
    let datos=new FormData();
    console.log(datos)
	datos.append("id_usuario",id_usuario);
  
    let peticion=await fetch(url,{method:"POST",body:datos})
	let resultado=await peticion.json();

	let res=resultado instanceof Array
    console.log(res);
    
	if(res){
        listado_historial=[...resultado];
		listado_historial.sort(comparar);
		let html = dibujar(listado_historial);
		historial.innerHTML = html;
	}
	else{
		historial.innerHTML='<li class="list-group-item">No tiene historial</li>';
	}
}
obtenerListadoHistorial();
function dibujar(lista) {
	let temp = "";
	for (item of lista) {
		temp=temp+`<li class="list-group-item">${item.nombre_contacto} &nbsp;&nbsp;&nbsp;&nbsp; ${item.telefono} &nbsp;&nbsp;&nbsp;&nbsp; S/${item.monto}</li>`;
	}
	return temp;
}
function comparar(a,b) {
    if (a.fecha < b.fecha) return 1
    else if (a.fecha > b.fecha) return -1
    return 0
   }

//para busqueda

let inp_busca=document.getElementById('inp-busqueda');
inp_busca.addEventListener("input", function(){
    let busqueda=inp_busca.value;
    console.log(busqueda);
    let filtrado=listado_historial.filter(function (persona) {
        let nombre_completo = (persona.nombre_contacto + " " + persona.telefono).toLowerCase();
        return nombre_completo.includes(busqueda.toLowerCase());
    });
    let li=dibujar(filtrado);
    historial.innerHTML=li;
})