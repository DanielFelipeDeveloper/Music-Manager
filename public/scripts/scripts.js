const currentPage = location.pathname
const menuItems = document.querySelectorAll('.links a')

for (item of menuItems) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}

const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", (e) => {
    const confirmation = confirm("Deseja deletar?")
    if(!confirmation) {
        e.preventDefault()
    }
})
