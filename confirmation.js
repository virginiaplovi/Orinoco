localStorage.removeItem("cart");

let orderId = document.getElementById('order-id');
let firstName = document.getElementById('customer-name');
let backButton = document.getElementById('back-button');

orderId.innerHTML = sessionStorage.getItem('orderId');
firstName.innerHTML = sessionStorage.getItem('firstName');

backButton.addEventListener('click', () => {
    sessionStorage.removeItem("orderId");
    sessionStorage.removeItem('firstName');
    
    location.replace('index.html');
})