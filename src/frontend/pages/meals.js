function handleMealRequest(params){
   fetch(`/api/meals/meal/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
         document.body.innerHTML = `
 <header>
    <div class="menu">
    <img class="logo" src="favicon.ico" alt="Logo of the company"
    />
        <div class="logo">
            <a href="/" data-navigo>
            <h1 class="logo-h1">ZOLLA RESTURANT</h1>
            </a>
          </div>
          <div>
              <ul>
                  <a href="/home" data-navigo>Home</a>
                  <a href="/meals" data-navigo>Meals</a>
              </ul>
          </div>
      </div>
  </header>

  <div class='container' style="height:100%">
      <div class=" col-lg-12">
          <div class="row">
              <div class="col">
                  <h1 class="display-1"> ${data[0].title}</h1>
              </div>
              <div class="row">
                  <div class="col-lg-5">
                      <img src="../../../assets/${data[0].title}.jpg" alt="${data[0].title}" />
                  </div>
                  <div class="col-lg-4 meal-desciption">
                      <h2>ABOUT THIS MEAL</h2>
                      <p>
                          <span></span>${data[0].description}
                      </p>
                      <p>
                        <span>
                          <i class="fa fa-map-marker"></i>
                        </span> ${data[0].location}
                      </p>
                      <p>
                        <span>
                          Price:
                          </span> ${data[0].price} Kr
                      </p>
                  </div>
              </div>
          </div>
      </div>
      <div id="accordion" class="col p-4 mt-12" >
          <div class="card">
              <div class="card-header">
                  <button class="reviewHideBtn" data-toggle="collapse">
                      <h4 class="reservationTitle">Add a review for ${data[0].title} meals </h4>
                  </button>
              </div>


          </div>

          <div class="card">

              <div class="card-header">

                  <button class="reservation-button" data-toggle="collapse" href="#collapseThree">

                      <h4 class="reservationTitle">Place an order for a ${data[0].title} meal </h4>

                  </button>

              </div>

              <aside>
                <form action="/api/reservations" class="reservationForm">
                  <h3 class="formH3">Avialable Reservations:</h3>
                  <label for="name">Reservation Form</label>
                  <input type="number"class="phoneInput" required placeholder="Phone Number">
                  <input type="text" class="nameInput" required placeholder="Name">
                  <input type="email" class="emailInput" required placeholder="Email">
                  <input type="number"class="guestInput" required placeholder="Guest Number">
                  <button class="formBtn">Book Seat</button>
                </form>
              </aside>

          </div>

      </div>
      <aside>
            <form action="/api/reviews" class="reviewForm">
                <h3 class="formHead">Fill in The Review Form </h3>
                <label for="name">Review Form</label>
                <section class = "mealLists"></section>
                <input type="text" class="titleInput" required placeholder="Title" name='title'>
                <input type="text" class="descriptionInput" required placeholder="Description" name='description'>
                <input type="number"class="starInput" required placeholder="Star in number" name='stars'>
                <button class="reviewFormBtn" submit>Submit</button>
            </form>
        </aside>
  </div>

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
  const reviewHideBtn=document.querySelector('button.reviewHideBtn');
  reviewHideBtn.addEventListener('click', ()=>{
    const reviewForm = document.querySelector('.reviewForm');
    reviewForm.style.display='flex';
  })
  const reviewFormBtn = document.querySelector('button.reviewFormBtn');
  reviewFormBtn.addEventListener('click', (e)=>{
    //e.preventDefault();
    reviewFormBtnEventHandler(params, e);
  } );
  const reservationButton = document.querySelector('button.reservation-button');
  reservationButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const reservationForm = document.querySelector('.reservationForm');
    reservationForm.style.display='flex';
  });
  //const reservationsForm = document.querySelector('.reservationsForm');
           // reservationsForm.addEventListener('submit', (e) => {
           //    e.preventDefault();
           //    let form = e.target;
           //    let nameInput = form.elements.name;
           //    let emailInput = form.elements.email;
           //    let phoneInput = form.elements.phone;
           //    let insertData = {
           //       name: nameInput.value,
           //       email: emailInput.value,
           //       phone: phoneInput.value,
           //       meal_id: params.id
           //    };
           //    console.log(insertData);
           //    const message = document.querySelector('.resSucces');
           //
           //    const message2 = document.querySelector('.resError');
           //
           //    if (
           //
           //       nameInput.value !== '' &&
           //
           //       phoneInput.value !== '' &&
           //
           //       emailInput.value !== ''
           //
           //    ) {
           //
           //       fetch('/api/reservations', {
           //
           //          method: 'POST',
           //
           //          headers: { 'Content-Type': 'application/json' },
           //
           //          body: JSON.stringify(insertData)
           //
           //       })
           //
           //          .then((response) => {
           //
           //             response.json();
           //
           //          })
           //
           //          .then((data) => {
           //
           //             message.innerHTML = `Thank you ${nameInput.value}. Your ordered is now succesfully placed.  `;
           //
           //          });
           //
           //    } else if (
           //
           //       nameInput.value == '' ||
           //
           //       phoneInput.value == '' ||
           //
           //       emailInput.value == ''
           //
           //    ) {
           //       message2.innerHTML = `Please, fill correctly the form.`;
           //    }
           // });

           // const reviewsForm = document.querySelector('.reviewsForm');
           //
           //
           //
           // reviewsForm.addEventListener('submit', (e) => {
           //
           //    e.preventDefault();
           //
           //    let form = e.target;
           //
           //    let nameInput = form.elements.name;
           //
           //    let starsInput = form.elements.stars;
           //
           //    let commentInput = form.elements.comment;
           //
           //    let insertData = {
           //
           //       name: nameInput.value,
           //
           //       stars: starsInput.value,
           //
           //       description: commentInput.value,
           //
           //       meal_id: params.id
           //
           //    };
           //
           //    console.log(insertData);
           //
           //    const message = document.querySelector('.resSucces');
           //
           //    const message2 = document.querySelector('.resError');
           //
           //    if (
           //
           //       nameInput.value !== '' &&
           //
           //       starsInput.value !== '' &&
           //
           //       commentInput.value !== ''
           //
           //    ) {
           //
           //       fetch('/api/reviews', {
           //
           //          method: 'POST',
           //
           //          headers: { 'Content-Type': 'application/json' },
           //
           //          body: JSON.stringify(insertData)
           //
           //       })
           //
           //          .then((response) => {
           //
           //             response.json();
           //
           //          })
           //
           //          .then((data) => {
           //
           //             message.innerHTML = `Thank you ${nameInput.value}. Your ordered is now succesfully placed.  `;
           //
           //          });
           //
           //    } else if (
           //
           //       nameInput.value == '' ||
           //
           //       starsInput.value == '' ||
           //
           //       commentInput.value == ''
           //
           //    ) {
           //
           //       message2.innerHTML = `Please, fill correctly the form.`;
           //
           //    }
           //
           // });

        });



     //router.updatePageLinks();

  };
  async function reviewFormBtnEventHandler(params, e){
    const form = e.target;
    const review = {
      title: form.elements.title,
      description: form.element.description,
      review_meal_id: params.id,
      stars: form.elements.stars,
      created_date: new Date()
      //phone_number: phoneInput.value
    }
    fetch('/api/reservations', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: review
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    };

  export default handleMealRequest;
