const API = 'https://test-users-api.herokuapp.com/users/';
const userName = document.getElementById('name');
const userAge = document.getElementById('age');
const btnAdd = document.getElementById('add').addEventListener('click', addUsers)
// const output = document.getElementById('output');
let users = []

const getUsers = () => {
  return fetch(API)
  .then(res => res.json())
  // .then(users => console.log(users))
  .catch((err) => console.log(err))
}
getUsers().then(res =>{
  users = res.data;
  console.log(users);
  showUsers();
});

function showUsers(){
  fetch(API)
  .then((res) =>  res.json())
  .then((data) => {
    let output = '<h2>USERS</h2>';
    users.forEach(function(user){
      const div = document.createElement('div')
      div.className ='user' 
      output +=`
      <input placeholder=${user.name}>
      <input placeholder=${user.age}>
      `;
      // const btnDel = document.createElement('button')
      // btnDel.className = 'delete'
      // btnDel.textContent = 'Delete'
      // btnDel.addEventListener('click', deleteUser)
      // output.append(btnDel)
    })  
    document.getElementById('output').innerHTML = output  
  })
}
// function showUsers(){
//   output.innerHTML = '';
//   users.forEach((user) =>{
//     const div = document.createElement('div')
//     div.className ='user'

//     const inputName = document.createElement('input');
//     inputName.className = 'inputName';
//     inputName.defaultValue = user.name;

//     const inputAge = document.createElement('input')
//     inputAge.className = 'inputAge';
//     inputAge.defaultValue = user.age;

//     const btnDel = document.createElement('button')
//     btnDel.className = 'delete'
//     btnDel.textContent = 'Delete'
//     btnDel.addEventListener('click', deleteUser)
    
//     const btnChange = document.createElement('button')
//     btnChange.className = 'change'
//     btnChange.textContent = 'Change'
//     btnChange.addEventListener('click', changeUsers)

//     output.append(div);
//     div.append(inputName);
//     div.append(inputAge);
//     div.append(btnDel);
//     div.append(btnChange);
//   })

// }


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
    users.push(user);
    showUsers();
  })
  .catch((err) => console.log(err))
}

async function deleteUser(id) {
  await fetch(API + id, {
    method: 'DELETE'
  })
  users = users.filter((user) => user.id != id);
  showUsers();
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
}


