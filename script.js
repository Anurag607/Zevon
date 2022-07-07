document.addEventListener('DOMContentLoaded', () => {
    let slideindex = 0;
    let slides = document.getElementsByClassName("slider");
    let shopbtn = document.getElementById("shopnow");
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
        slideindex++;
        slides[slideindex].style.display = "flex";
        if (slideindex === slides.length) slideindex = 0;
        setTimeout(slideshow,6000);
    }
    
    // shopbtn.onclick = () => {
    //     shopbtn.style.animation = "none";
    //     shopbtn.style.text-shadow = "0 0 20px white";
    //     shopbtn.style.box-shadow = "0 0 20px white";
    // }

    // slideshow();
    div.onscroll = autoscroll();
});