'use strict';

const navListEl = document.querySelector('.nav__list');
const navEl = document.querySelector('.nav');
const navLinkEl = document.querySelectorAll('.nav__link');
const section1El = document.querySelector('.about-me');

// Page Navigation
navListEl.addEventListener('click', function (e) {
  // Matching the strategy
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// Menu Fade Animation
const handleHover = function (e) {
  console.log(e.target.classList.contains('nav__link'));
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const children = navListEl.querySelectorAll('.nav__link');

    children.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

// Passing an "argument" into handler
navListEl.addEventListener('mouseover', handleHover.bind(0.5));
navListEl.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////
// Sticky navigation: Intersection Observer API
const headerEl = document.querySelector('.header');
const navHeightEl = navEl.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navEl.classList.add('nav--sticky');
    navLinkEl.forEach(el => {
      el.classList.add('nav__link--sticky');
    });
  } else {
    navEl.classList.remove('nav--sticky');
    navLinkEl.forEach(el => {
      el.classList.remove('nav__link--sticky');
    });
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeightEl}px`,
});
headerObserver.observe(headerEl);

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
        `<button class="btn btn__dot" data-slide="${i}"></button>`
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
