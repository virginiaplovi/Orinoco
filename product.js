const api = 'http://localhost:3000/api/furniture';
const singleProduct = './product.html?id=';


var productId = window.location.search;
productId = productId.replace("?id=", '');
console.log(productId); // Single product url Id

fetch(api)
 .then((response) => response.json())
 .then((data) => createCard(data));


function createCard(obj) {
  const row = document.createElement('div')
  const firstCol = document.createElement('div');
  const secondCol = document.createElement('div');
  
  const img = document.createElement('img');
  
  const cardBody = document.createElement('div')
  const name = document.createElement('h4');
  const description = document.createElement('p');
  const price = document.createElement('p');
  const cardButton = document.createElement('button');
  
  const link = document.createElement('a');
  link.setAttribute('href', `${singleProduct}${obj._id}`);
  
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
  cardButton.classList.add('btn', 'btn-outline-primary');
  cardButton.setAttribute('type', 'button');
  cardButton.innerText = 'Add to Cart';
  
  img.setAttribute('src', obj.imageUrl);
  img.classList.add('card-img');
  
  row.appendChild(firstCol);
  firstCol.appendChild(img);
  row.appendChild(secondCol);
  secondCol.appendChild(cardBody)
  cardBody.appendChild(name);
  cardBody.appendChild(description);
  cardBody.appendChild(price);
  cardBody.appendChild(cardButton);
  cardButton.appendChild(link);
  
 
  
  return row;
}