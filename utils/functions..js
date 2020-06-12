function validarPartido() {

    if (listaPartidos !== []) {
        for (let i = 0; i < listaPartidos.length; i++) {
            const partido = listaPartidos[i].partido;
            return partido.toLowerCase()
        }
    }
    return
}

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