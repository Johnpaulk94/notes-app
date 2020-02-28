const initialCategoriesList = []

const categoriesReducer = (state = initialCategoriesList, action) => {
    switch(action.type) {
        case 'SET_CATEGORY' : {
            return [...action.payload]
        }
        case 'ADD_CATEGORY' : {
            return [...state,action.payload]
        }
        default : {
            return [...state]
        }
    }
}

export default categoriesReducer