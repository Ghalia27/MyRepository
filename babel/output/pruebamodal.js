let modal = document.getElementById('modal');
let ver_modal = document.getElementById('ver-detalle');
ver_modal.addEventListener("click", tarea);

function tarea() {
  let elemento_title = document.getElementById('title-modal');
  elemento_title.innerHTML = "Contenido cargado desde JS"; //elemento_title.innerText="Hola desde JS"

  let content_modal = document.getElementById('content-modal');
  /*content_modal.innerHTML="<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
  +"tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
  +"quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
  +"consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"
  +"cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non"
  +"proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
  						+"<img src='https://via.placeholder.com/400x200'>"
  						+"<p>parrsafo2</p>"
  						+"<span>contenido</span>"
  */

  content_modal.innerHTML = `
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
	cillum d</p>
	<img src='https://via.placeholder.com/400x200'>
	<span>Lor, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
	<a href="http://google.com"></a>
	`;
  modal.style.display = "block";
}

let cerrar_modal = document.getElementById('cerrar-modal');
cerrar_modal.addEventListener("click", cerrar);

function cerrar() {
  modal.style.display = "none";
}