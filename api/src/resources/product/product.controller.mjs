import * as dotenv from 'dotenv'
import envPath from '../../../env_path.mjs'
import * as service from './product.service.mjs'

dotenv.config({ path: envPath })

const ItemFilter = (result, products) => {
    const productIds = new Set(products.map(product => product.product_id));
    return result.filter(el => productIds.has(el.product_id));
};

const getFilteredProduct = async (req, res) => {
    try {
        let data = req.body.data || req.body;
        if (!data) {
            const placeholder = ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'];
            return res.status(200).json(placeholder);
        }

        const { color, category, gender, cost } = data;
        let result = [];

        if (req.body.search === undefined || (data.color[0] !== req.body.search && (data.color.length > 0 || data.category.length > 0 || data.gender.length > 0 || data.cost.length > 0))) {
            if (category.length > 0) {
                const { data: catProducts, error: catError } = await service.getProductsByCategory(category, category.length);
                if (catError) throw catError;
                result = result.length > 0 ? ItemFilter(result, catProducts) : catProducts;
            }

            if (color.length > 0) {
                const { data: colorProducts, error: colorError } = await service.getProductsByColor(color, color.length);
                if (colorError) throw colorError;
                result = result.length > 0 ? ItemFilter(result, colorProducts) : colorProducts;
            }

            if (cost.length > 0) {
                const { data: costProducts, error: costError } = await service.getProductsByCost(cost[0], cost[1]);
                if (costError) throw costError;
                result = result.length > 0 ? ItemFilter(result, costProducts) : costProducts;
            }

            if (gender.length > 0) {
                const { data: genderProducts, error: genderError } = await service.getProductsBySex(gender, gender.length);
                if (genderError) throw genderError;
                result = result.length > 0 ? ItemFilter(result, genderProducts) : genderProducts;
            }

            if (result.length === 0) {
                const { data: allProducts, error: allError } = await service.getAllProducts();
                if (allError) throw allError;
                result = allProducts;
            }
        } else {
            console.log('searching...');
            const params = req.body.search.split(' ');
            for (let param of params) {
                const { data: searchProducts, error: searchError } = await service.getBySearchParams(param.toLowerCase());
                if (searchError) throw searchError;
                result = result.length > 0 ? ItemFilter(result, searchProducts) : searchProducts;
            }
        }

        res.status(200).json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching filtered products.' });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const { data: products, error } = await service.getAllProducts();
        if (error) throw error;
        console.log(products)
        res.status(200).json(products);
    } catch (err) {
        console.error("$: " + err.message);
        res.status(500).json({ error: 'An error occurred while fetching all products.' });
    }
};

export { getFilteredProduct, getAllProducts }

// const ItemFilter = (result, products) => {
//     let temp = []
//     result.forEach(el => {
//         let flag = false
//         for (let item of products) {
//             flag = (el.product_id === item.product_id) ? true : false
//             if (flag) {
//                 temp.push(el)
//                 break
//             }
//         }
//     })

//     return temp
// }

// const getFilteredProduct = async (req, res) => {
//     try {
//         let data = req.body.data
//         if (typeof data === 'undefined') data = req.body
//         if (typeof data === 'undefined') {
//             let placeholder = ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16']
//             res.status(200).json(JSON.parse(JSON.stringify(placeholder)))
//             return;
//         }
//         const { color, category, gender, cost } = data
//         let result = []

//         if (typeof req.body.search === 'undefined' || (typeof data !== 'undefined' && data.color[0] !== req.body.search && (data.color.length > 0 || data.category.length > 0 || data.gender.length > 0 || data.cost.length > 0))) {
//             if (category.length > 0) {
//                 let categories = ''
//                 let catLen = category.length
//                 for (let i = 0; i < catLen; ++i) {
//                     if (i !== catLen - 1) categories += `'${category[i]}',`
//                     else categories += `'${category[i]}'`
//                 }
//                 let response = await service.getProductsByCategory(categories, catLen)
//                 const products = response.rows
//                 if (result.length > 0) result = ItemFilter(result, products)
//                 else result.push(...products)
//             }
//             if (color.length > 0) {
//                 let colors = ''
//                 let colorLen = color.length
//                 for (let i = 0; i < colorLen; ++i) {
//                     if (i !== colorLen - 1) colors += `'${color[i]}',`
//                     else colors += `'${color[i]}'`
//                 }
//                 let response = await service.getProductsByColor(colors, colorLen)
//                 const products = response.rows
//                 if (result.length > 0) result = ItemFilter(result, products)
//                 else result.push(...products)
//             }
//             if (cost.length > 0) {
//                 let lowerCost = cost[0]
//                 let upperCost = cost[1]
//                 let response = await service.getProductsByCost(lowerCost, upperCost)
//                 const products = response.rows
//                 if (result.length > 0) result = ItemFilter(result, products)
//                 else result.push(...products)
//             }
//             if (gender.length > 0) {
//                 let genderStr = ''
//                 let genderLen = gender.length
//                 for (let i = 0; i < genderLen; ++i) {
//                     if (i !== genderLen - 1) genderStr += `'${gender[i]}',`
//                     else genderStr += `'${gender[i]}'`
//                 }
//                 let response = await service.getProductsBySex(genderStr, genderLen)
//                 const products = response.rows
//                 if (result.length > 0) result = ItemFilter(result, products)
//                 else result.push(...products)
//             }
//             if (result.length === 0) {
//                 let response = await service.getAllProducts()
//                 const products = response.rows
//                 result.push(...products)
//             }
//         } else {
//             console.log('searching...')
//             let params = req.body.search.split(' ')
//             for (let i = 0; i < params.length; i++) {
//                 let response = await service.getBySearchParams(params[i].toLowerCase())
//                 const products = response.rows
//                 if (result.length > 0) result = ItemFilter(result, products)
//                 else result.push(...products)
//             }
//         }
//         res.status(200).json(JSON.parse(JSON.stringify(result)))

//     } catch (err) {
//         console.error(err)
//     }
// }

// const getAllProducts = async (req, res) => {
//     try {
//         let response = await service.getAllProducts()
//         const products = response.rows
//         res.status(200).json(JSON.parse(JSON.stringify(products)))
//     } catch (err) {
//         console.error("$: " + err.message)
//     }
// }

// export { getFilteredProduct, getAllProducts }