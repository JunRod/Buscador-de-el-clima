const formulario = document.querySelector("#formulario")
const resultado = document.querySelector("#resultado")
const spinner = document.querySelector(".spinner")

formulario.addEventListener("submit", validadForm)

function validadForm(e) {
    e.preventDefault()

    const ciudad = document.querySelector("#ciudad").value
    const pais = document.querySelector("#pais").value

    if (ciudad === "" || pais === "" ) {
        Mensaje("Debe rellenar ambos campos", "error")
    }

    consultarAPI(ciudad, pais)
}

function consultarAPI(ciudad, pais) {
    const key = "aa31cccbf7739c72bb6fd6934a7f9576"
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&units=metric&appid=${key}`

    limpiarHTML()
    spinner.style.display = "flex"

    fetch(api)
        .then( resultado => resultado.json())
        .then( datos => {
            if(datos.cod === "404") {
                Mensaje("Ciudad no encontrada", "error")
                return
            }
                spinner.style.display = "none"
                ImprimirHTML(datos)

        })
}

function ImprimirHTML({name, main: {temp, temp_max, temp_min, humidity}}) {
    const resultadoDiv = document.createElement("div")
    resultadoDiv.classList.add("text-center", "text-white")

    let location = document.createElement("p")
    location.innerHTML = `Clima en ${name} `
    location.className = "font-bold text-2xl"
    resultadoDiv.appendChild(location)

    let actual = document.createElement("p")
    actual.innerHTML = `${temp} &#8451`
    actual.className = "font-bold text-6xl"
    resultadoDiv.appendChild(actual)

    const actualMax = document.createElement("div")
    actualMax.innerHTML = `max: ${temp_max} &#8451`
    actualMax.className = "text-xl"
    resultadoDiv.appendChild(actualMax)

    const actualMin = document.createElement("div")
    actualMin.innerHTML = `min: ${temp_min} &#8451`
    actualMin.className = "text-xl"
    resultadoDiv.appendChild(actualMin)

    const humedad = document.createElement("div")
    humedad.innerHTML = `humedad: ${humidity}%`
    humedad.className = "text-xl"
    resultadoDiv.appendChild(humedad)

    resultado.appendChild(resultadoDiv)
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function Mensaje (texto, tipo) {
        Swal.fire({
                      position: 'center',
                      icon: tipo,
                      title: texto,
                      showConfirmButton: false,
                      timer: 1500
                  })
    }
