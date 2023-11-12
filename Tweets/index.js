

const twettBtn = document.querySelector('#tweetBtn')
const tweet = document.querySelector('#tweet')
const alerta = document.querySelector('#alerta')
const misTweets = document.querySelector('#misTweets')

let tweetsArray = new Array()

document.addEventListener('DOMContentLoaded', () => { 
    verificarTweets()
    twettBtn.addEventListener('click', agregarTweetArray)
    cargarTweets()
})



function agregarTweetArray(){
    const tweetObj = {
        tweetText:'',
        id: ''
    }
    tweetObj.tweetText = tweet.value
    tweetObj.id = Math.floor(Math.random() * 100000000)
    if(tweetObj.tweetText.trim() === ''){
        mostrarAlerta('El campo Tweet no debe de estar vacio', 'error', alerta)
        return
    }
    tweetsArray = [...tweetsArray, tweetObj]
    localStorage.removeItem('tweetsArr');
    localStorage.setItem('tweetsArr', JSON.stringify(tweetsArray))
    tweet.value = ''
    mostrarTweets()
}


function mostrarAlerta(msg, type, nodo) {
    limpiarNodo(nodo);
    const p = document.createElement("p");
    if (type === "error") {
      p.classList.add("alert", "alert-danger");
    } else {
      p.classList.add("alert", "alert-success");
    }
    p.textContent = msg;
    nodo.appendChild(p);
    setTimeout(() => {
      p.remove();
    }, 3000);
  }
  
  function limpiarNodo(nodo) {
    while (nodo.hasChildNodes()) {
      nodo.removeChild(nodo.firstChild);
    }
  }

  function mostrarTweets(){
    limpiarNodo(misTweets)
    tweetsArray.forEach(tweet => {
        const div = document.createElement('div')
        div.classList.add('d-flex', 'justify-content-between')
        const p = document.createElement('p')
        p.textContent = tweet.tweetText
        div.appendChild(p)
        const btn = document.createElement('button')
        btn.classList.add('btn', 'btn-warning', 'text-white', 'mt-2')
        btn.textContent = 'X'
        btn.onclick = () => eliminarTweet(tweet.id)
        div.appendChild(btn)
        misTweets.appendChild(div)
    })
  }

  function eliminarTweet(id){
    const newTweetsArray = tweetsArray.filter(tweet => tweet.id !== id)
    tweetsArray = [...newTweetsArray]
    localStorage.removeItem('tweetsArr');
    localStorage.setItem('tweetsArr', JSON.stringify(tweetsArray))
    mostrarTweets()
    verificarTweets()
  }

  function verificarTweets(){
    if(tweetsArray.length < 1){
        const p = document.createElement('p')
        p.classList.add('text-center', 'h5', 'text-warning')
        p.textContent = 'No hay ningun tweet por ahora. Agrega uno'
        misTweets.appendChild(p)
    }
  }

  function cargarTweets(){
    const localStorageData = localStorage.getItem('tweetsArr')
    const tweetsArr = JSON.parse(localStorageData)
    console.log(tweetsArr);
    tweetsArray = [...tweetsArr]
    mostrarTweets()
    verificarTweets()
  }
