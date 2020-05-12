async function homeRouter(req, router) {
  getBodyContainer();
  const data = await fetchServer();
  renderHTML(data);
}
mealsId();
async function fetchServer(){
  const res = await fetch(`/api/meals`);
  const jsonData = await res.json();
  return jsonData;
}
//renders lists of data
function renderHTML(data){
  const ulTitle = document.querySelector('ul.mealTitle');
  const ulList = document.querySelector('ul.mealUl');
  ulList.innerHTML = "";
	for(let i=0; i< data.length;i++){
    const liTag = document.createElement('li');
    const liDescription = document.createElement('li');
    const  liLocation = document.createElement('li');
    liTag.innerHTML = data[i].title;
    if (i === 0){
      const liDesc = document.createElement('li');
      liDesc.innerHTML = 'Description';
      ulList.appendChild(liDesc);
    }
    liDescription.innerHTML = data[i].description;
    liLocation.innerHTML = data[i].location;
    ulTitle.appendChild(liTag);
    ulList.appendChild(liDescription);
    //ulList.appendChild(liLocation);
  }

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
      <a href="/">Menu</a>
      <a href="/meal">Reservations</a>
      <a href="/review">Review</a>
    </nav>
  </header>  <!--header end-->

  </div>

  <section class="bigContainer">
  <div class="backgroudPic">
  <img src="../../../assets/vegan.jpg" alt="background picture">
  <img src="../../../assets/vegan2.jpg" alt="background picture">
  <img src="../../../assets/meat.jpg" alt="background picture">
</div>
      <h2>All Meals in the database</h2>
      <div class="mealBox">
      <ul  class="mealTitle">
        <li>Title</li>
      </ul>

      <ul id="mealList" class="mealUl"></ul>

    </div>
  </section>

  <section id="" class="">
    <div class="">
      <h2 class=""></h2>
      <ul id="" class=" "></ul>
    </div>

  </section>
  <section id="">
    <div id="" class="">
      <h2 class=""></h2>
    </div>
  </section>
  <footer class="footer">
      <p>© 2019 Copenhagen</p>
      <p> Email: zolla-cop@gmail.dk</p>
      <p> Tlf: 40906030</p>
  </footer>`;

}

export default homeRouter;
