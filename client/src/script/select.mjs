const selectColor = (i) => {
    const colors = document.querySelectorAll('.colors')
    const halo = document.querySelectorAll('.colorHalo')
    if(colors[i].style.transform === '') {
        colors[i].style.transform = 'scale(1.1)'
    } else {
        colors[i].style.transform = ''
    }
    if(halo[i].style.width === '0rem' && halo[i].style.height === '0rem') {
        console.log(`${colors[i].offsetWidth*0.085}rem`)
        halo[i].style.width = `${colors[i].offsetWidth*0.085}rem`
        halo[i].style.height = `${colors[i].offsetHeight*0.085}rem`
    } else {
        halo[i].style.width = '0rem'
        halo[i].style.height = '0rem'
    }
}

export {selectColor}