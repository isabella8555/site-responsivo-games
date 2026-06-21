let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.menu');
let bell = document.querySelector('#bell-icon');
let notification = document.querySelector('.notification');

// Abrir/Fechar Menu Lateral
menu.onclick = () => {
    navbar.classList.toggle('active');
    menu.classList.toggle('move');
    bell.classList.remove('active');
};

// Abrir/Fechar Caixa de Notificações
bell.onclick = () => {
    notification.classList.toggle('active');
};






var swiper = new Swiper(".trending-content", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay:5000,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        1068: {
            slidesPerView: 4,
            spaceBetween: 20,
        }
    }
});





// Corrigido: Removido listener duplicado para o chatbot funcionar corretamente





var adsSwiper = new Swiper(".ads-swiper", {
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});