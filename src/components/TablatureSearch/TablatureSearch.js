import React, { Component } from 'react';
import Section from '../UI/Section';
import styles from './TablatureSearch.module.css';
import { connect } from 'react-redux';
import * as reducerTypes from '../../store/reducers/reducer';
import * as actionTypes from '../../store/actions/actionTypes';

const TAB_TYPES = ["Chords", "Bass", "Guitar", "Player"];
const SEARCHBY_SONG = 'song';
const SEARCHBY_ARTIST = 'artist';

class TablatureSearch extends Component {
    render() {
        const searchBy = this.props.searchBy;
        let inactivatedSearchByButton = [styles.SearchByButton, styles.SearchByButtonInactive].join(" ");
        let activatedSearchByButton = [styles.SearchByButton, styles.SearchByButtonActive].join(" ");
        let searchByButtons = (
            <div className={styles.SearchByButtonsContainer}>
                <button className={searchBy === SEARCHBY_ARTIST ? inactivatedSearchByButton : activatedSearchByButton}
                    onClick={() => this.props.onSearchByChanged(SEARCHBY_SONG)}>Search by song name</button>
                <button className={searchBy === SEARCHBY_ARTIST ? activatedSearchByButton : inactivatedSearchByButton}
                    onClick={() => this.props.onSearchByChanged(SEARCHBY_ARTIST)}>Search by artist</button>
            </div>
        )

        let radioButtons = [];

        TAB_TYPES.forEach(tabType => {
            radioButtons.push(
                <div className={styles.TabTypeRadioButtonWrapper}>
                    <label className={styles.TabTypeRadioButton}>
                        <input
                            type="radio"
                            value={tabType}
                            name="typeSelector"
                            className={styles.TabTypeRadioButtonSelector}
                            onChange={event => {
                                this.props.onTabTypeChanged(event.target.value);
                            }}
                        />
                        <div>{tabType}</div></label>
                </div>
            )
        })

        return (
            <div className={styles.Search}>
                {searchByButtons}
                <Section>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        this.props.onFormSubmitted(this.props.enteredTitle, this.props.enteredType);
                    }}>
                        <label
                            className={styles.SearchLabel}>
                            {searchBy === SEARCHBY_ARTIST ? "Please enter artist name:" : "Please enter song name:"}
                            <input
                                type="text"
                                className={styles.SearchInput}
                                onChange={event => {
                                    this.props.onEnteredTitle(event.target.value);
                                }} />
                        </label>
                        <span className={styles.TabTypeLabel}>Please choose tab type:</span>
                        <div className={styles.TabTypeRadioGroup}>
                            {radioButtons}
                        </div>
                        <button type="submit" className={styles.SubmitButton} disabled={!this.props.formIsValid}>
                            Submit
                        </button>
                    </form>
                </Section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        enteredTitle: state.enteredTitle,
        enteredType: state.enteredType,
        searchBy: state.searchBy,
        formIsValid: state.formIsValid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEnteredTitle: (text) => dispatch({ type: actionTypes.TYPE_TITLE, enteredTitle: text }),
        onTabTypeChanged: (type) => dispatch({ type: actionTypes.CHOOSE_TYPE, enteredType: type }),
        onSearchByChanged: (searchByType) => dispatch({ type: actionTypes.CHOOSE_SEARCHBY, searchBy: searchByType }),
        onFormSubmitted: (text, type) => dispatch(reducerTypes.loadTablatures(text, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablatureSearch);