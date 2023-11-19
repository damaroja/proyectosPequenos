



const billInput = document.querySelector('#bill')
const totalTxt = document.querySelector('#total')
const tipInput = document.querySelector('#tip')
const calculateBtn = document.querySelector('#calculateBtn')

document.addEventListener('DOMContentLoaded', () => {
    calculateBtn.addEventListener('click', calculateTotal)
})


function calculateTotal(e){
    e.preventDefault()
    const bill = +billInput.value
    const tip = +tipInput.value
    const total = bill + ((tip/100)*bill)
    totalTxt.textContent = `${total.toFixed(2)} $`
}
