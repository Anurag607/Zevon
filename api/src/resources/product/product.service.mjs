import supabase from "../../utils/db.mjs"

const getAllProducts = async () => {
    console.log(`SELECT * FROM product;`);
    const { data, error } = await supabase
        .from('product')
        .select('*');

    if (error) throw error;
    return { data, error };
}

const getProductsByColor = async (color, len) => {
    console.log(`SELECT * FROM product WHERE color = ${color};`);
    const query = len === 1
        ? supabase.from('product').select('*').eq('color', color)
        : supabase.from('product').select('*').in('color', [color]);

    const { data, error } = await query;

    if (error) throw error;
    return { data, error };
}

const getProductsByCategory = async (category, len) => {
    console.log(`SELECT * FROM product WHERE product_type = ${category};`);
    const query = len === 1
        ? supabase.from('product').select('*').eq('product_type', category)
        : supabase.from('product').select('*').in('product_type', [category]);

    const { data, error } = await query;

    if (error) throw error;
    return { data, error };
}

const getProductsByCost = async (lowerCost, upperCost) => {
    console.log(`SELECT * FROM product WHERE cost >= (${lowerCost}) AND cost <= (${upperCost});`);
    const { data, error } = await supabase
        .from('product')
        .select('*')
        .gte('cost', lowerCost)
        .lte('cost', upperCost);

    if (error) throw error;
    return { data, error };
}

const getProductsBySex = async (gender, len) => {
    console.log(`SELECT * FROM product WHERE gender = ${gender};`);
    const query = len === 1
        ? supabase.from('product').select('*').eq('gender', gender)
        : supabase.from('product').select('*').in('gender', [gender]);

    const { data, error } = await query;

    if (error) throw error;
    return { data, error };
}

const getBySearchParams = async (searchParams) => {
    if (searchParams === 'pants' || searchParams === 'pant') searchParams = 'lowers';
    if (searchParams === 'tops' || searchParams === 'top' || searchParams === 'tshirt' || searchParams === 't-shirt' || searchParams === 'tshirts') searchParams = 'shirt';

    let query = supabase.from('product').select('*');

    if (searchParams === 'men' || searchParams === 'mens' || searchParams === "men's") {
        searchParams = 'male';
        console.log(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%' OR gender LIKE '%${searchParams}%' AND gender NOT LIKE '%female%';`);
        query = query
            .or(`product_type.ilike.%${searchParams}%,color.ilike.%${searchParams}%,description.ilike.%${searchParams}%,gender.ilike.%${searchParams}%`)
            .not('gender', 'ilike', '%female%');
    } else if (searchParams === 'women' || searchParams === 'womens' || searchParams === "women's") {
        searchParams = 'female';
        console.log(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%' OR gender LIKE '%${searchParams}%' AND gender NOT LIKE '%male%';`);
        query = query
            .or(`product_type.ilike.%${searchParams}%,color.ilike.%${searchParams}%,description.ilike.%${searchParams}%,gender.ilike.%${searchParams}%`)
            .not('gender', 'ilike', '%male%');
    } else {
        console.log(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%';`);
        query = query
            .or(`product_type.ilike.%${searchParams}%,color.ilike.%${searchParams}%,description.ilike.%${searchParams}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error };
}

// import pool from '../../utils/db.mjs'

// const getAllProducts = async () => {
//     console.log(`SELECT * FROM product;`)
//     return pool.query(`SELECT * FROM product;`)
// }
// const getProductsByColor = async (color, len) => {
//     if (len === 1) {
//         console.log(`SELECT * FROM product WHERE color = ${color};`)
//         return pool.query(`SELECT * FROM product WHERE color = ${color};`)
//     }
//     return pool.query(`SELECT * FROM product WHERE color IN (${color});`)
// }
// const getProductsByCategory = async (category, len) => {
//     if (len === 1) {
//         console.log(`SELECT * FROM product WHERE product_type = ${category};`)
//         return pool.query(`SELECT * FROM product WHERE product_type = ${category};`)
//     }
//     return pool.query(`SELECT * FROM product WHERE product_type IN (${category});`)
// }
// const getProductsByCost = async (lowerCost, upperCost) => {
//     console.log(pool.query(`SELECT * FROM product WHERE cost >= (${lowerCost}) AND cost <= (${upperCost});`))
//     return pool.query(`SELECT * FROM product WHERE cost >= (${lowerCost}) AND cost <= (${upperCost});`)
// }
// const getProductsBySex = async (gender, len) => {
//     if (len === 1) {
//         console.log(`SELECT * FROM product WHERE gender = ${gender};`)
//         return pool.query(`SELECT * FROM product WHERE gender = ${gender};`)
//     }
//     console.log(`SELECT * FROM product WHERE gender IN (${gender});`)
//     return pool.query(`SELECT * FROM product WHERE gender IN (${gender});`)
// }

// const getBySearchParams = async (searchParams) => {
//     if (searchParams === 'pants' || searchParams === 'pant') searchParams = 'lowers'
//     if (searchParams == 'tops' || searchParams === 'top' || searchParams === 'tshirt' || searchParams === 't-shirt' || searchParams === 'tshirts') searchParams = 'shirt'

//     if (searchParams === 'men' || searchParams === 'mens' || searchParams === "men's") {
//         searchParams = 'male'
//         console.log(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%' OR gender LIKE '%${searchParams}%' AND gender NOT LIKE '%female%';`)
//         return pool.query(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%' OR gender LIKE '%${searchParams}%' AND gender NOT LIKE '%female%';`)
//     } else if (searchParams === 'women' || searchParams === 'womens' || searchParams === "women's") {
//         searchParams = 'female'
//         console.log(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%' OR gender LIKE '%${searchParams}%' AND gender NOT LIKE '%male%';`)
//         return pool.query(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%' OR gender LIKE '%${searchParams}%' AND gender NOT LIKE '%male%';`)
//     } else {
//         console.log(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%';`)
//         return pool.query(`SELECT * FROM product WHERE product_type LIKE '%${searchParams}%' OR color LIKE '%${searchParams}%' OR description LIKE '%${searchParams}%';`)
//     }
// }

export {
    getAllProducts,
    getProductsByCategory,
    getProductsByColor,
    getProductsByCost,
    getProductsBySex,
    getBySearchParams
}