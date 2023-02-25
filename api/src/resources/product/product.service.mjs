import pool from '../../utils/db.mjs'

const getAllProducts = async () => {
    console.log(`SELECT * FROM product;`)
    return pool.query(`SELECT * FROM product;`)
}
const getProductsByColor = async (color, len) => {
    if (len === 1) {
        console.log(`SELECT * FROM product WHERE color = ${color};`)
        return pool.query(`SELECT * FROM product WHERE color = ${color};`)
    }
    return pool.query(`SELECT * FROM product WHERE color IN (${color});`)
}
const getProductsByCategory = async (category, len) => {
    if (len === 1) {
        console.log(`SELECT * FROM product WHERE product_type = ${category};`)
        return pool.query(`SELECT * FROM product WHERE product_type = ${category};`)
    }
    return pool.query(`SELECT * FROM product WHERE product_type IN (${category});`)
}
const getProductsByCost = async (lowerCost, upperCost) => {
    console.log(pool.query(`SELECT * FROM product WHERE cost >= (${lowerCost}) AND cost <= (${upperCost});`))
    return pool.query(`SELECT * FROM product WHERE cost >= (${lowerCost}) AND cost <= (${upperCost});`)
}
const getProductsBySex = async (gender, len) => {
    if (len === 1) {
        console.log(`SELECT * FROM product WHERE gender = ${gender};`)
        return pool.query(`SELECT * FROM product WHERE gender = ${gender};`)
    }
    console.log(`SELECT * FROM product WHERE gender IN (${gender});`)
    return pool.query(`SELECT * FROM product WHERE gender IN (${gender});`)
}

const getBySearchParams = async (searchParams) => {
    if (searchParams === 'pants' || searchParams === 'pant') searchParams = 'lowers'
    if (searchParams == 'tops' || searchParams === 'top' || searchParams === 'tshirt' || searchParams === 't-shirt' || searchParams === 'tshirts') searchParams = 'shirt'

    if (searchParams === 'men' || searchParams === 'mens' || searchParams === "men's") {
        searchParams = 'male'
        console.log(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%' OR gender LIKE '%${searchParams}%' AND gender NOT LIKE '%female%';`)
        return pool.query(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%' OR gender LIKE '%${searchParams}%' AND gender NOT LIKE '%female%';`)
    } else if (searchParams === 'women' || searchParams === 'womens' || searchParams === "women's") {
        searchParams = 'female'
        console.log(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%' OR gender LIKE '%${searchParams}%' AND gender NOT LIKE '%male%';`)
        return pool.query(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%' OR gender LIKE '%${searchParams}%' AND gender NOT LIKE '%male%';`)
    } else {
        console.log(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%';`)
        return pool.query(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%';`)
    }
}

export {
    getAllProducts,
    getProductsByCategory,
    getProductsByColor,
    getProductsByCost,
    getProductsBySex,
    getBySearchParams
}