window.app = new RickAndMortyController();

window.addEventListener('load', () => {
    [...document.querySelectorAll('.loader')].forEach(el => {
        el.classList.add("hidden");
    });
});

document.querySelector("#btnHome").addEventListener('click', e=>{
    window.location ='/';
});