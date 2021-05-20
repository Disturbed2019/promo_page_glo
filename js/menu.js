const menuElem = document.querySelector('.menu');
const burgerElem = document.querySelector('.humburger-menu');

const toggleMenu = () =>{
    menuElem.classList.toggle('menu-active');
    burgerElem.classList.toggle('humburger-menu-active');
};
burgerElem.addEventListener('click', toggleMenu);
menuElem.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('menu-list__link') ){
        toggleMenu();
    }
});
