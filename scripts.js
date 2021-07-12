const api = 'http://localhost:3000/api/furniture/';
const singleProduct = './product.html?id=';

fetch(api)
 .then((response) => response.json())
 .then((data) => createCards(data));

function createCards(array) {
  const container = document.getElementById('card-container');
  const length = array.length;
  
  for (let i=0; i<length; i++) {
    const col = createCard(array[i]);
    container.appendChild(col);
  }
}

function createCard(obj) {
  const col = document.createElement('div');
  const card = document.createElement('div');
  
  const img = document.createElement('img');
  
  const cardBody = document.createElement('div');
  const name = document.createElement('h4');
  const price = document.createElement('p');
  const cardButton = document.createElement('button');
  
  const link = document.createElement('a');
  link.setAttribute('href', `${singleProduct}${obj._id}`);
  
  col.classList.add('col-12', 'col-lg-4');
  card.classList.add('card', 'p-2', 'shadow', 'mt-3');
  cardBody.classList.add('card-body');
  name.innerText = obj.name;
  name.classList.add('card-title');
  price.innerText = '£' + obj.price;
  price.classList.add('card-text');
  cardButton.classList.add('btn', 'btn-outline-primary');
  cardButton.setAttribute('type', 'button');
  cardButton.innerText = 'View Product';
  
  img.setAttribute('src', obj.imageUrl);
  img.classList.add('card-img-top');
  
  col.appendChild(card);
  card.appendChild(img);
  card.appendChild(cardBody);
  cardBody.appendChild(name);
  cardBody.appendChild(price);
  cardBody.appendChild(link);
  link.appendChild(cardButton);
  
 
  
  return col;
}