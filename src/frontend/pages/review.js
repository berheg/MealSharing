const formBtn = document.querySelector('button.formBtn');
const phoneInput = document.querySelector('input.phoneInput');
const nameInput = document.querySelector('input.nameInput');
const emailInput = document.querySelector('input.emailInput');
const guestInput = document.querySelector('input.guestInput');
const searchInput = document.querySelector('input.searchInput');
const listSelect = document.querySelector('list.listSelect');
const selectMealList= document.querySelector('mealLists');
const h2 = document.querySelector('h2.mealId');
const h3 = document.querySelector('h3.formHead');
let id;
async function review(req, res) {
  //console.log(req.param.id);
  getBodyContainer();
  //id = req.params.id;
  //h2.innerHTML += id;
  const data = await fetchServer(`/api/meals/`);
  await renderHTML(data);
  const select = document.createElement('select.list-options');
  data.forEach((element) => {
    const option = document.createElement('OPTION');
    option.value=element.title;
    option.title=element.title;
    select.appendChild(option);
  });

  selectMealList.appendChild(select);
  formBtn.addEventListener('click', formBtnEventHandler)
  //searchBtn.addEventListener('keyup',inputEventHandler);
  searchInput.addEventListener('keyup',searchMealList);
  listSelect.addEventListener('click', () =>searchInput.innerHTML = listSelect.value);
  //search input blur event handler
  searchInput.addEventListener('blur', () =>{
  searchInput.value = '';
  selectListDiv.style.zIndex = -2;
});
}
//review();

async function fetchServer(id){
  const res = await fetch(`/api/meals/${id}`);
  const jsonData = await res.json();
  console.log(jsonData[0]);
  console.log(jsonData);
  return jsonData;
}

function getBodyContainer(){
  document.body.innerHTML = `
  <div id="background" class="">
  <!--header start-->
  <header>
    <img class="logo" src="favicon.ico" alt="Logo of the company"
    />
    <h1 class="logo-h1">ZOLLA RESTURANT</h1>
    <nav class="navbar">
      <a href="/">Home</a>
      <a href="/meals">Menu</a>
      <a href="/review">Review</a>
    </nav>
  </header>  <!--header end-->
  <aside>
        <form action="/api/reviews" class="reviewForm">
            <h3 class="formHead">Fill in The Review Form </h3>
            <label for="name">Review Form</label>
            <section class = "mealLists"></section>
            <input type="text" class="titleInput" required placeholder="Title">
            <input type="text" class="descriptionInput" required placeholder="Description">
            <input type="number"class="starInput" required placeholder="Star in number">
            <button class="reviewFormBtn">Submit</button>
        </form>
    </aside>
  <section class="bigContainer">
    <div class="search">
      <input type="text" placeholder="Enter meal title" class="searchInput">
      <button class="searchBtn">Search</button>
    </div>

    <div>
        <div class="searchList">
            <ul class="searchMealList"></ul>
        </div>
        <div class="backgroudPic">
            <img src="../../../assets/vegan.jpg" alt="background picture">
            <img src="../../../assets/mixed.jpg" alt="background picture">
            <img src="../../../assets/kitfo.jpg" alt="background picture">
        </div>

    </div>


  </section>
  <footer>
      <p>© 2019 Copenhagen</p>
      <p> Email: zolla-cop@gmail.dk</p>
      <p> Tlf: 40906030</p>
  </footer>`;
}
async function formBtnEventHandler(){
  const reservation = {
    number_of_guests: guestInput.value,
    meal_id: id,
    created_date: new Date()
    //phone_number: phoneInput.value
  }
  fetch('/api/reservations', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: reservation
  })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
  };

//search product lists with searchkey
function searchMealList(searchKey){
  console.log(mealLists);
  const searchedList = mealLists.filter((meal) =>{
    return meal.name.toLowerCase().includes(searchKey.toLowerCase())});
  console.log(searchedList);
  return searchedList;
}
  export default review;
