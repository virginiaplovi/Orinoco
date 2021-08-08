

let productInStorage = JSON.parse(localStorage.getItem('cart'));

//Retrive from LocalStorage

if (productInStorage) {
    for (let i = 0; i < productInStorage.length; i++) {
        const productCart = productInStorage[i];
        const cartTable = document.getElementById('cart-items');


        let tr = document.createElement('tr');
        let name = document.createElement('td');
        let varnish = document.createElement('td');
        let quantity = document.createElement('td');
        let price = document.createElement('td');
        let removeProduct = document.createElement('td');

        // Get values
        name.innerHTML = productCart.name;
        varnish.innerHTML = productCart.varnish;
        quantity.innerHTML = `<input type="number" id="quantity" name="quantity" min="1" value ="${productCart.quantity}" onclick="inputQuantity(${i}, event.target.value)">`;
        removeProduct.innerHTML = `<button class="btn-del" id='remove' onclick='removeProduct(${i})'>X</button>`;
        let priceParse = parseInt(productCart.price.toString().substring(0, 3));
        price.innerHTML = '£' + (priceParse * productCart.quantity);

        // Append Item
        cartTable.appendChild(tr);
        tr.appendChild(name);
        tr.appendChild(varnish);
        tr.appendChild(quantity);
        tr.appendChild(price);
        tr.appendChild(removeProduct);

        totalPrice();
    }
} else {
//If cart is empty or null


}
//Change quantity in Local Storage
function inputQuantity(index, value) {
    productInStorage[index].quantity = parseInt(value);
    localStorage.setItem('cart', JSON.stringify(productInStorage));

    totalPrice();
    location.reload();
}
//Calculate Total price of the Items in the cart
function totalPrice() {

    let total = document.getElementById('total');
    let totalCartPrice = 0;
    if (productInStorage) {
        for (let i = 0; i < productInStorage.length; i++) {
            let price = parseInt(productInStorage[i].price.toString().substring(0, 3));
            let productPrice = price * productInStorage[i].quantity;
            totalCartPrice += productPrice;
        }
    }
    if (total) {
        total.innerHTML = "Subtotal: £ " + totalCartPrice;
        sessionStorage.setItem('Total', JSON.stringify(totalCartPrice));
    }
}

//Remove product from Local Storage
function removeProduct(index) {
    productInStorage.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(productInStorage));
    
   
    totalPrice();
    location.reload();
  }