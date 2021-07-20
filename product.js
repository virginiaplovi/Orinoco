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
  
  for (let i=0; i<obj.varnish.length; i++) {
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
    let cartContents = [];
    const localStorageContent = localStorage.getItem('cart');
    if (localStorageContent === null) {
      cartContents = [];
    } else {
      cartContents = JSON.parse(localStorageContent);
    }
    let singleProduct = {
      imageUrl: obj.imageUrl,
      price: obj.price,
      name: obj.name,
      description: obj.description,
      varnish: dropdownOptions.value,
      prodId: obj._id,
      quantity: 1
    };
    cartContents.push(singleProduct);
    localStorage.setItem('cart', JSON.stringify(cartContents));
  
    // add Toast
    let confirmation = document.getElementById('confirmation');
    confirmation.innerHTML = `Added to cart.`;
    confirmation.classList.add('confirme-feedback--visible');
    confirmation.hideTimeout = setTimeout(() => {
      confirmation.classList.remove('confirme-feedback--visible');
    }, 3000);
  
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
