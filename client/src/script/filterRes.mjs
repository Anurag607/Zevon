import Cookie from 'js-cookie'

const filterRes = (isSubmit) => {
    const filterOptions = document.querySelector('.filterOptions')
    const resList = document.querySelector('.resList')
    const filterForm = document.querySelector('.filterForm')
    const filterColor = document.querySelectorAll('.filterColor')

    if (filterOptions.offsetHeight < resList.offsetHeight) {
        filterOptions.style.height = `${resList.offsetHeight + 25}px`
        filterOptions.style.borderColor = 'transparent'
    }
    let formData = ''
    let filterParams = {}

    filterColor.forEach((el, i) => {
        el.onclick = () => {
            if (el.children[0].checked == true) {
                el.style.color = '#ffffff'
                el.style.backgroundColor = el.dataset.color
            }
            else {
                el.style.color = '#000000'
                el.style.backgroundColor = 'transparent'
            }
        }
    })

    const filterFormSubmitHandler = () => {
        formData = new FormData(filterForm)
        for (let pair of formData.entries()) {
            if (filterForm.hasOwnProperty(pair[0])) {
                let value = `${filterParams[pair[0]]},${pair[1]}`
                filterParams[pair[0]] = value
            } else filterParams[pair[0]] = pair[1]
        }
        for (let i of Object.keys(filterParams)) {
            const value = filterParams[i]
            filterParams[i] = value.slice(10, value.length)
        }
        if (filterParams.hasOwnProperty('cost')) {
            let range = Array.from(new Set(filterParams['cost'].split(',')))
            filterParams['cost'] = `${range[0]},${range[range.length - 1]}`
        }
        for (let i of Object.keys(filterParams)) {
            const value = filterParams[i]
            filterParams[i] = value.split(',')
        }
        if (!filterParams.gender) filterParams['gender'] = []
        if (!filterParams.color) filterParams['color'] = []
        if (!filterParams.cost) filterParams['cost'] = []
        if (!filterParams.category) filterParams['category'] = []
        let body = {
            url: "",
            data: filterParams,
        }
        Cookie.set('filterParams', JSON.stringify(body))
    };

    if (isSubmit) filterFormSubmitHandler();

    // filterForm.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     filterFormSubmitHandler();
    // });
}

export default filterRes