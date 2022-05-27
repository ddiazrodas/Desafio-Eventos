let navbar = document.getElementById("navbar");
let header = document.getElementById("header");
let tablaEmpleados = document.getElementById("tablaEmp");
let formulario = document.getElementById("formulario");
let botonEnviar = document.getElementById("btnPrincipal");
let nombEmpleado = document.getElementById("nombEmpleado");
let apellEmpleado = document.getElementById("apellEmpleado");
let edadEmpleado = document.getElementById("edadEmpleado");
let seniorityEmp = document.getElementById("seniorityEmp");
let horasEmp = document.getElementById("horasEmp");
let valorHoraEmp = document.getElementById("valorHoraEmp");
let divMen30 = document.getElementById("divMen30");
let btnMen30 = document.getElementById("btnMen30");
let btnMay30 = document.getElementById("btnMay30");

navbar.innerHTML = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
<div class="container-fluid">
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
      </li>
    </ul>
  </div>
</div>
</nav>`;

header.innerHTML = `<h1 class="text-center pt-5 display-5">Bienvenido/a, por favor ingrese la carga de los nuevos empleados</h1>`;

let empleados = [];
let idEmpleado = 1;

const obtenerEmpleadoLocalStorage = () => {
  if (localStorage.getItem("listaEmpleados")) {
    empleados = JSON.parse(localStorage.getItem("listaEmpleados"));

    empleados.forEach(() => idEmpleado++);
  }
};

obtenerEmpleadoLocalStorage();

let nuevoEmpleado = true;

const bonos = {
  Senior: 1.9,
  "Semi Senior": 1.5,
  Junior: 1.1,
  default: 1,
};

const crearEmpleado = () => {
  let empleado = {
    nombre: nombEmpleado.value,
    apellido: apellEmpleado.value,
    edad: edadEmpleado.value,
    seniority: seniorityEmp.value,
    horasTrabajadas: horasEmp.value,
    valorHora: valorHoraEmp.value,
    salario: 0,
    id: idEmpleado,
  };
  idEmpleado++;

  empleados.push(empleado);
};

const calcularSalario = (empleado) => {
  if (empleado.horasTrabajadas > 200) {
    empleado.salario =
      (empleado.horasTrabajadas * empleado.valorHora + 10000) *
      (bonos[empleado.seniority] || bonos["default"]);
  } else if (empleado.horasTrabajadas > 180) {
    empleado.salario =
      (empleado.horasTrabajadas * empleado.valorHora + 5000) *
      (bonos[empleado.seniority] || bonos["default"]);
  } else {
    empleado.salario =
      empleado.horasTrabajadas *
      empleado.valorHora *
      (bonos[empleado.seniority] || bonos["default"]);
  }
};

const guardarEmpleados = (clave, valor) => {
  localStorage.setItem(clave, valor);
};

formulario.addEventListener("submit", (e, empleado) => {
  e.preventDefault();
  crearEmpleado();
  guardarEmpleados("listaEmpleados", JSON.stringify(empleados));

  let { nombre, apellido } = empleados.find(
    (persona) =>
      persona.nombre.toLowerCase() === nombEmpleado.value.toLowerCase() &&
      persona.apellido.toLowerCase() === apellEmpleado.value.toLowerCase()
  );

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Datos cargados correctamente",
    text: `Empleado: ${nombre} ${apellido}`,
    showConfirmButton: false,
    timer: 2000,
  });

  formulario.reset();
});

const filtroDeEdades = (edades) => {
  let resultadoFiltroEmpleados;
  // if (edades === 'mayores') {
  //     resultadoFiltroEmpleados = empleados.filter((i) => i.edad > 30);
  // } else {
  //     resultadoFiltroEmpleados = empleados.filter((i) => i.edad <= 30);
  // }
  edades === "mayores"
    ? (resultadoFiltroEmpleados = empleados.filter((i) => i.edad > 30))
    : (resultadoFiltroEmpleados = empleados.filter((i) => i.edad <= 30));

  return resultadoFiltroEmpleados;
};

btnMen30.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarEnTabla(filtroDeEdades("menores"));
});

btnMay30.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarEnTabla(filtroDeEdades("mayores"));
});

const mostrarEnTabla = (filtrado) => {
  //let idAcomulador = 0;

  tablaEmpleados.innerHTML = "";

  filtrado.forEach((empleado) => {
    const { nombre, apellido, edad, seniority, salario, id } = empleado; //desestructuración

    calcularSalario(empleado);

    tablaEmpleados.innerHTML += `<tr>
        <th scope="row">${id}</th>
        <td>${nombre}</td>
        <td>${apellido}</td>
        <td>${edad}</td>
        <td>${seniority}</td>
        <td>AR$ ${salario}</td>
        <td><button onclick="eliminarEmpleado(${id})" type="click" class="btn btn-primary">Eliminar</button></td>
    </tr>
    `;
  });
};

// console.table(empleados);
//<th scope="row">${idAcomulador++}</th>

let intentoDe = JSON.parse(localStorage.getItem("listaEmpleados"));

function eliminarEmpleado(idEmpEliminar) {
  
    const empleadoFiltrado = empleados.filter ((empleado) => empleado.id != idEmpEliminar);
    
    localStorage.setItem("listaEmpleados", empleadoFiltrado);
    //localStorage.removeItem("listaEmpleados");

    empleados=empleadoFiltrado;

    mostrarEnTabla(empleadoFiltrado);

    console.log(idEmpEliminar);
}
