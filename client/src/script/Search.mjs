// Searchbox...........................

const search = () => {
    const search = document.querySelector("#searchbox");
    const searchinput = search.children[0];
    const searchico = document.querySelector("#search-img");
    searchico.onclick = () => {
        console.log(1)
        if (searchico.dataset.toggle == "off") {
            searchinput.style.display = "block";
            searchico.dataset.toggle = "on";
            setTimeout(() => {
                searchinput.style.width = "12.5rem";
                searchinput.style.opacity = "1"
            },0)
        }
        else {
            searchinput.style.width = "0";
            searchinput.style.opacity = "0"
            searchico.dataset.toggle = "off";
            setTimeout(() => {
                searchinput.style.display = "none";
            },300)
        }
    }
}

const searchonclick = (event) => {
    const search = document.querySelector("#searchbox");
    const searchinput = document.querySelector('#searchInput');
    const searchico = document.querySelector("#search-img");
    const target = event.currentTarget
    if (target.dataset.toggle == "off") {
        searchinput.style.display = "block";
        target.dataset.toggle = "on";
        console.log(target.dataset.toggle)
        setTimeout(() => {
            searchinput.style.width = "12.5rem";
            searchinput.style.opacity = "1"
        },0)
    }
    else {
        searchinput.style.width = "0";
        searchinput.style.opacity = "0"
        target.dataset.toggle = "off";
        console.log(target.dataset.toggle)
        setTimeout(() => {
            searchinput.style.display = "none";
        },300)
    }
}

export { search, searchonclick };