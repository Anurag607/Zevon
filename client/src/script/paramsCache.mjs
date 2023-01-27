const colorCache = (argColor) => {
    if(argColor === 'NA') return;
    // console.log(argColor)
    let colors = document.querySelectorAll('.colors')
    colors.forEach(color => {
        if(color === argColor) {
            color.style.transform = 'scale(1.1)'
        } else {
            color.style.transform = ''
        }
    })
}

const sizeCache = (argSize) => {
    if(argSize === 'NA') return;
    // console.log(argSize)
    let sizes = document.querySelectorAll('.sizes')
    sizes.forEach(size => {
        if(size === argSize) {
            size.style.transform = 'scale(1.1)'
            size.style.backgroundColor = '#32de84'
            size.style.color = '#e8e8e8'
        } else {
            size.style.transform = 'scale(1)'
            size.style.backgroundColor = ''
            size.style.color = ''
        }
    })
}

export { colorCache, sizeCache}