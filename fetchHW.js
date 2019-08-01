const API = 'https://test-users-api.herokuapp.com/users/';
const userName = document.getElementById('name');
const userAge = document.getElementById('age');
const btnAdd = document.getElementById('add').addEventListener('click', addUsers)
const output = document.getElementById('output');
let users = []

const getUsers = () => {
  return fetch(API)
  .then(res => res.json())
  .catch((err) => console.log(err))
}
getUsers().then(res =>{
  users = res.data;
  showUsers();
});

async function deleteUser(event) {
  const id = event.target.parentElement.id;
  const userCard = event.target.parentElement;
  await fetch(API + id, {
    method: 'DELETE'
  });
  document.querySelector("#output").removeChild(userCard);
  return;
}

async function changeUsers(event){
  const id = event.target.parentElement.id;
  const changeName = event.path[1].children[1].value
  const changeAge = event.path[1].children[2].value
  const user = {
    name: changeName,
    age: changeAge
  };
  await fetch(API + id,{
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(user)
  })
}

function addUsers(){
  const user = {
    name: userName.value,
    age: userAge.value
  }
  fetch(API, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(user)
  })
  .then(res => res.json())
  .then((data) => {
    user.id = data.id;
    users.unshift(user);
    showUsers();
  })
  .catch((err) => console.log(err))
}

function showUsers(){
  fetch(API)
    .then((res) =>  res.json())
    .then((data) => {
    const cardContainer = document.getElementById('output');
    data.data.forEach(function(user){
      let output =`
          <div id=${user.id}>
            <h2>USER</h2>
            <input class="name" placeholder=${user.name}>
            <input class="age" placeholder=${user.age}>
            <input type="button" class="delete" onclick ="deleteUser(event)" value="DELETE">
            <input type="button" class="change" onclick ="changeUsers(event)" value="CHANGE">
          </div>
        `;
        cardContainer.innerHTML += output;
      });
  });
}

