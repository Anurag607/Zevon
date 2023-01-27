import React, { useCallback } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import styles from './login.module.scss'
import Cookie from 'js-cookie'

interface LoginForm extends HTMLFormControlsCollection {
    email : HTMLInputElement,
    password : HTMLInputElement
}

interface LoginFormEl extends HTMLFormElement {
    readonly elements : LoginForm
}

type template = { email : string, password : string }

export default function Login() {

    const router = useRouter()

    const styling = {
        email: React.useRef<HTMLInputElement>(null),
        pass: React.useRef<HTMLInputElement>(null),
        warning: React.useRef<HTMLInputElement>(null),
        toSignup: React.useRef<HTMLInputElement>(null)
    }

    const [logindet, Setlogindet] = React.useState<template>({
        email : '',
        password : ''
    })

    const HandleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        let target = e.currentTarget
        switch(target.name) {
            case 'email' : {
                Setlogindet({
                    ...logindet,
                    email : target.value
                })
                break
            }
            case 'password' : {
                Setlogindet({
                    ...logindet,
                    password : target.value
                })
                break
            }
            default : {
                Setlogindet({
                    ...logindet,
                })
                break
            }
        }
    }

    const HandleSubmit = useCallback((e : React.FormEvent<LoginFormEl>) => {
        e.preventDefault();
        let status = 400
        fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_SERVER}/api/user/login`, {
            method : 'POST',
            mode : 'cors',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(logindet),
        })
        .then((response)=> {
            status = response.status
            return response.json()
        })
        .then(resMessage => {
            if(status !== 200) {
                styling.warning.current!.style.display = 'block'
                styling.email.current!.style.border = '0.05rem solid red'
                styling.pass.current!.style.border = '0.05rem solid red'
                styling.toSignup.current!.style.marginTop = '0.75rem'
            } else {
                Cookie.set("currentLoggedIn", JSON.stringify(resMessage[0]), {expires: 0.125})
                styling.warning.current!.style.display = 'none'
                styling.email.current!.style.border = 'transparent'
                styling.pass.current!.style.border = 'transparent'
                styling.toSignup.current!.style.marginTop = '2.5rem'
                router.push(`/home`, '/home', {shallow: true})
                // router.back()

            }
        })
    },[logindet])

    React.useEffect(() => {
        router.prefetch('/home')
    },[])

    return (
        <main className={styles.loginWrapper}>
            <Head>
                <link rel = "icon" href = "/z.png" type = "image/x-icon" />
                <meta charSet="UTF-8" />
                <meta name="description" content="E-commerce Web App" />
                <meta name="keywords" content="Fashion, Commerce, Clothing" />
                <meta name="author" content="Deep" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
                <title>Zevon</title>
            </Head>
            <div>
                <form onSubmit={HandleSubmit}>
                    <h2>Login</h2>
                    <span className={styles.warning} ref={styling.warning}>Invalid Username or Password</span>
                    <span>
                        <label htmlFor='email'>
                            Email: 
                            <span className={styles.loginemail}>
                                <span />
                                <input value={logindet.email} onChange={HandleChange} name='email' ref={styling.email} id='email' type="email" placeholder='Enter your Email'/>
                            </span>
                        </label>
                    </span>
                    <span>
                        <label htmlFor='password'>
                            Password: 
                            <span className={styles.loginpass}>
                                <span />
                                <input name='password' ref={styling.pass} id='password' value={logindet.password} onChange={HandleChange} type="password" placeholder='Enter your Password' />
                            </span>
                            {/* <span>
                                Forgot your Password?
                                <Link href='/passReset' passHref><a className={styles.loginLinks}>Reset Here</a></Link>
                            </span> */}
                        </label>
                    </span>
                    <input type='submit' placeholder='Login' value='Login' name='submit' className={styles.loginSubmit} />
                    {/* <section>
                        <p>Or Sign Up using </p>
                        <div>
                            <a href="#" />
                            <a href="#" />
                            <a href="#" />
                        </div>
                    </section> */}
                    <span className={styles.toSignup} ref={styling.toSignup}>
                        Dont have an account?
                        <Link href='/signup' as='/signup' passHref><a className={styles.loginLinks}>Sign Up</a></Link>
                    </span>
                </form>
            </div>
        </main>
    )
}
