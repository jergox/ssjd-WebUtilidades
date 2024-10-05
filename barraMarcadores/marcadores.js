/*var bloques = [
    {
        tipo: "bloque",
        nombre: "Tarea 2233",
        background_color: "#fabadaa0",
        color: "dark",
        bloqueL: [
            {
                tipo: "enlace",
                enlace: "http://www.google.com",
                nombre: "miWeb",
                tultip: "para documentos"
            },
            {
                tipo: "desplegable",
                nombre: "AzureLinks",
                tultip: "tultip",
                elementos: [
                    {
                        tipo: "enlace",
                        enlace: "http://www.google.com",
                        nombre: "miWeb",
                        tultip: "para documentos"
                    },
                    {
                        tipo: "enlace",
                        enlace: "http://www.google.com",
                        nombre: "miWeb",
                        tultip: "para documentos"
                    }
                ]
            },
            {
                tipo: "desplegable",
                nombre: "AzureLinks",
                tultip: "tultip",
                elementos: [
                    {
                        tipo: "enlace",
                        enlace: "http://www.google.com",
                        nombre: "miWeb",
                        tultip: "para documentos"
                    },
                    {
                        tipo: "enlace",
                        enlace: "http://www.google.com",
                        nombre: "miWeb",
                        tultip: "para documentos"
                    },
                    {
                        tipo: "desplegable",
                        nombre: "AzureLinks",
                        tultip: "tultip",
                        elementos: [
                            {
                                tipo: "enlace",
                                enlace: "http://www.google.com",
                                nombre: "miWeb",
                                tultip: "para documentos"
                            },
                            {
                                tipo: "enlace",
                                enlace: "http://www.google.com",
                                nombre: "miWeb",
                                tultip: "para documentos"
                            },
                        ]
                    }
                ]
            }
        ]
    },
    {
        tipo: "bloque",
        nombre: "Tarea 2233",
        background_color: "#805000a0",
        color: "dark",
        bloqueL: [
            {
                tipo: "enlace",
                enlace: "http://www.google.com",
                nombre: "miWeb",
                tultip: "para documentos"
            }
        ]
    },
    {
        tipo: "bloque",
        nombre: "Tarea 2233",
        background_color: "#205100a0",
        color: "dark",
        bloqueL: [
            {
                tipo: "enlace",
                enlace: "http://www.google.com",
                nombre: "miWeb",
                tultip: "para documentos"
            }
        ]
    },
    {
        tipo: "bloque",
        nombre: "Tarea 2233",
        background_color: "#205190a0",
        color: "dark",
        bloqueL: [
            {
                tipo: "enlace",
                enlace: "http://www.google.com",
                nombre: "miWeb",
                tultip: "para documentos"
            }
        ]
    }
]
*/

//INICIO Gestion ficheros 
var archivoURL = document.getElementById("archivoSeleccionado")
archivoURL.addEventListener('change', leerArchivoJson)

function leerArchivoJson() {
    var res = archivoURL.files[0].text()
    res.then(data => {
        var json = JSON.parse(data);
        console.log({json});
        console.log({data});
        var ko = JSON.stringify(json);
        console.log({ko});
        
        localStorage.setItem("misLinks", ko);
    });
}
//FIN Gestion ficheros 

function cargarContenido() {
    var bloques = JSON.parse(localStorage.getItem("misLinks"));
    console.log({bloques});
    
    var bloqueID = 0;
    var body = document.getElementById("tablas"); 
    body.innerHTML = ``;   
    bloques.forEach(element1 => {
        body.innerHTML += bloqueToHtml(element1, bloqueID);
        bloqueID++;
    });
}

function bloqueToHtml(bloque, id) {
    var myID = "b" + id;
    var bloqueH = `<div class="bloque glassmorfismo" id="${myID}" style="color:${bloque.color};background-color:${bloque.background_color}"${setTultip(bloque)}><p class="titulo">${bloque.nombre}</p><ul>`;

    if (bloque.hasOwnProperty('bloqueL') && bloque.bloqueL.length > 0) {
        
        bloque.bloqueL.forEach(element2 => {
            bloqueH += `<li>${getContenido(element2, myID)}</li>`;
        });
    }

    bloqueH += `</ul></div>`;
    return bloqueH;
}

function getContenido(contenido, id) {
    if (contenido.tipo == "enlace") {
        return enlaceToHtml(contenido, id);
    }
    if (contenido.tipo == "desplegable") {
        return desplegableToHtml(contenido, id);
    }
}

function desplegableToHtml(desplegable, id) {
    var desplegableH = `<details open class="desplegable"><summary${setTultip(desplegable)}>${desplegable.nombre}</summary><ul>`;

    desplegable.elementos.forEach(elemento => {
        desplegableH += `<li>${getContenido(elemento, id)}</li>`;
    });

    desplegableH += `</ul></details>`;

    return desplegableH;
}

function enlaceToHtml(enlace, id) {
    var enlaceH = `<a href="${enlace.enlace}" target="_blank" class="enlace"${setTultip(enlace)}>${enlace.nombre}</a>`;

    return enlaceH;
}

function setTultip(elemento) {
    var tultip;

    if (elemento.hasOwnProperty("tultip")) {
        tultip = ` title="${elemento.tultip}"`;
    } else {
        tultip = ``;
    }

    return tultip;
}