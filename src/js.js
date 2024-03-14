// localStorage.setItem('nombre', 'Elian')

// sessionStorage.setItem('nombre', 'Jean')

// const producto = {
//     nombre: 'Celular',
//     precio: '300000'
// }

// const productoString = JSON.stringify(producto);
// localStorage.setItem('productoJSON', productoString);
// console.log(producto);
// console.log( productoString)


// const meses = [ 'Enero', 'Febrero',  'Marzo', 'Abril', 'Mayo'];
// localStorage.setItem('meses', JSON.stringify(meses))

//creacion de variables

const listaTweetes = document.querySelector('#lista-tweets')
const formulario = document.querySelector('#formulario')
let tweets = []

//evento listener
evnetListeners()

function evnetListeners (){
    //cuando se envia el formulario

    formulario.addEventListener('submit',agregarTweet)

    //borrar tweets

    listaTweetes.addEventListener('click',borrarTweet);
    //contenido cargado
    document.addEventListener('DOMContentLoadded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
         console.log(tweets);
         crearHTML() 
    });
}

function agregarTweet(evento){
    evento.preventDefault();
    //leer el valor
    const tweet = document.querySelector('#tweet').value;

    if(tweet === ''){
        mostrarError('Ingrese todos los campos')
        return
    }

    const tweetObj ={
        id: Date.now(),
        texto: tweet
 
    }

    //añadirlo a mis tweets
    tweets = [...tweets, tweetObj]

    crearHTML()

    formulario.reset()
}

function mostrarError(error){
    const mensajeEerror = document.createElement('p')
    mensajeEerror.textContent = error;
    mensajeEerror.classList.add('error', 'p-4', 'mb-4', 'font-medium', 'w-full', 'text-center','text-red-800', 'rounded-lg', 'bg-red-50', 'dark:bg-gray-800', 'dark:text-red-400')

    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeEerror)

    setTimeout(() => {
        mensajeEerror.remove()
    },3000);
}


function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet => {
               //crear boton de eliminar
        const botonBorrar = document.createElement('a')
        botonBorrar.classList = 'borrar-tweet'
        
        botonBorrar.innerText = 'X'
   
        //craer elementi y añadire el contenido a lista
        const li = document.createElement('li') ;

        li.classList.add('flex', 'justify-between', 'items-center', 'py-2', 'border-b', 'cursor-pointer');
        botonBorrar.classList.add('font-bold', 'text-red-600')

        //añadir texto
        li.innerText = tweet.texto;

        //añadir el botton borrar
        li.appendChild(botonBorrar);

        //añadir un atributo inico
        li.dataset.tweetId = tweet.id;

        listaTweetes.appendChild(li)
        })
     
    }

    sincronizarStorage()
}

function limpiarHTML(){
    while(listaTweetes.firstChild){
        listaTweetes.removeChild(listaTweetes.firstChild)
    }
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

function borrarTweet (e){
    e.preventDefault()

    const id = e.target.parentElement.dataset.tweetId;
    tweets = tweets.filter( tweet => tweet.id != id)
    crearHTML()
}

function obtenerHoraActual() {
    const ahora = new Date();
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    // Formatear la hora como "HH:MM"
    return `${hora}:${minutos < 10 ? '0' : ''}${minutos}`;
}