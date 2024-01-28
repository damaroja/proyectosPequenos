

Este proyecto tiene un timer con tres botones. Start, Stop y Reset
Existe una funcion de formateo:


   const formatTime = (elapsedTime) => {
    milisegundos.textContent = (Math.floor(elapsedTime % 1000) / 10 > 9) ? Math.floor(elapsedTime % 1000) / 10 : '0' + Math.floor(elapsedTime % 1000) / 10
    segundos.textContent = (Math.floor(elapsedTime / 1000) % 60 > 9) ? Math.floor(elapsedTime / 1000) % 60 : '0' + Math.floor(elapsedTime / 1000) % 60
    minutos.textContent = Math.floor(elapsedTime / 60000) % 60 > 9 ? Math.floor(elapsedTime / 60000) % 60 : '0' + Math.floor(elapsedTime / 60000) % 60
    horas.textContent = Math.floor(elapsedTime / 3600000) % 60 > 9 ? Math.floor(elapsedTime / 3600000) % 60 : '0' + Math.floor(elapsedTime / 3600000) % 60
}

                            
Que es llamada cuando renderizamos de nuevo la pantalla

La funcion principal es startTimer donde startTime graba el momento actual para calcular 
el tiempo que transcurre mediante la sentencia Date.now() - startTime

                            function startTimer() {
                                startTime = Date.now() - elapsedTime
                                timeInterval = setInterval(() => {
                                    elapsedTime = Date.now() - startTime
                                    formatTime(elapsedTime)
                                }, 10)
                                start.disabled = true
                                stop.disabled = false
                                reset.disabled = false
                              }
 La funcion Stop es simple: 
                          function stopTimer() {
                              clearInterval(timeInterval)
                              start.disabled = false
                              stop.disabled = true
}
 A lo mismo que la de resetTime

function resetTimer() {
    clearInterval(timeInterval)
    elapsedTime = 0
    formatTime(elapsedTime)
    start.disabled = false
    stop.disabled = true
    reset.disabled = true
}
                            
                            



























                            


                            
                            
