const api = 'http://localhost:3000/api/furniture/';
let data = {};

//Return product id from query param
const urlParams = new URLSearchParams(window.location.search);
let productId = urlParams.get("id");

//Fetch Single Product by Id
fetch(api + productId)
  .then((response) => response.json())
  .then((data) => createCard(data));

//Function to create single product card
function createCard(obj) {

  //--Populate the DOM
  const container = document.getElementById('card-container');
  const row = document.createElement('div')
  const firstCol = document.createElement('div');
  const secondCol = document.createElement('div');
  const img = document.createElement('img');
  const cardBody = document.createElement('div');
  const name = document.createElement('h4');
  const description = document.createElement('p');
  const price = document.createElement('p');
  const addButton = document.createElement('button');

  //--Varnish dropdown menu start
  const dropdownContainer = document.createElement('form');
  const dropdownLabel = document.createElement('label');
  const dropdownOptions = document.createElement('select');

  dropdownContainer.classList.add('form-group', 'py-2');
  dropdownLabel.setAttribute('for', 'varnish');
  dropdownLabel.innerText = 'Select an option:';
  dropdownOptions.classList.add('form-control');
  dropdownOptions.setAttribute('id', 'varnish');

  dropdownContainer.appendChild(dropdownLabel);
  dropdownContainer.appendChild(dropdownOptions);

  for (let i = 0; i < obj.varnish.length; i++) {
    let option = document.createElement('option');
    option.innerText = obj.varnish[i];
    dropdownOptions.appendChild(option);
  }
  //--Varnish dropdown menu end

  //--GET product details from obj, add classes and attribute
  row.classList.add('row', 'no-gutters');
  firstCol.classList.add('col-md-4');
  secondCol.classList.add('col-md-8');
  cardBody.classList.add('card-body');
  name.innerText = obj.name;
  name.classList.add('card-title');
  description.innerText = obj.description;
  description.classList.add('card-text');
  price.innerText = '£' + obj.price.toString().substring(0, 3);
  price.classList.add('card-text');
  addButton.classList.add('btn', 'btn-outline-primary');
  addButton.setAttribute('type', 'button');
  addButton.setAttribute('id', 'addButton');
  addButton.innerText = 'Add to Cart';
  img.setAttribute('src', obj.imageUrl);
  img.classList.add('card-img');

  // Save Product Data To The LocalStorage || Add to Cart
  addButton.addEventListener('click', () => {
    singleProduct = {
      imageUrl: obj.imageUrl,
      price: obj.price,
      name: obj.name,
      description: obj.description,
      varnish: dropdownOptions.value,
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

    // add Toast
    const confirmation = document.getElementById('confirmation');

    const toastRow = document.createElement('div');
    toastRow.classList.add('row');

    const toastCol = document.createElement('div');
    toastCol.classList.add('col', 'my-2');

    const toastAlert = document.createElement('div');
    toastAlert.classList.add('alert', 'alert-secondary', 'alert-dismissible', 'fade', 'show', 'shadow-sm');
    toastAlert.setAttribute('role', 'alert');
    toastAlert.innerHTML = 'The item ' + obj.name + ' has been added to your cart';

    const toastClose = document.createElement('button');
    toastClose.setAttribute('type', 'button');
    toastClose.setAttribute('data-dismiss', 'alert');
    toastClose.setAttribute('aria-label', 'close');
    toastClose.classList.add('close');
    const toastSpan = document.createElement('span');
    toastSpan.setAttribute('aria-hidden', 'true');
    toastSpan.innerHTML = '×';

    confirmation.appendChild(toastRow);
    toastRow.appendChild(toastCol);
    toastCol.appendChild(toastAlert);
    toastAlert.appendChild(toastClose);
    toastClose.appendChild(toastSpan);
  });


  //--Append elements to the page
  container.appendChild(row);
  row.appendChild(firstCol);
  firstCol.appendChild(img);
  row.appendChild(secondCol);
  secondCol.appendChild(cardBody);
  cardBody.appendChild(name);
  cardBody.appendChild(description);
  cardBody.appendChild(dropdownContainer);
  cardBody.appendChild(price);
  cardBody.appendChild(addButton);
  return row;
}
