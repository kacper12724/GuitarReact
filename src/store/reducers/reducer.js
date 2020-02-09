import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

const SEARCH_BY_ARTIST_URL_PREFIX = 'https://www.songsterr.com/a/ra/songs/byartists.json?artists=';
const SEARCH_BY_SONG_NAME_URL_PREFIX = 'http://www.songsterr.com/a/ra/songs.json?pattern=';

const SEARCHBY_SONG = 'song';

const initialState = {
    enteredTitle: '',
    enteredType: '',
    searchBy: SEARCHBY_SONG,
    formIsValid: false,
    userDidAction: false,
    loadedSongs: []
}

const loadTablaturesSync = (loadedTablatures) => {
    return {
        type: actionTypes.FETCH_TABLATURES, loadedSongs: loadedTablatures
    };
}

const insertTablatureToDisplay = (loadedTablatures, element) => {
    loadedTablatures.push({
        title: element.title,
        name: element.artist.name,
        tabTypes: element.tabTypes.join(", ")
    });
}

const handleData = (fetchedTablatures, loadedTablatures, enteredText, enteredType, getState) => {
    if (getState().searchBy === SEARCHBY_SONG) {
        fetchedTablatures.map(el => {
            if (el.tabTypes.includes(enteredType) || enteredType === '')
                if (el.title.includes(enteredText))
                    insertTablatureToDisplay(loadedTablatures, el);
        })
    } else {
        fetchedTablatures.map(el => {
            if (el.tabTypes.includes(enteredType) || enteredType === '')
                insertTablatureToDisplay(loadedTablatures, el);
        })
    }
}

export const loadTablatures = (enteredText, enteredType) => {
    return (dispatch, getState) => {
        const URL = getState().searchBy === SEARCHBY_SONG ? SEARCH_BY_SONG_NAME_URL_PREFIX : SEARCH_BY_ARTIST_URL_PREFIX;
        axios.get(URL + enteredText)
            .then(res => {
                const fetchedTablatures = res.data;
                const loadedTablatures = [];
                handleData(fetchedTablatures, loadedTablatures, enteredText, enteredType, getState);
                dispatch(loadTablaturesSync(loadedTablatures));
            })
    }
}

const correctTabNaming = (tabType) => {
    switch (tabType) {
        case "Chords":
            return "CHORDS";
        case "Bass":
            return "TEXT_BASS_TAB";
        case "Guitar":
            return "TEXT_GUITAR_TAB";
        case "Player":
            return "PLAYER";
        default: return "";
    }
}

const fetchTablatures = (state, loadedSongs) => {
    return {
        ...state,
        loadedSongs: loadedSongs,
        userDidAction: true
    }
}

const typeInTitle = (state, enteredTitle) => {
    let formIsValid = false;
    if (enteredTitle.length > 0)
        formIsValid = true;
    return {
        ...state,
        formIsValid: formIsValid,
        enteredTitle: enteredTitle
    }
}

const chooseTablatureType = (state, enteredType) => {
    return {
        ...state,
        enteredType: correctTabNaming(enteredType)
    }
}

const chooseSearchBy = (state, searchBy) => {
    return {
        ...state,
        searchBy: searchBy
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TABLATURES:
            return fetchTablatures(state, action.loadedSongs)
        case actionTypes.TYPE_TITLE:
            return typeInTitle(state, action.enteredTitle)
        case actionTypes.CHOOSE_TYPE:
            return chooseTablatureType(state, action.enteredType)
        case actionTypes.CHOOSE_SEARCHBY:
            return chooseSearchBy(state, action.searchBy)
        default: break;
    }
    return state;
}
export default reducer;