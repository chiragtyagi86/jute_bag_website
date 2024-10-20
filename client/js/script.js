var swiper = new Swiper(".default-carousel", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  new Swiper('.swiper', {
    effect: 'fade',
    loop: true,
    autoplay: {
      delay: 5000,
    },
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      prevEl: '.swiper-prev-button',
      nextEl: '.swiper-next-button',
    },
  })
  