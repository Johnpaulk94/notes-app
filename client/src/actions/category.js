import axios from 'axios'

export const setCategories =(categories) => {
    return {
        type: 'SET_CATEGORY',
        payload: categories
    }
}

export const startSetCategories=() => {
    return(
        dispatch => {
            axios.get('http://localhost:3015/categories',{
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
            .then(response => {
                const categories = response.data
                dispatch(setCategories(categories))
            })
        }
    )
}


export const addCategory =(category) => {
    return {
        type: 'ADD_CATEGORY',
        payload: category
    }
}



export const startaddCategory=(formData) => {
    return (
        dispatch => {
            axios.post('http://localhost:3015/categories',{
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
            .then(response => {
                const category = response.data
                dispatch(addCategory(category))
            })
        }
    )
}   