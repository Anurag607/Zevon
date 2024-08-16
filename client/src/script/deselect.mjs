const deSelectSize = () => {
    let sizes = document.querySelectorAll('.sizes')
    sizes.forEach(size => {
        size.style.backgroundColor = ''
        size.style.color = ''
    })
}

const deSelectColor = () => {
    const colors = document.querySelectorAll('.colors')
    const halo = document.querySelectorAll('.colorHalo')
    colors.forEach(color => {
        color.style.transform = ''
    })
    halo.forEach(ring => {
        ring.style.width = '0rem'
        ring.style.height = '0rem'
    })
}

const deSelectOptions = () => {
    const upi = document.querySelector('.option_upi')
    const card = document.querySelector('.option_card')
    upi.addEventListener('click', () => {
        upi.checked = true;
        card.checked = false;
    })
    card.addEventListener('click', () => {
        card.checked = true;
        upi.checked = false;
    })
}

export {deSelectSize, deSelectColor, deSelectOptions}