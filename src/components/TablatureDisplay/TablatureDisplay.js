import React, { Component } from 'react';
import { connect } from 'react-redux';
import Section from '../UI/Section';
import styles from './TablatureDisplay.module.css';

class TablatureDisplay extends Component {
    render() {
        let tablaturesToDisplay = [];
        this.props.loadedSongs.forEach(tablature => {
            tablaturesToDisplay.push(
                <div className={styles.TablatureElement}>
                    <h1>{tablature.name}</h1>
                    <span className={styles.TablatureSongTitle}>{tablature.title}</span>
                    <br />
                    Available tablature types:
                    <span className={styles.TablatureSongType}>{tablature.tabTypes}</span>
                </div>
            )
        })

        let loadedContent = (
            <div>
                <h1>Tablatures</h1>
                <Section>
                    {tablaturesToDisplay}
                </Section>
            </div>
        );
        return (
            <div className={styles.Tablatures}>
                {!this.props.userDidAction ? null :
                    tablaturesToDisplay.length > 0 ? loadedContent : "No results found"}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loadedSongs: state.loadedSongs,
        userDidAction: state.userDidAction
    }
}

export default connect(mapStateToProps, null)(TablatureDisplay);