import React from 'react'
import main from '../../src/script/main.mjs'
import styles from '../styles/filter.module.scss'

// Color Filter :------------------------------------------------------------------------------------

const ColorGen = (props: {color: string, hexcode: string}) => {
    return (
        <div>
            <div className={`${styles["colors"]} FilterColors`} data-toggle="off" style={{background: `${props.hexcode}`}} />
            <span className={`${styles["color-txt"]} ColorTxt`}>{props.color}</span>
        </div>
    )
}

const DropdownColor = () => {
    const colors = ["Red", "Green", "Yellow", "Blue", "Black", "White", "Orange", "Purple", "Pink", "Gray", "Brown", "Teal"]
    const hex = ["#ff4040", "#4cbb17", "#ffef00", "#2a52be", "#000000", "#e8e8e8", "#fc6a03", "#7851a9", "#faafba", "#37474f", "#65350f", "#008080"]
    return (
        <div className={`${styles.dropdown} ${styles.color} Dropdowns Colors`}>
            {colors.map((el,i) => {
                return <ColorGen key={i} color={el} hexcode={hex[i]} />
            })}
        </div>
    )
}

// Category Filter :------------------------------------------------------------------------------------

const CatGen = (props: {category: string, image: string, type: string}) => {
    let src = `/${props.image}.png`
    return (
        <div className={`FilterCategories ${styles["categories"]}`}>
            <span className={`categoryImg ${styles["categoryImg"]}`} data-toggle="off" style={{backgroundImage: `url('${src}')`}} />
            <span className={`CatTxt ${styles["cat-txt"]}`} data-type={`${props.type}`}>{props.category}</span>
        </div>
    )
}

const DropdownCategory = () => {
    const category = ["Shirts & Tops", "Pants & Lowers", "Jackets", "Accessories", "Shoes & Footwear"]
    const type = ["shirt", "lowers", "jackets", "accessories", "shoes"]
    const img = ['tshirt', 'pants', 'jacket', 'accesories', 'shoes']
    return (
        <div className={`${styles.dropdown} ${styles.categoryCont} Dropdowns Categories`} id="dropdown">
            {category.map((el,i) => {
                return <CatGen key={i} category={el} image={img[i]} type={type[i]}/>
            })}
        </div>
    )
}

const FilterDropDowns = () => {

    React.useEffect(() => {
        main()
    },[])


    return (
        <section className={styles.dropdownWrapper}>
            <DropdownColor />
            <DropdownCategory />
        </section>
    )
}

export default FilterDropDowns