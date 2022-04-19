let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';

//Traer la inf desde la Api, a la cual le pasaremos un callback
function fetchData (url_api, callback) {
    //Petición
    //Generando referencia al objeto que necesito
    let xhttp = new XMLHttpRequest();
    //Abrir una url o hacer un llamado a una url
    /* 
    A nuestra referencia xhttp le pasamos un LLAMADO 'open'
    donde: parametro1 = el metodo, parametro2 = la url,
    parametro3 = verificación si es asincrono o no, valor por defecto true
    */
    xhttp.open('GET', url_api, true);
    //Escuchar lo que hará esa conexión
    //Cuando el estado del objeto cambia, ejecutar la función:
    xhttp.onreadystatechange = function (event) {
        //Validación para saber si ejecutaré mi callback
        //Si el estado está en 4
        if(xhttp.readyState === 4) {
            if(xhttp.status === 200) {
                //Primer param error, segundo el resultado
                //Se recibe en JSON y se parsea a una respuesta tipo texto
                callback(null, JSON.parse(xhttp.responseText))

            }else {
                const error = new Error('Error' + url_api);
                //null al final porque hubo error, mostraré el error solamente
                return callback(error, null);
            }
        }
    }
    //Enviando la solicitud
    xhttp.send();
}
//3 llamados a la API
//Error y datos resultantes
fetchData(API, function (error1, data1) {
    //Si llega este error, retorna el primer error y la función se acaba
    if(error1) return console.error(error1);
    //Si funciona haré esto
    //Haciendo petición al primer personaje de la api
    fetchData(API + data1.results[0].id, function (error2, data2) {
        if (error2) return console.error(error2)
        //Tercer petición: traer el origen de mi personaje
        fetchData (data2.origin.url, function(error3, data3){
            if (error3) return console.error(error3);
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        });
    })
})