'use strict';

const btnMobile = document.querySelector('.btn__mobile');
const btnMobileBackground = document.querySelector('.btn__background');
const navEl = document.querySelector('.nav');
const navListEl = document.querySelector('.nav__list');
const navLinkEl = document.querySelectorAll('.nav__link');

btnMobile.addEventListener('click', function () {
  btnMobileBackground.classList.toggle('btn__background--open');
  navEl.classList.toggle('nav--mobile');
  navListEl.classList.toggle('nav__list--mobile');
  navLinkEl.forEach(el => {
    el.classList.toggle('nav__link--mobile');
  });
});
