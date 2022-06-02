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
let bestEmployees;

const traerDatosJson = async () => {
  let response = await fetch("./bestEmployees.json");
  let data = await response.json();
  bestEmployees = data;
};

traerDatosJson();

const mostrarBestEmployees = () => {
  tablaEmpleados.innerHTML = "";

  for (let index = 0; index < bestEmployees.length; index++) {
    tablaEmpleados.innerHTML += `<tr>
          <th class="guionCentrado" scope="row">${bestEmployees[index].id}</th>
          <td class="guionCentrado">${bestEmployees[index].nombre}</td>
          <td class="guionCentrado">${bestEmployees[index].apellido}</td>
          <td class="guionCentrado">${bestEmployees[index].edad}</td>
          <td class="guionCentrado">${bestEmployees[index].seniority}</td>
          <td class="guionCentrado">-</td>
          <td class="guionCentrado">${bestEmployees[index].mes}</td>
      </tr>
      `;
  }
};

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
  if (seniorityEmp.value === "Seniority") {
    alert("Seleccione un Seniority");
    throw new Error("Falta Seniority");
    return;
  }

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

  calcularSalario(empleado);

  empleados.push(empleado);
};

const guardarEmpleados = (clave, valor) => {
  localStorage.setItem(clave, valor);
};

formulario.addEventListener("submit", (e, empleado) => {
  e.preventDefault();

  try {
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
  } catch (e) {
    console.log(e);
  }
});

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

const filtroDeEdades = (edades) => {
  let resultadoFiltroEmpleados;

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
  tablaEmpleados.innerHTML = "";

  filtrado.forEach((empleado) => {
    const { nombre, apellido, edad, seniority, salario, id } = empleado; //desestructuración

    tablaEmpleados.innerHTML += `<tr>
        <th class="guionCentrado" scope="row">${id}</th>
        <td class="guionCentrado">${nombre}</td>
        <td class="guionCentrado">${apellido}</td>
        <td class="guionCentrado">${edad}</td>
        <td class="guionCentrado">${seniority}</td>
        <td class="guionCentrado">AR$ ${Math.floor(salario)}</td>
        <td class="guionCentrado">-</td>
        <td class="guionCentrado"><button onclick="eliminarEmpleado(${id})" type="click" class="btn btn-primary">Eliminar</button></td>
    </tr>
    `;
  });
};

function eliminarEmpleado(idEmpEliminar) {
  const empleadoFiltrado = empleados.filter(
    (empleado) => empleado.id != idEmpEliminar
  );

  localStorage.setItem("listaEmpleados", JSON.stringify(empleadoFiltrado));
  //localStorage.removeItem("listaEmpleados");

  empleados = empleadoFiltrado;

  mostrarEnTabla(empleadoFiltrado);
}
