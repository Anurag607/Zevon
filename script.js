document.addEventListener('DOMContentLoaded', () => {
    let slideindex = 0;
    let slides = document.getElementsByClassName("slider");
    let dots = document.getElementsByClassName("dot");
    let div = document.querySelector('html');
    let rect = div.getBoundingClientRect();
    console.log(rect);
    function autoscroll() {
        if (rect.top < 0) {
            window.scrollBy(rect.height);
            alert('Viewport Changed');
        }
    }

    function slideshow() {
        for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
        slides[slideindex].style.display = "flex";
        slideindex++;
        if (slideindex === slides.length) slideindex = 0;
        setTimeout(slideshow,6000);
    }

    // slideshow();
    // autoscroll();
});