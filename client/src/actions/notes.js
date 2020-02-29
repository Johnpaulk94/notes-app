import axios from 'axios'

export const setNotes = (notes) => {
    return {
        type: 'SET_NOTES',
        payload: notes
    }
}

export const addNotes =(note) => {
    return {
        type: 'ADD_NOTE',
        payload: note
    }
}

