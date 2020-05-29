async function homeRouter(req, router) {
  //getBodyContainer();
  const data = await fetchServer();
  renderHTML(data);
  console.log(`Welcome to my home page! The request url is ${req.url}`);
}
//mealsId();

async function fetchServer(){
  const res = await fetch(`/api/meals`);
  const jsonData = await res.json();
  await console.log(jsonData);
  return JSON.parse(jsonData);
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
      <a href="/">Home</a>
      <a href="/meals">Menu</a>
      <a href="/review">Review</a>
    </nav>
  </header>  <!--header end-->

  </div>

  <section class="bigContainer">
  <div class="backgroudPic">
  <img src="../../../assets/vegan.jpg" alt="background picture">
  <img src="../../../assets/mixed.jpg" alt="background picture">
  <img src="../../../assets/kitfo.jpg" alt="background picture">
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
  <footer>
    <!-- Footer main -->
    <section class="ft-main">
      <div class="ft-main-item">
        <h2 class="ft-title">Contact</h2>
        <ul>
          <li>Email: zolla-cop@gmail.dk</li>
          <li>Tlf: 40906030</li>
          <li></li>
        </ul>
      </div>
    </section>
    <!-- Footer social -->
    <section class="ft-social">
      <ul class="ft-social-list">
        <li><a href="#"><i class="fab fa-facebook"></i></a></li>
        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
        <li><a href="#"><i class="fab fa-github"></i></a></li>
        <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
        <li><a href="#"><i class="fab fa-youtube"></i></a></li>
      </ul>
    </section>

    <!-- Footer legal -->
    <section class="ft-legal">
      <ul class="ft-legal-list">
        <li><a href="#">Terms &amp; Conditions</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li>&copy; 2020 Copyright Nowrap Inc.</li>
      </ul>
    </section>
  </footer>`;

}

export default homeRouter;
