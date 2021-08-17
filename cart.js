const api = 'http://localhost:3000/api/furniture/';
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
        addNumCart();
    }
} if (productInStorage.length === 0 || productInStorage === null) {
    //If cart is empty or null
    let productContainer = document.getElementById('cart-products');

    productContainer.innerHTML = `<div class="text-center"><i class="fas fa-shopping-basket h1" style="background:-webkit-linear-gradient(30deg, rgba(206,126,73,1) 32%, rgba(144,91,250,1) 100%);-webkit-background-clip: text;-webkit-text-fill-color:transparent;"></i></div>
<h2 class="text-center font-weight-bold my-5" >Your Cart Is Currently Empty</h2>
<p class="text-center lead">Before proceed to checkout you must add some products to your shopping cart.<br>
You will find a lot of interesting products on our Homepage.</p>
<a href="index.html#products-heading" style="text-decoration:none;"><button type="button" class="btn btn-outline-primary mx-auto d-block">Return to shop <i class="fas fa-reply"></i></button></a>`;

    let tableContent = document.getElementById('table-content');
    let orderForm = document.getElementById('order-form');
    let cartHeading = document.getElementById('cart-heading');

    cartHeading.remove();
    tableContent.remove();
    orderForm.remove();


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
    }
}

//Remove product from Local Storage
function removeProduct(index) {
    productInStorage.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(productInStorage));


    totalPrice();
    location.reload();
}

//Cart Icon Number
function addNumCart() {
      let productNumber = document.getElementById('product-number');
      if (productInStorage) {
          productNumber.setAttribute('data-count', productInStorage.length);
      }
  }

//POST contact and product data to API

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email')
let submitButton = document.getElementById('submitOrder');

submitButton.addEventListener('click', ($event) => {
    $event.preventDefault();
    //Create products array
    let products = [];
    for (let i = 0; i < productInStorage.length; i++) {
        products.push(productInStorage[i]._id);
    }
    // console.log(products);
    // Create contact array
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    }
    // console.log(contact);
    //Data object to POST
    let data = {
        contact: contact,
        products: products,
    }
    // console.log(data)
    submitFormData(data);
});

function makeRequest(data) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('POST', api + '/order');
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 201) {
                    resolve(JSON.parse(request.response));
                } else {
                    reject(JSON.parse(request.response));
                }
            }
        };
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data));
    });
}

//Handle the response and catch errors
async function submitFormData(data) {
    try {
        const requestPromise = makeRequest(data);
        const response = await requestPromise;
        let orderId = response.orderId;
        let firstName = response.contact.firstName;
        sessionStorage.setItem("firstName", firstName);
        sessionStorage.setItem("orderId", orderId);
        // console.log(orderId)
        location.replace('confirmation.html');
    } catch (errorResponse) {
        console.log(errorResponse.error);
    }
}

