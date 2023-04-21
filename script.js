const tbody = document.querySelector("tbody");
const select = document.querySelector("select");
const streetOptions = document.querySelector('#street')
// Get users

const getAllUsers = async () => {
  tbody.innerHTML = "";
  select.innerHTML = "";
  streetOptions.innerHTML= "";
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  fillTable(data);
  createSelection(data);
  createOptionByStreet(data)
};
getAllUsers();

const createSelection = (users) => {
  select.insertAdjacentHTML(
    "beforeend",
    ` <option value="null">Filtre pelo id</option>`
  );
  users.map((user) => {
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${user.id}">${user.id}</option>`
    );
  });
};

const createOptionByStreet = (users) =>{
    streetOptions.insertAdjacentHTML('beforeend', `<option value="null">Filtre pela Rua</option>`)
    users.map((user)=>{
        streetOptions.insertAdjacentHTML('beforeend', `<option value="${user.address.street}">${user.address.street}</option>`)
    })

}
const filterById = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/?id=${id}`
  );
  const data = await response.json();
  fillTable(data);
};

const filterByStreet = async (street)=>{
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/?address.street=${street}`)
    const data = await response.json();
    fillTable(data);
}

const fillTable = (users) => {
  users.map((user) => {
    tbody.insertAdjacentHTML(
      "beforeend",
      `<td scope="col">${user.id}</td>
        <td>${user.name} </td>
        <td>${user.email} </td>
        <td>${user.address.street}  ${user.address.suite}</td>
        <td>${user.address.city}</td>
        <td>${user.phone}</td>
        <td>${user.company.name}</td>`
    );
  });
};

const handleFilter = () => {
  tbody.innerHTML = "";
  const id = document.querySelector("select").value;
    console.log(id);
  filterById(id);
};

const filterStreet=()=>{
    tbody.innerHTML = "";
    const street = document.getElementById('street').value
    
    filterByStreet(street)

}