const API = 'https://test-users-api.herokuapp.com/users/';
const userName = document.getElementById('name');
const userAge = document.getElementById('age');
const btnAdd = document.getElementById('add').addEventListener('click', addUsers)
let users = []
const output = document.getElementById('output');

const getUsers = () => {
  return fetch(API)
  .then(res => res.json())
  .catch((err) => console.log(err))
}
getUsers().then(res =>{
  users = res.data;
  console.log(users);
  showUsers();
});

async function deleteUser(id) {
  await fetch(API + id, {
    method: 'DELETE'
  })
  users = users.filter((user) => user.id !== id);
  showUsers();
  console.log('deleted')
}

async function changeUsers(id, changeName, changeAge){
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
  getUsers()
  .then(res =>{
    users = res.data;
    showUsers()
  })
  console.log('changed')
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
  output.innerHTML = '';
  users.forEach((user) =>{
    const div = document.createElement('div')
    div.className ='user'

    const btn = document.createElement('div');
    btn.className = 'btn';

    const inputName = document.createElement('input');
    inputName.className = 'inputName';
    inputName.defaultValue = user.name;

    const inputAge = document.createElement('input')
    inputAge.className = 'inputAge';
    inputAge.defaultValue = user.age;

    const btnDel = document.createElement('button')
    btnDel.className = 'delete'
    btnDel.textContent = 'Delete'
    btnDel.addEventListener('click', () => {
      deleteUser(user.id)
    })
    
    const btnChange = document.createElement('button')
    btnChange.className = 'change'
    btnChange.textContent = 'Change'
    btnChange.addEventListener('click', () => {
      changeUsers(user.id, inputName.value, inputAge.value)
    })

    output.append(div);
    div.append(inputName);
    div.append(inputAge);
    btn.append(btnDel);
    btn.append(btnChange);
    div.append(btn);
  })
}


// function showUsers(){
//   fetch(API)
//   .then((res) =>  res.json())
//   .then((data) => {
//     let output = '<h2>USERS</h2>';
//     users.forEach(function(user){
//       output +=`
//       <input placeholder=${user.name}>
//       <input placeholder=${user.age}>
//       <input type="button" class="delete" onclick ="deleteUser()" value="DELETE">
//       <input type="button" class="change" onclick ="changeUsers()" value="CHANGE">

//       `;
//     })  
//     document.getElementById('output').innerHTML = output  
//   })
// }


