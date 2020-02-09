import React from 'react';
import styles from './Section.module.css';

const Section = props => {
    return (
        <section>
            <div className={styles.Section}>
                {props.children}
            </div>
        </section>
    )
}

export default Section;