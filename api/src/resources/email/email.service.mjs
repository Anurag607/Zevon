// import axios from 'axios'
// import cheerio from 'cheerio'
// import parse from 'node-html-parser'
// import puppeteer from 'puppeteer'

// async function configureTheBrowser(url) {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.goto(url, { waitUntil: "load", timeout: 0 })
//     return page
// }

// async function checkDetails(page) {
//     let html = await page.evaluate(() => {
//       return {
//         content: document.querySelector(".cartContent")
//       }
//     })
//     return html
// }

// const scrape = async (url) => { 
//     let page = await configureTheBrowser(url)
//     let results = await checkDetails(page)

//     console.log(parse(results))

//     return parse(results)
// }

// scrape('http://localhost:3000/cart')

// let scrape = async (url) => {
//   let response = await axios.get(url)
//     .then(response => {
//       let $ = cheerio.load(response.data)
//       let content = []

//       content.push($('.cartContent'))
//       console.log($('.cartContent'))
//     })
//     .catch(error => {
//       console.log(error)
//     })

//     console.log(response)
//   let res = parse(response.data);
//   console.log(res)
// }

// scrape(
//   "http://localhost:3000/cart"
// )