import React from 'react'
import './RecipeItem.css'

export default class RecipeItem extends React.Component {
  render() {
    const {
      recipe,
      handleEdit,
      handleDelete,
      handleClick
    } = this.props;
    return (
        <div className="RecipeItem clearfix" onClick={handleClick.bind(this, recipe._id)}>
          <div className="col-sm-9 RecipeItem__content">
            <h4>{recipe.title}</h4>
            <p>{recipe.author}</p>
            
          </div>
          <div className="col-sm-3 RecipeItem__control">

            <span
                className="glyphicon glyphicon-edit"
                onClick={handleEdit.bind(this, recipe._id)}>
            </span>
           
            <span
                className="glyphicon glyphicon-remove"
                onClick={handleDelete.bind(this, recipe._id)}>
            </span>
          </div>
        </div>
    )
  }
}