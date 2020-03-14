const initialNotesState = []

const notesReducer = (state = initialNotesState, action) => {
    switch(action.type) {
        case 'SET_NOTES' : {
            console.log('notes added to store')
            return [...action.payload]
        }
        case 'ADD_NOTE' : {
            return [...state,action.payload]
        }
        case 'EDIT_NOTE' : {
            return state.map(note => {
                if(note._id === action.payload._id) {
                    return action.payload
                } else {
                    return note
                }
            })
        }
        case 'DELETE_NOTE' : {
            return state.filter(note => note._id !== action.payload._id)
        }
        default : {
            return [...state]
        }
    }
}

export default notesReducer