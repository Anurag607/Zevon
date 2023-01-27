import { NextApiRequest, NextApiResponse } from "next"
import nc from 'next-connect'
import { readFile } from 'fs/promises'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get('/api/images', async(req,res) => {
    let imgData:string = ''

    try {
        imgData = await readFile(new URL('/src/data/images.json', import.meta.url), 'utf-8')
    } catch(err) {
        console.error(err.message)
        res.status(201)
    }

    let images = JSON.parse(imgData)
    let data = []
    if(req.headers.type === 'shopping') {
        if(images.hasOwnProperty("shopping1")) data.push(images.shopping1)
        if(images.hasOwnProperty("shopping2")) data.push(images.shopping2)
    } else if(req.headers.type === 'blog') {
        if(images.hasOwnProperty("blog")) data.push(images.blog)
    } else if(req.headers.type === 'category') {
        if(images.hasOwnProperty("category")) data.push(images.category)
    }
    res.status(200).send(data)
})

export default handler