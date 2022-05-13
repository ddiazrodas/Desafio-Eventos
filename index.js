let navbar = document.getElementById("navbar");
let header = document.getElementById("header");
let tablaEmpleados = document.getElementById("tablaEmp");
let formulario = document.getElementById("formulario");
let botonEnviar = document.getElementById("btnPrincipal");
let nombEmpleado = document.getElementById("nombEmpleado");
let apellEmpleado = document.getElementById("apellEmpleado");
let seniorityEmp = document.getElementById("seniorityEmp");
let horasEmp = document.getElementById("horasEmp");
let valorHoraEmp = document.getElementById("valorHoraEmp");

navbar.innerHTML = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
<div class="container-fluid">
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</nav>`;

header.innerHTML = `<h1 class="text-center pt-5 display-2si">Bienvenidos, esto será la entrega del desafío</h1>`;

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  crearEmpleado();
  mostrarEnTabla();
  console.log("asdasd");
});

const empleados = [];
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
    seniority: seniorityEmp.value,
    horasTrabajadas: horasEmp.value,
    valorHora: valorHoraEmp.value,
    salario: 0,
  };

  empleados.push(empleado);

  formulario.reset();
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

const mostrarEnTabla = () => {
  let idAcomulador = 0;

  tablaEmpleados.innerHTML = "";

  empleados.forEach((empleado) => {
    calcularSalario(empleado);

    tablaEmpleados.innerHTML += `<tr>
        <th scope="row">${idAcomulador++}</th>
        <td>${empleado.nombre}</td>
        <td>${empleado.apellido}</td>
        <td>${empleado.seniority}</td>
        <td>AR$ ${empleado.salario}</td>
    </tr>
    `;
  });
};

console.table(empleados);
