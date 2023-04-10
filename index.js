let form = document.querySelector('form');
let candy = document.querySelector('#candy');
let description = document.querySelector('#description');
let price = document.querySelector('#price');
let quantity = document.querySelector('#quantity');
let itemList = document.querySelector('#listCandy')
form.addEventListener('submit', CandySubmit);
//adding items in the api
function CandySubmit(e) {
    e.preventDefault();
    let object = {
        candy: candy.value,
        description: description.value,
        price: price.value,
        quantity: quantity.value
    }
    axios.post('http://localhost:3000/candy/add-candy-data', object)
        .then((product) => {
            showOutput(product.data);
        })
        .catch(err => console.log(err));
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/candy/get-candy-data')
        .then((product) => {
            for (var i = 0; i < product.data.length; i++) {
                showOutput(product.data[i]);
            }
        })
        .catch(err => console.log(err));

})
function showOutput(data) {
    let li = document.createElement('li');
    li.id = data.id;
    let text1 = document.createTextNode(`${data.candy} ${data.description} ${data.price}rs ${data.quantity} `);
    li.append(text1);
    let buyOne = document.createElement('button');
    let buyTwo = document.createElement('button');
    let buyThree = document.createElement('button');
    let text2 = document.createTextNode(`Buy 1`);
    let text3 = document.createTextNode(`Buy 2`);
    let text4 = document.createTextNode(`Buy 3`);
    buyOne.onclick = function () {
        funOne(data);
    };
    buyTwo.onclick = function () {
        funTwo(data);
    };
    buyThree.onclick = function () {
        funThree(data);
    };
    buyOne.append(text2);
    buyTwo.append(text3);
    buyThree.append(text4);
    li.append(buyOne);
    li.append(buyTwo);
    li.append(buyThree);
    itemList.append(li);
}
function funOne(data) {
    let deductQunatity = 1;
    updateScreen(deductQunatity, data);
}
function funTwo(data) {
    let deductQunatity = 2;
    updateScreen(deductQunatity, data);
}
function funThree(data) {
    let deductQunatity = 3;
    updateScreen(deductQunatity, data);
}
function updateScreen(deductQunatity, data) {
    axios.post(`http://localhost:3000/candy/update-candy-data`, { data: data, dqty: deductQunatity })
        .then(product => {
            let updateId = document.getElementById(product.data.id);
            updateId.innerText = `${product.data.candy} ${product.data.description} ${product.data.price}rs ${product.data.quantity}`;
            let buyOne = document.createElement('button');
            let buyTwo = document.createElement('button');
            let buyThree = document.createElement('button');
            let text2 = document.createTextNode(`Buy 1`);
            let text3 = document.createTextNode(`Buy 2`);
            let text4 = document.createTextNode(`Buy 3`);
            buyOne.onclick = function () {
                funOne(data);
            };
            buyTwo.onclick = function () {
                funTwo(data);
            };
            buyThree.onclick = function () {
                funThree(data);
            };
            buyOne.append(text2);
            buyTwo.append(text3);
            buyThree.append(text4);
            updateId.append(buyOne);
            updateId.append(buyTwo);
            updateId.append(buyThree);
        })
        .catch(err => console.log(err));
}