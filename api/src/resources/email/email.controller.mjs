import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
import envPath from '../../../env_path.mjs'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import DOMParser from 'dom-parser'
import hbs from 'nodemailer-express-handlebars'

dotenv.config({path: envPath})

const confirmation = (req,res) => {

  let template = ''
  let userDetails = JSON.parse(req.body.user)
  
  const contentData = new DOMParser().parseFromString(req.body.content, "text/xml")
  
  const data = {
    content: contentData.rawHTML
  }
  
  const readWrite = async () => {
    try {
      template = await readFile(new URL('views/template.html', import.meta.url), 'utf-8')
      template = template.replace(/{{content}}/g, data.content)
      await writeFile(new URL('views/index.html', import.meta.url), template)
      await writeFile(new URL('views/index.handlebars', import.meta.url), template)
    } catch (e) {
      console.log(e.message)
      console.log("Oops!")
    }
  }

  readWrite()

  let html = ''
  const read = async () => {
    try {
      html = await readFile(new URL('views/index.html', import.meta.url), 'utf-8')
      console.log("HTML:" + html)

      const __filename = fileURLToPath(import.meta.url)
      const __dirname = path.dirname(__filename)

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS
        },
        secure: true,
        port: 587,
        host: "smtp.google.com"
      })

      let handlebarOptions = {
        viewEngine: {
          extName: '.handlebars',
          partialsDir: path.resolve(__dirname, './views'),
          defaultLayout: false,
        },
        viewPath: path.resolve(__dirname, './views'),
        extName: '.handlebars',
      }

      transporter.use('compile', hbs(handlebarOptions))
        
      let mailOptions = {
        from: process.env.EMAIL,
        to: `${userDetails.email}`,
        subject: 'Your Zevon order details',
        template: 'index'
      }
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
      
    } catch (e) {
      console.log(e.message)
      console.log("Oops!")
    }
  }

  read()

  res.status(200).end()
}

const subscription = (req,res) => {

  let userDetails = req.body
  
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS
      },
      secure: true,
      port: 587,
      host: "smtp.google.com"
  });
    
  let mailOptions = {
    from: process.env.EMAIL,
    to: `${userDetails.email}`,
    subject: 'Your Zevon order details',
    text: 'Thank You for Shopping for with us!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(200).end()
}


export { confirmation, subscription }