// constants
const body = document.querySelector('body'),
  loader = document.querySelector('.loader-wrap'),
  links = document.querySelectorAll('a[href="#"]'),
  nav = document.querySelector('header nav'),
  navToggle = document.querySelector('header nav .toggle'),
  navSpanMiddle = document.querySelector('header nav .toggle .middle'),
  navNavigationBar = document.querySelector('header nav .navigation-bar'),
  navNavigationBarLi = document.querySelectorAll(
    'header nav .navigation-bar li'
  ),
  headerText = document.querySelector('header .text'),
  headerSection = document.querySelector('header'),
  aboutSection = document.querySelector('.about-us'),
  recipeSection = document.querySelector('.recipes'),
  menuSection = document.querySelector('.menu'),
  fixedImageSection = document.querySelector('.fixed-image'),
  footerSection = document.querySelector('footer'),
  dotOne = document.querySelector('.dots .one'),
  dotTwo = document.querySelector('.dots .two'),
  dotThree = document.querySelector('.dots .three'),
  dots = document.querySelectorAll('.dots > div'),
  logoImage = document.querySelector('header nav .logo img'),
  svgDown = document.querySelector('header .arrow-down'),
  svgUp = document.querySelector('.copyright .arrow-up'),
  menuImgs = document.querySelectorAll('.menu .menu-image-container img'),
  boxModel = document.querySelector('.menu .box-model'),
  menuImageContainer = document.querySelector('.menu-image-container'),
  boxModelArrow = document.querySelector('.menu .box-model .arrow'),
  boxModelImage = document.querySelector('.menu .box-model img'),
  pageTitle = document.querySelector('title');

// remove loader
function fadeOutEffect() {
  const fadeEffect = setInterval(function () {
    if (!loader.style.opacity) {
      loader.style.opacity = 1;
    }
    if (loader.style.opacity > 0) {
      loader.style.opacity -= 0.4;
    } else {
      body.classList.remove('stop-scroll');
      loader.classList.add('remove');
      clearInterval(fadeEffect);
    }
  }, 100);
}
window.addEventListener('load', fadeOutEffect);

// prevent links click hash
links.forEach((link) =>
  link.addEventListener('click', function (e) {
    e.preventDefault();
  })
);
// Open the modal
function openReservationForm() {
  document.getElementById('reservationModal').style.display = 'flex';
  document.body.classList.add('modal-open');
}

// Close the modal
function closeReservationForm() {
  document.getElementById('reservationModal').style.display = 'none';
  document.body.classList.remove('modal-open');
}

// Handle form submission
document
  .getElementById('reservationForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const reservationDetails = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      date: formData.get('date'),
      time: formData.get('time'),
      location: formData.get('location'),
      people: formData.get('people'),
      reservationNumber: Math.floor(10000 + Math.random() * 90000), 
    };

    // Data for EmailJS
    const emailData = {
      to_email: reservationDetails.email,
      admin_email: 'greengrowers04@gmail.com',
      to_name: reservationDetails.name,
      reservation_number: reservationDetails.reservationNumber,
      reservation_date: reservationDetails.date,
      reservation_time: reservationDetails.time,
      reservation_people: reservationDetails.people,
      reservation_location: reservationDetails.location,
    };

    // Send email to the customer
    emailjs.send('service_d7och29', 'template_2i72zpm', emailData).then(
      function () {
        console.log(`Email sent to customer: ${reservationDetails.email}`);
      },
      function (error) {
        console.error('Failed to send email to customer:', error);
      }
    );

    // Send email to the admin
    emailjs
      .send('service_d7och29', 'template_2i72zpm', {
        ...emailData,
        to_email: emailData.admin_email,
      })
      .then(
        function () {
          alert(
            `Reservation successful! An email has been sent to ${reservationDetails.email} and ${emailData.admin_email}. Reservation number: ${reservationDetails.reservationNumber}`
          );
          closeReservationForm();
          document.getElementById('reservationForm').reset();
        },
        function (error) {
          console.error('Failed to send email to admin:', error);
          alert('Failed to send reservation email. Please try again.');
        }
      );
  });

//email for contact us
document
  .getElementById('contactForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const serviceID = 'service_d7och29';
    const templateID = 'template_yvfj2a9';

    emailjs.sendForm(serviceID, templateID, this).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset();
      },
      function (error) {
        console.log('FAILED...', error);
        alert('Failed to send message.');
      }
    );
  });

// toggle hamburger menu button
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navSpanMiddle.classList.toggle('hide');
  navNavigationBar.classList.toggle('show');
});

// show active navigationbar li
navNavigationBarLi.forEach((li) =>
  li.addEventListener('click', () => {
    const arr = Array.from(li.parentElement.children);
    arr.forEach((li) => li.classList.remove('active'));
    li.classList.add('active');
  })
);

// svg-up smooth scroll
svgUp.addEventListener('click', () => {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
});

window.onscroll = function () {
  // make navbar fixed & change logo color
  if (window.pageYOffset > headerSection.offsetHeight - 75) {
    nav.classList.add('active');
    logoImage.src = 'logo.png';
  } else {
    nav.classList.remove('active');
    logoImage.src = 'logo.png';
  }

  // header welcome fade out and in
  if (window.pageYOffset > 0) {
    headerText.style.opacity = -window.pageYOffset / 300 + 1;
  }
  // home page JS
  if (pageTitle.text === 'ROSA- Restaurant') {
    //change dots background color
    if (window.pageYOffset < headerSection.offsetHeight * 0.5) {
      dots.forEach((dot) => dot.classList.remove('black'));
      dotTwo.classList.remove('active');
      dotOne.classList.add('active');
    } else if (
      window.pageYOffset > headerSection.offsetHeight * 0.5 &&
      window.pageYOffset < recipeSection.offsetTop * 0.72
    ) {
      dots.forEach((dot) => dot.classList.add('black'));
    } else if (
      window.pageYOffset > recipeSection.offsetTop * 0.75 &&
      window.pageYOffset < menuSection.offsetTop * 0.81
    ) {
      dots.forEach((dot) => dot.classList.remove('black'));
      dotOne.classList.remove('active');
      dotThree.classList.remove('active');
      dotTwo.classList.add('active');
    } else if (
      window.pageYOffset > menuSection.offsetTop * 0.81 &&
      window.pageYOffset < fixedImageSection.offsetTop * 0.86
    ) {
      dots.forEach((dot) => dot.classList.add('black'));
      dotThree.classList.remove('active');
      dotTwo.classList.add('active');
    } else if (
      window.pageYOffset > fixedImageSection.offsetTop * 0.86 &&
      window.pageYOffset < footerSection.offsetTop * 0.72
    ) {
      dots.forEach((dot) => dot.classList.remove('black'));
      dotTwo.classList.remove('active');
      dotThree.classList.add('active');
    } else if (
      window.pageYOffset > footerSection.offsetTop * 0.72 &&
      window.pageYOffset < footerSection.offsetTop * 0.901
    ) {
      dots.forEach((dot) => dot.classList.add('black'));
    } else if (window.pageYOffset > footerSection.offsetTop * 0.901) {
      dots.forEach((dot) => dot.classList.remove('black'));
    }
  }
};

// home page JS
if (pageTitle.text === 'ROSA- Restaurant') {
  // svg-down smooth scroll
  svgDown.addEventListener('click', () => {
    window.scroll({
      top: aboutSection.offsetTop - 30,
      behavior: 'smooth',
    });
  });

  // dots smooth scroll
  dots.forEach((dot) =>
    dot.addEventListener('click', function () {
      window.scrollTo({
        top: document.querySelector(this.dataset.x).offsetTop - 100,
        behavior: 'smooth',
      });
    })
  );

  // show box model
  menuImgs.forEach((img) =>
    img.addEventListener('click', function () {
      const arr = Array.from(this.parentElement.parentElement.children);

      arr.forEach((div) => div.classList.remove('active'));

      this.parentElement.classList.add('active');
      boxModel.classList.add('active');
      boxModelImage.src = this.src;
      boxModelImage.classList.add('active');
      body.classList.add('hide-scroll');
    })
  );

  // box model functions
  function boxModelFun(e) {
    // close box model
    if (
      e.code === 'Escape' ||
      (e.target.tagName === 'DIV' && !e.target.classList.contains('arrow')) ||
      e.target.classList.contains('close')
    ) {
      boxModel.classList.remove('active');
      body.classList.remove('hide-scroll');
    }

    if (boxModel.classList.contains('active')) {
      if (
        e.code === 'ArrowRight' ||
        e.code === 'ArrowLeft' ||
        e.target.classList.contains('arrow-right') ||
        e.target.classList.contains('arrow-left')
      ) {
        const arr = Array.from(menuImageContainer.children);
        const active = arr.find((div) => div.classList.contains('active'));

        // change box model image
        if (
          e.target.classList.contains('arrow-right') ||
          e.code === 'ArrowRight'
        ) {
          if (active.nextElementSibling === null) {
            active.parentElement.firstElementChild.classList.add('active');
            boxModelImage.src =
              active.parentElement.firstElementChild.firstElementChild.src;
          } else {
            active.nextElementSibling.classList.add('active');
            boxModelImage.src = active.nextElementSibling.firstElementChild.src;
          }
        }

        // change box model image
        else if (
          e.target.classList.contains('arrow-left') ||
          e.code === 'ArrowLeft'
        ) {
          if (active.previousElementSibling === null) {
            active.parentElement.lastElementChild.classList.add('active');
            boxModelImage.src =
              active.parentElement.lastElementChild.lastElementChild.src;
          } else {
            active.previousElementSibling.classList.add('active');
            boxModelImage.src =
              active.previousElementSibling.firstElementChild.src;
          }
        }
        active.classList.remove('active');
      }
    }
  }

  window.addEventListener('keydown', boxModelFun);
  window.addEventListener('click', boxModelFun);
  boxModelArrow.addEventListener('click', boxModelFun);
}
