const api = 'http://localhost:3000/api/furniture/';
let product = {};

//Return product id from query param
const urlParams = new URLSearchParams(window.location.search);
let productId = urlParams.get("id");

//Fetch Single Product by Id
fetch(api + productId)
  .then((response) => response.json())
  .then((data) => createCard(data));

//Function to fill the card with object values from the server
function createCard(obj) {

  //--GET product details from obj
  let name = document.getElementById('product-name');
  name.innerText = obj.name;
  let description = document.getElementById('product-description');
  description.innerText = obj.description;
  let price = document.getElementById('product-price');
  price.innerText = '£' + obj.price.toString().substring(0, 3);
  let addButton = document.getElementById('addButton');
  let img = document.getElementById('product-img');
  img.setAttribute('src', obj.imageUrl);
  let optionsContainer = document.getElementById('varnish');

  // Loop to generate Varnish Options
 for (let i = 0; i < obj.varnish.length; i++) {
    
    let option = document.createElement('option');
    option.innerText = obj.varnish[i];
    optionsContainer.appendChild(option);
  }
  // Save Product Data To The LocalStorage || Add to Cart
  addButton.addEventListener('click', () => {
    singleProduct = {
      imageUrl: obj.imageUrl,
      price: obj.price,
      name: obj.name,
      description: obj.description,
      varnish: optionsContainer.value,
      prodId: obj._id,
      quantity: 1

    }
    //step 1 retrieve the cart in localStorage

    let cartContents = [];
    if (localStorage.getItem('cart') === null) {
      cartContents = [];
    } else {
      cartContents = JSON.parse(localStorage.getItem('cart'));
    }

    //step 2 check if the furniture is already in the list
    if (cartContents.length == 0) {
      cartContents.push(singleProduct);
    } else {
      //step 2a if the product is already in the cart, then update the quantity +1
      let index = cartContents.findIndex(o => o.prodId == singleProduct.prodId);

      if (index != -1) {
        cartContents[index].quantity += 1;
      } else {
        //step 2b otherwise add the furniture as a new entry
        cartContents.push(singleProduct);

      }
    }

    localStorage.setItem('cart', JSON.stringify(cartContents));

    // add text and class 'show' to Toast
    const toastAlert = document.getElementById('confirmation');
    toastAlert.classList.add('show');
    toastAlert.innerHTML = 'The item ' + obj.name + ' has been added to your cart' + '<button type="button" data-dismiss="alert" class="close"><span aria-hidden="true">×</span></button>';
  });


}
