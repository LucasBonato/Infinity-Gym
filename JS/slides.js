let slides = document.getElementsByClassName('splide');

for(let i = 0; i < slides.length; i++){
    new Splide(slides[i], {
        type   : 'loop',
        autoplay: true,
    }).mount();
}