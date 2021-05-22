// const smoothScrollElems = document.querySelectorAll('a[href^="#"]:not(a[href="#"])');
// smoothScrollElems.forEach(link => {
//     link.addEventListener('click',(event) =>{
//         event.preventDefault();
//         const id = link.getAttribute('href').substring(1);
//         document.getElementById(id).scrollIntoView({
//             behavior:'smooth'
//         });
//     });
// });

const speed = 0.5;
const scrolled = e => {

    const target = e.target;
    if (target.matches('[href^="#"]')){
        e.preventDefault();
        let start = 0 ;
        const pageY = window.pageYOffset;
        const hash = target.getAttribute('href');
        if (hash ==='#') return
        const elem = document.querySelector(hash);
        const coordinateElem = elem.getBoundingClientRect().top;
        const step = time => {
            if (!start) start = time;
            const progress = time - start;
            const r = (coordinateElem < 0 ?
            Math.max(pageY - progress / speed, pageY + coordinateElem) :
            Math.min(pageY + progress / speed, pageY + coordinateElem))
            window.scrollTo(0, r);
            if (r < pageY + coordinateElem) requestAnimationFrame(step)
        };
        requestAnimationFrame(step)
    }
};
document.body.addEventListener('click', scrolled);