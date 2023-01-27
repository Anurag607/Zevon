import { NextApiRequest, NextApiResponse } from "next"
import nc from 'next-connect'
import data from '../../../../src/data/data.json'
import { readFile, writeFile } from 'fs/promises'

// const handler = nc<NextApiRequest, NextApiResponse>({
//     onError(error, req, res) {
//         res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
//       },
//       onNoMatch(req, res) {
//         res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
//       },
// })

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get('/api/users/signup', async(req,res) => {
    console.log("Running")
    res.status(200).json("HELLO!")
})

handler.post('/api/users/signup', async(req, res) => {
    let userData:string = '';
    try {
        userData = await readFile(new URL('/src/data/data.json', import.meta.url), 'utf-8')
    } catch(err) {
        console.error(err.message)
        res.status(202).send({message : 'Error while signing in (R).'})
    }

    let users = JSON.parse(userData)
    if(users.hasOwnProperty(req.body.username)) {
        res.status(201).send({message : "Username Alreadt Exists"})
    } else {
        users[req.body.username] = req.body.password
        try {
            await writeFile(new URL('/src/data/data.json', import.meta.url), JSON.stringify(users))
            let userDetails = [{
                name: `${req.body.username}`
            }]
            res.status(200).send(userDetails)
        } catch(err) {
            console.error(err.message)
            res.status(202).send({message : 'Error while signing in (W).'})
        }
    }
})

export default handler