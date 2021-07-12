const api = 'http://localhost:3000/api/furniture/';


const urlParams = new URLSearchParams(window.location.search);
let productId = urlParams.get("id");

fetch(api + productId)
 .then((response) => response.json())
 .then((data) => createCard(data));


function createCard(obj) {
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

//Varnish dropdown menù
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
    option.setAttribute('value', obj.varnish);
    dropdownOptions.appendChild(option);
  }


  row.classList.add('row', 'no-gutters');
  firstCol.classList.add('col-md-4');
  secondCol.classList.add('col-md-8');
  cardBody.classList.add('card-body');
  name.innerText = obj.name;
  name.classList.add('card-title');
  description.innerText = obj.description;
  description.classList.add('card-text');
  price.innerText = '£' + obj.price;
  price.classList.add('card-text');
  addButton.classList.add('btn', 'btn-outline-primary');
  addButton.setAttribute('type', 'button');
  addButton.innerText = 'Add to Cart';
  
  img.setAttribute('src', obj.imageUrl);
  img.classList.add('card-img');

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