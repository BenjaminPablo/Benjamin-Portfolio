'use strict';
const btnScrollTo = document.querySelector('.btn--down');
const btnMobile = document.querySelector('.btn--mobile');
const section1 = document.querySelector('.about-me');
const navMainEl = document.querySelector('.nav--main');
const navMobileEl = document.querySelector('.nav--mobile');
const navEl = document.querySelector('.nav');
const allSections = document.querySelectorAll('.section');
const navLinksEl = document.querySelectorAll('.nav__link');
const headerEl = document.querySelector('.header');
const navBackground = document.querySelector('.nav__background');
const btnIconMenuEl = document.querySelector('.btn__icon--menu');
const btnIconCloseEl = document.querySelector('.btn__icon--close');

////////////////////////////////////////////////////
// Mobile functionality
btnMobile.addEventListener('click', () => {
  navBackground.classList.toggle('nav__background--active');
  navEl.classList.toggle('nav--active');
  btnIconMenuEl.classList.toggle('btn__icon--hidden');
  btnIconCloseEl.classList.toggle('btn__icon--hidden');
});

//////////////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////
// Page Navigation
navMainEl.addEventListener('click', function (e) {
  // Matching the strategy
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
    navBackground.classList.remove('nav__background--active');
  }
});

navMobileEl.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link--mobile')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
    navBackground.classList.toggle('nav__background--active');
    navEl.classList.toggle('nav--active');
    btnIconMenuEl.classList.toggle('btn__icon--hidden');
    btnIconCloseEl.classList.toggle('btn__icon--hidden');
  }
});

//////////////////////////////////////////////
// Menu Fade Animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    navLinksEl.forEach(navLink => {
      if (navLink !== link) navLink.style.opacity = this;
    });
  }
};
// Passing an "argument" into handler
navMainEl.addEventListener('mouseover', handleHover.bind(0.5));
navMainEl.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////
// Sticky navigation: Intersection Observer API
const navHeightEl = navMainEl.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navMainEl.classList.add('nav--sticky');
    navLinksEl.forEach(el => {
      el.classList.add('nav__link--sticky');
    });
    btnMobile.classList.add('u-sticky');
  } else {
    navMainEl.classList.remove('nav--sticky');
    navLinksEl.forEach(el => {
      el.classList.remove('nav__link--sticky');
    });
    btnMobile.classList.remove('u-sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeightEl}px`,
});
headerObserver.observe(headerEl);

//////////////////////////////////////////////
// Reveal Sections on scroll

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////////////////
// Slider
const slider = () => {
  const slides = document.querySelectorAll('.slider__slide');
  const btnLeft = document.querySelector('.btn--left');
  const btnRight = document.querySelector('.btn--right');
  const dotContainer = document.querySelector('.slider__dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = () => {
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="btn btn__dot" data-slide="${i}" aria-label="Button Dot"></button>`
      )
    );
  };

  const activateDot = slide => {
    document
      .querySelectorAll('.btn__dot')
      .forEach(dot => dot.classList.remove('btn__dot--active'));

    document
      .querySelector(`.btn__dot[data-slide="${slide}"]`)
      .classList.add('btn__dot--active');
  };

  const goToSlide = slide =>
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );

  // Next slide
  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous slide
  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('btn__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
