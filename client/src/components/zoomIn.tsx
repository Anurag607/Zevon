import React from "react"
import styles from '../../src/styles/zoomIn.module.scss'

const ZoomIn = (props: {img_src: string}) => {
    return (
        <div className={`${styles.zoomInWrapper} ${styles.itemImgl} zoomInWrapper`}>
            <div className={`${styles.imageCont} image-container`} id="image-container" style={{backgroundImage: `url('${props.img_src}')`}} />
            <div className={`${styles.mouseOverlay} mouse-overlay`} />
            <div className={`${styles.overlay} overlay`} style={{backgroundImage: `url('${props.img_src}')`}} />
        </div>
    )
}

export default ZoomIn