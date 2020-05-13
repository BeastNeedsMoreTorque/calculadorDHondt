let totalEscanos = '';
let listaPartidos = [];

function validarPartido() {

    if (listaPartidos !== []) {
        for (let i = 0; i < listaPartidos.length; i++) {
            const partido = listaPartidos[i].partido;
            return partido.toLowerCase()
        }
    }
    return
}

let inputEscanos = document.querySelector("#input-escanos");
let btnEscanos = document.querySelector("#agregar-escanos");
let btnResetEscanos = document.querySelector("#reset-escanos");
let inputPartido = document.querySelector("#input-partido");
let inputVotos = document.querySelector("#input-votos");
let btnPartido = document.querySelector("#agregar-partido");
let inputEliminar = document.querySelector("#input-eliminar");
let btnEliminarPartido = document.querySelector("#eliminar-partido");
let btnResetDatos = document.querySelector("#reset-datos");
let btnCalcular = document.querySelector("#calcular");
let bodyTable = document.querySelector("#bodyTable");
let headTr = document.querySelector("#bodyHeadTr");

inputEscanos.addEventListener('keyup', (e) => {
    e.stopPropagation()
    let valueEscanos = e.target.value;
    if (valueEscanos.length !== 0) {
        if (isNaN(valueEscanos) === false) {
            e.target.className = "form-control is-valid";

            btnEscanos.disabled = false
        } else {
            e.target.className = "form-control is-invalid";
            btnEscanos.disabled = true
        }
    } else {
        e.target.className = 'form-control'
        btnEscanos.disabled = true
    }
})

btnEscanos.addEventListener('click', (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (inputEscanos.className === "form-control is-valid" && document.querySelectorAll("th").length === 2) {
        totalEscanos = parseInt(inputEscanos.value);
        let stringifiedObj = JSON.stringify(totalEscanos);
        sessionStorage.setItem("totalEscanos", stringifiedObj);

        let i = 0;
        while (i < inputEscanos.value) {

            i++;

            let th = document.createElement('th')
            th.id = `escanos${i}`
            th.innerText = i

            headTr.appendChild(th);
        }
    }
    e.target.disabled = true
    btnResetEscanos.disabled = false
    inputEscanos.value = null
    inputEscanos.className = 'form-control'
})

btnResetEscanos.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    let stringifiedObj = sessionStorage.getItem("totalEscanos");
    let parsedObj = JSON.parse(stringifiedObj);

    let i = 0;
    while (i < parsedObj) {

        i++;

        headTr.removeChild(document.querySelector(`#escanos${i}`))

    }
    sessionStorage.removeItem("totalEscanos");
    e.target.disabled = true
})

inputPartido.addEventListener('keyup', (e) => {
    e.stopPropagation()
    let valuePartido = e.target.value;
    if (valuePartido.length !== 0) {
        if (valuePartido.toLowerCase() !== validarPartido()) {
            e.target.className = 'form-control is-valid'
        } else {
            e.target.className = 'form-control is-invalid'
        }
    } else {
        e.target.className = 'form-control'
    }
    if (e.target.className === 'form-control is-valid' && inputVotos.className === 'form-control is-valid') {
        btnPartido.disabled = false
    } else {
        btnPartido.disabled = true
    }
})

inputVotos.addEventListener('keyup', (e) => {
    e.stopPropagation()
    let valueVotos = parseInt(e.target.value);
    if (e.target.value.length !== 0) {
        if (isNaN(e.target.value) === false && valueVotos !== 0) {

            e.target.className = 'form-control is-valid'
        } else {
            e.target.className = 'form-control is-invalid'
        }
    } else {
        e.target.className = 'form-control'
    }
    if (e.target.className === 'form-control is-valid' && inputPartido.className === 'form-control is-valid') {
        btnPartido.disabled = false
    } else {
        btnPartido.disabled = true
    }
})

btnPartido.addEventListener('click', (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (inputPartido.className === 'form-control is-valid' && inputPartido.value.toLowerCase() !== validarPartido() && inputVotos.className === 'form-control is-valid') {
        let k = [];
        let nuevoPartido = {
            partido: inputPartido.value,
            votos: inputVotos.value,
            coeficientes: k
        }

        let tr = document.createElement('tr')
        tr.id = inputPartido.value

        let td = document.createElement('td')
        td.innerText = inputPartido.value

        let td2 = document.createElement('td')
        td2.innerText = inputVotos.value

        tr.appendChild(td)
        tr.appendChild(td2)

        let i = 0
        while (i < totalEscanos) {
            i++
            let div = nuevoPartido.votos / i
            k.push(div)
        }
        for (let index = 0; index < k.length; index++) {

            const tdK = document.createElement('td')
            tdK.id = k[index]
            tdK.innerText = k[index]
            tr.appendChild(tdK)
        }
        bodyTable.appendChild(tr)

        listaPartidos.push(nuevoPartido);
        let stringifiedObj = JSON.stringify(listaPartidos);
        sessionStorage.setItem("listaPartidos", stringifiedObj);
    }
    console.log(listaPartidos)
    e.target.disabled = true
    btnResetDatos.disabled = false
    btnCalcular.disabled = false
    btnResetEscanos.disabled = true
    inputPartido.value = null
    inputPartido.className = 'form-control'
    inputVotos.value = null
    inputVotos.className = 'form-control'

})

inputEliminar.addEventListener('keyup', (e) => {
    e.stopPropagation()
    if (e.target.value !== null) {
        btnEliminarPartido.disabled = false
    } else {
        btnEliminarPartido.disabled = true
    }

})

btnEliminarPartido.addEventListener('click', (e) => {
    e.stopPropagation()

    for (let i = 0; i < listaPartidos.length; i++) {
        let partidoEliminar = listaPartidos[i];
        if (partidoEliminar.partido.toLowerCase() === inputEliminar.value.toLowerCase()) {

            listaPartidos.splice(i, 1);
            if (listaPartidos.length === 0) {
                sessionStorage.removeItem("listaPartidos");
            } else {

                let stringifiedObj = JSON.stringify(listaPartidos);
                sessionStorage.setItem("listaPartidos", stringifiedObj);
            }

            bodyTable.removeChild(document.querySelector('#' + partidoEliminar.partido))
        }
    }
    console.log(listaPartidos)

    inputEliminar = null
})

btnResetDatos.addEventListener('click', (e) => {
    for (let i = 0; i < listaPartidos.length; i++) {
        let partidoEliminar = listaPartidos[i];
        bodyTable.removeChild(document.querySelector('#' + partidoEliminar.partido));
    }
    listaPartidos = [];
    sessionStorage.removeItem("listaPartidos");
    console.log(listaPartidos)
    e.target.disabled = true
    btnCalcular.disabled = true
    btnResetEscanos.disabled = false
})

btnCalcular.addEventListener('click', (e) => {
    e.stopPropagation()
    e.preventDefault()

    let sumaCoeficientes = [];

    for (let i = 0; i < listaPartidos.length; i++) {
        let totalVotos = listaPartidos[i].votos;
        let index = 0;
        while (index < totalEscanos) {
            index++
            let div = totalVotos / index
            sumaCoeficientes.push(div);
        }
    }
    sumaCoeficientes.sort(function (a, b) { return b - a })
    console.log(sumaCoeficientes)

    for (let i = 0; i < sumaCoeficientes.length; i++) {
        if (i < totalEscanos) {
            let coeficienteEntra = sumaCoeficientes[i];
            let candidatoEntra = document.getElementById(coeficienteEntra)
            console.log(coeficienteEntra)
            candidatoEntra.innerText = 'Entra'
            candidatoEntra.style = 'background-color: green;'
        } else {
            let coeficienteEliminar = sumaCoeficientes[i];
            let candidatoEliminar = document.getElementById(coeficienteEliminar)
            console.log(coeficienteEliminar)
            candidatoEliminar.innerText = ''
        }
    }

    stringifiedPartidos = JSON.stringify(listaPartidos);
    sessionStorage.setItem("listaPartidos", stringifiedPartidos);
})

function getSessionStorageEscanos(key) {
    let stringifiedObj = sessionStorage.getItem(key);
    let parsedObj = JSON.parse(stringifiedObj);

    if (parsedObj !== null) {
        totalEscanos = parseInt(parsedObj);

        let i = 0;
        while (i < totalEscanos) {

            i++;

            let th = document.createElement('th')
            th.id = `escanos${i}`
            th.innerText = i

            headTr.append(th);
        }
        btnResetEscanos.disabled = false
    }
}

function getSessionStoragePartidos(key) {

    let stringifiedObj = sessionStorage.getItem(key);
    let parsedObj = JSON.parse(stringifiedObj);

    if (parsedObj !== null) {

        for (let i = 0; i < parsedObj.length; i++) {
            const nuevoPartido = parsedObj[i]

            let tr = document.createElement('tr')
            tr.id = nuevoPartido.partido

            let td = document.createElement('td')
            td.innerText = nuevoPartido.partido

            let td2 = document.createElement('td')
            td2.innerText = nuevoPartido.votos

            tr.appendChild(td)
            tr.appendChild(td2)

            for (let index = 0; index < nuevoPartido.coeficientes.length; index++) {
                const k = nuevoPartido.coeficientes[index]

                const tdK = document.createElement('td')
                tdK.id = k
                tdK.innerText = k
                tr.appendChild(tdK)
            }
            bodyTable.appendChild(tr)

            listaPartidos.push(nuevoPartido)
        }
        btnResetDatos.disabled = false
        btnCalcular.disabled = false
    }
}

getSessionStorageEscanos("totalEscanos")
getSessionStoragePartidos("listaPartidos")