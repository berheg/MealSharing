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
                  <a class="collapsed card-link" data-toggle="collapse" href="#collapseTwo">
                      <h4 class="reservationTitle">Add a review for ${data[0].title} meals </h4>
                  </a>
              </div>
              <div id="collapseTwo" class="collapse" data-parent="#accordion">
                  <div class="card-body">
                      <form id="newMeal" class="reviewsForm text-center border border-light p-2 " action="#!" >
                          <!-- Title -->
                          <div class="form-row mb-4">
                              <div class="col">
                                  <!-- Last name -->
                                  <input type="text" name="name" id="defaultRegisterFormName" class="form-control" placeholder="Name">
                              </div>
                              <div class="col">
                                  <!-- Stars -->
                                  <input type="text" name="stars" id="defaultRegisterFormStars" class="form-control" placeholder="Stars">
                              </div>
                          </div>
                          <!-- Description -->
                          <div class="form-group mt-4">
                            <!--  <label for="quickReplyFormComment">Your comment</label>-->
                              <textarea class="form-control comment" name="comment" id="quickReplyFormComment" rows="5">Your comment.. </textarea>

                              <div class="text-center my-4">

                                  <button class="btn px-4 btn-info btn-lg" type="submit">Post</button>

                              </div>

                          </div>

                          <p class="resSucces"></p>

                          <p class="resError"></p>

                      </form>

                  </div>

              </div>

          </div>

          <div class="card">

              <div class="card-header">

                  <a class="collapsed card-link" data-toggle="collapse" href="#collapseThree">

                      <h4 class="reservationTitle">Place an order for a ${data[0].title} meal </h4>

                  </a>

              </div>

              <div id="collapseThree" class="collapse" data-parent="#accordion">

                  <div class="card-body">

                      <form class="reservationsForm">

                          <div class="form-row">

                              <div class="col">

                                  <input type="text" class="form-control" name="name" placeholder="Name">

                              </div>

                              <div class="col">

                                  <input type="email" class="form-control" name="email" id="inputEmail3" placeholder="Email">

                              </div>

                              <div class="col">

                                  <input type="text" class="form-control" name="phone" placeholder="Phone">

                              </div>

                              <button type="submit" class="btn btn-primary">CONFIRM</button>

                          </div>

                          <div class="resSucces reservationMessage"> </div>

                          <div class="resError reservationMessage"> </div>

                      </form>

                  </div>

              </div>

          </div>

      </div>

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
  const reservationsForm = document.querySelector('.reservationsForm');
           reservationsForm.addEventListener('submit', (e) => {
              e.preventDefault();
              let form = e.target;
              let nameInput = form.elements.name;
              let emailInput = form.elements.email;
              let phoneInput = form.elements.phone;
              let insertData = {
                 name: nameInput.value,
                 email: emailInput.value,
                 phone: phoneInput.value,
                 meal_id: params.id
              };
              console.log(insertData);
              const message = document.querySelector('.resSucces');

              const message2 = document.querySelector('.resError');

              if (

                 nameInput.value !== '' &&

                 phoneInput.value !== '' &&

                 emailInput.value !== ''

              ) {

                 fetch('/api/reservations', {

                    method: 'POST',

                    headers: { 'Content-Type': 'application/json' },

                    body: JSON.stringify(insertData)

                 })

                    .then((response) => {

                       response.json();

                    })

                    .then((data) => {

                       message.innerHTML = `Thank you ${nameInput.value}. Your ordered is now succesfully placed.  `;

                    });

              } else if (

                 nameInput.value == '' ||

                 phoneInput.value == '' ||

                 emailInput.value == ''

              ) {
                 message2.innerHTML = `Please, fill correctly the form.`;
              }
           });

           const reviewsForm = document.querySelector('.reviewsForm');



           reviewsForm.addEventListener('submit', (e) => {

              e.preventDefault();

              let form = e.target;

              let nameInput = form.elements.name;

              let starsInput = form.elements.stars;

              let commentInput = form.elements.comment;

              let insertData = {

                 name: nameInput.value,

                 stars: starsInput.value,

                 description: commentInput.value,

                 meal_id: params.id

              };

              console.log(insertData);

              const message = document.querySelector('.resSucces');

              const message2 = document.querySelector('.resError');

              if (

                 nameInput.value !== '' &&

                 starsInput.value !== '' &&

                 commentInput.value !== ''

              ) {

                 fetch('/api/reviews', {

                    method: 'POST',

                    headers: { 'Content-Type': 'application/json' },

                    body: JSON.stringify(insertData)

                 })

                    .then((response) => {

                       response.json();

                    })

                    .then((data) => {

                       message.innerHTML = `Thank you ${nameInput.value}. Your ordered is now succesfully placed.  `;

                    });

              } else if (

                 nameInput.value == '' ||

                 starsInput.value == '' ||

                 commentInput.value == ''

              ) {

                 message2.innerHTML = `Please, fill correctly the form.`;

              }

           });

        });



     //router.updatePageLinks();

  };
  export default handleMealRequest;
