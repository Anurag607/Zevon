import React from 'react'
import styles from '../../src/styles/preloader.module.scss'

export default function Preloader() {

    /* eslint-disable */
    return (
        <div id="preloader" className={styles["preloader"]} style={{background: "#010125 url('/preloader.gif') no-repeat center center"}}>
            <div className={styles["z"]}>
                <img src="/z.jpg" alt="z" />
            </div>
        </div>
    )
    /* eslint-enable */
}