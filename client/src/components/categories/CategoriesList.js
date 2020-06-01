import React from 'react'
import {connect} from 'react-redux'


function CategoriesList(props) {
    return (
        <div className="container">
            <h2>Listing Categories</h2>
            <ul className="list-group">
                {
                    props.categories.map(category => {
                        return <li className="list-group-item" key={category._id}>{category.name}</li>
                    })
                }
            </ul>
            <button className="btn btn-primary" onClick={()=>{props.history.push('/categories/new')}}>Add category</button>
        </div>
    )
}

const mapStateToProps=(state) => {
    return {
        categories : state.categories
    }
}

export default connect(mapStateToProps)(CategoriesList)