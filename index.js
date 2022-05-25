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

const obtenerEmpleadoLocalStorage = () => {
    if (localStorage.getItem("listaEmpleados")) {
        empleados = JSON.parse(localStorage.getItem("listaEmpleados"));
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

const guardarEmpleados = (clave, valor) => {
    localStorage.setItem(clave, valor);
};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    crearEmpleado();
    guardarEmpleados("listaEmpleados", JSON.stringify(empleados));
});


const filtroDeEdades = (edades) => {
    let resultadoFiltroEmpleados;
    // if (edades === 'mayores') {
    //     resultadoFiltroEmpleados = empleados.filter((i) => i.edad > 30);
    // } else {
    //     resultadoFiltroEmpleados = empleados.filter((i) => i.edad <= 30);
    // }
    edades === 'mayores' ? resultadoFiltroEmpleados = empleados.filter((i) => i.edad > 30) : resultadoFiltroEmpleados = empleados.filter((i) => i.edad <= 30);

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

const mostrarEnTabla = (filtradoMen30) => {
    let idAcomulador = 0;

    tablaEmpleados.innerHTML = "";

    filtradoMen30.forEach((empleado) => {
        calcularSalario(empleado);

        tablaEmpleados.innerHTML += `<tr>
        <th scope="row">${idAcomulador++}</th>
        <td>${empleado.nombre}</td>
        <td>${empleado.apellido}</td>
        <td>${empleado.edad}</td>
        <td>${empleado.seniority}</td>
        <td>AR$ ${empleado.salario}</td>
    </tr>
    `;
    });
};

// console.table(empleados);