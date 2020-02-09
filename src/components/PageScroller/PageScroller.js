import React from 'react';
import styles from './PageScroller.module.css';

const PageScroller = props => {

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className={styles.PageScroller} onClick={handleScroll}>
            Back To Top
        </div>
    )
}

export default PageScroller;