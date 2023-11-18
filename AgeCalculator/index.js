



const calculateBtn = document.querySelector('#calculateBtn')
const birth = document.querySelector('#birth')
const yearsText = document.querySelector('#result')



document.addEventListener('DOMContentLoaded', () => {
    calculateBtn.addEventListener('click', calculateAge)
})


function calculateAge(){
    const actualAge = new Date().getFullYear()
    const valueYears = new Date(birth.value).getFullYear()
    const years = actualAge - valueYears
    yearsText.innerHTML = `${years} years old`
    birth.value = ''
}
