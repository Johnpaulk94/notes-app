import React from 'react'
import axios from 'axios'

class CategoriesList extends React.Component {
    constructor() {
        super()
        this.state = {
            categories: []
        }
    }

    render() {
        return (
            <div>
                    <h2> Listing Categories </h2>
                    <ul>
                        {
                            this.state.categories.map(category => {
                                return <li key={category._id}>{category.name}</li>
                            })
                        }
                    </ul>
            </div>
        )
    }
}

export default CategoriesList