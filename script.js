document.addEventListener('DOMContentLoaded', () => {

    // Searchbox...........................
    var search = document.querySelector(".searchbox");
    var searchinput = search.children[0];
    var searchico = search.children[1];
    search.onclick = () => {
        if (searchico.dataset.toggle == "off") {
            searchico.style.filter = "none";
            searchinput.style.width = "12.5rem";
            searchico.dataset.toggle = "on";
        }
        else {
            searchico.style.filter = "invert(1)";
            searchinput.style.width = "0";
            searchico.dataset.toggle = "off";
        }
    }

    // Title Background...........................
    var title = document.querySelector('#title');
    var imgs = ['./images/mt1rs.jpg', './images/mt2rs.jpg', './images/mt3rs.jpg', './images/mt4rs.jpg', './images/mt5rs.jpg'];
    var bgindex = 0;
    function titlebg() {
        title.style.backgroundImage = 'url(' + imgs[bgindex] + ')';
        bgindex++;
        if(bgindex > imgs.length-1) bgindex = 0;
        setTimeout(titlebg, 5000);
    }
    titlebg();

    // Slideshow...........................
    // Automatic
    var slideindex = 0;
    var slides = document.querySelectorAll(".slider");
    function slideshow() {
        slides.forEach((slides) => {
            slides.style.display = 'none';
        })
        slideindex++;
        if (slideindex > slides.length-1) slideindex = 0;
        slides[slideindex].style.display = 'block';
        setTimeout(slideshow,4000);
    }
    slideshow();
    // Manual
    var dots = document.querySelectorAll(".dot");
    dots.forEach((dots) => {
        dots.onclick = () => {
            var slide = document.querySelector(`${this.slide}"`);
            slide.style.display = 'none';
        }
    });
    
    // Shop Button...........................
    var shop = document.querySelector("#shopnow");
    var shopico = shop.children[0];
    var shoptxt = shop.children[1];
    shop.onmouseover = () => {
        shoptxt.style.opacity = "1";
        shoptxt.style.width = "16rem";
        shoptxt.style.color = "rgba(255, 255, 255, 1)";
        shopico.style.opacity = "0";
        shopico.style.transition = "all 0.3s";
        shop.style.transform = "translateX(-1.75rem)";
    }
    shop.onmouseout = () => {
        shoptxt.style.opacity = "0";
        shoptxt.style.width = "0";
        shoptxt.style.color = "rgba(255, 255, 255, 0)";
        shopico.style.opacity = "1";
        shopico.style.transition = "all 0.95s";
        shop.style.transform = "none";
    }

    // Paginator...........................
    var next = document.querySelector("#next");
    var prev = document.querySelector("#prev");
    var card = document.querySelectorAll(".cardcont");
    var carddivs = card.length;
    var cardindex = 0;
    function paginator() {
        next.onclick = () => {
            card.forEach(card => {
                card.style.display = 'none';
            })
            cardindex++;
            if (cardindex > carddivs-1) cardindex = 0;
            card[cardindex].style.display = 'block';
        }
        prev.onclick = () => {
            card.forEach(card => {
                card.style.display = 'none';
            })
            cardindex--;
            if (cardindex < 0) cardindex = carddivs-1;
            card[cardindex].style.display = 'block';
        }
    }
    paginator();

    // Filter Menu...........................
    var filter = document.querySelector(".filter");
    var filterbtn = filter.children[0];
    var filtermenu = document.querySelector(".items-wrapper");
    var menuitems = document.querySelectorAll(".menu-items");
    var listitems = document.querySelectorAll(".dropdown-content");
    filter.onclick = () => {
        if (filterbtn.dataset.toggle === "off") {
            filtermenu.style.opacity = '1';
            filtermenu.style.display = 'flex';
            filterbtn.dataset.toggle = "on";
        }
        else {
            filtermenu.style.opacity = '0';
            setTimeout(() => {
                filtermenu.style.display = 'none';
            },300);
            filterbtn.dataset.toggle = "off";
        }
    }
    for (let i = 0; i < menuitems.length; i++) {
        menuitems[i].onclick = () => {
            if (menuitems[i].dataset.toggle === "off") {
                listitems[i].style.opacity = '1';
                listitems[i].style.display = 'flex';
                menuitems[i].dataset.toggle = "on";
            }
            else {
                listitems[i].style.opacity = '0';
                setTimeout(() => {
                    listitems[i].style.display = 'none';
                },300);
                menuitems[i].dataset.toggle = "off";
            }
        }
    }

    var colors = listitems[2].children;
    console.log(colors);
    colors.onmouseover = () => {
        colors.style.color = colors.innerHTML;
    }
});