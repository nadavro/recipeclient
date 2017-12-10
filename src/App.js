import React, { Component } from 'react';
import RecipeModal from './Components/RecipeModal/RecipeModal';
import ItemModal from './Components/ItemModal/ItemModal';
import RecipeList from './Components/RecipeList/RecipeList';
import RecipeButton from './Components/RecipeButton/RecipeButton';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';





class App extends Component {

constructor() {
    super();
    this.state = {
      itemModalIsOpen:false,
      modalIsOpen: false,
      recipes: [],
      recipe: {
        author: '',
        title:'',
        content: '',
        ingredients: '',
        _id: undefined
      }
    };
    this.apiUrl = 'https://wt-b15ab6f252cb9c97b0966e239994023a-0.run.webtask.io/recipewebtask/recipes'

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClickModal = this.handleClickModal.bind(this);
    this.openItemModal = this.openItemModal.bind(this);
    this.closeItemModal = this.closeItemModal.bind(this);

    
  }
  componentDidMount() {
    // Fetch recipes from API and
    // and update `recipes` state
    Axios.get(this.apiUrl).then(({data}) => {
      this.setState({recipes: data});
    })
  }
   handleClickModal(id) {
     // Open a modal to update a recipe
     this.openItemModal(this.state.recipes.find(x => x._id === id))
  }

   handleEdit(id) {
     // Open a modal to update a recipe
     this.openModal(this.state.recipes.find(x => x._id === id))
  }

  handleDelete(id) {
    // Delete recipe from API
    Axios.delete(`${this.apiUrl}?id=${id}`).then(() => {
      const updatedRecipes = this.state.recipes.findIndex(x => x._id === id);
      this.setState({states: [...this.state.recipes.splice(updatedRecipes, 1)]})
    })
  }
   openItemModal(recipe) {
    this.setState({itemModalIsOpen: true});
    if(recipe) {
      this.setState({recipe});
    } 
  }
  closeItemModal(model) {
    this.setState({itemModalIsOpen: false});
    this.setState({recipe: {
      author: '',
      title:'',
      content: '',
      ingredients: '',
      _id: undefined
    }})
  }
   openModal(recipe) {
    this.setState({modalIsOpen: true});
    if(recipe) {
      this.setState({recipe});
    } 
  }
  closeModal(model) {
    this.setState({modalIsOpen: false});
    this.setState({itemModalIsOpen: false});
    if(model) {
      if(!model._id) {
        Axios.post(this.apiUrl, model).then(({data}) => {
          this.setState({recipes: [data, ...this.state.recipes]});
          this.setState({isLoading: false})
        })
      } else {
        Axios.put(`${this.apiUrl}?id=${model._id}`, model).then(({data}) => {
          const recipeToUpdate = this.state.recipes.find(x => x._id === model._id);
          const updatedRecipe = Object.assign({}, recipeToUpdate, data)
          const newRecipes = this.state.recipes.map(recipe => {
            if(data._id === recipe._id) return updatedRecipe;
            return recipe;
          })
          this.setState({recipes: newRecipes});
        })
      }
    }
    this.setState({recipe: {
      author: '',
      title:'',
      content: '',
      ingredients: '',
      _id: undefined
    }})
  }
  render() {
    
    return (
      <div className="App">
        <div className="w">
       <div className="text-center fs-45">Want to be a Master Chef?</div>
       
       <h4 className="text-center">Feel free to add, edit or delete any recipe you want</h4>
       <h4 className="text-center">Enjoy!</h4>
       </div>
        <div className="col-md-4 col-md-offset-4 Story ">
        <div className="RecipeHeader">
            <h2>Recipes</h2>
          </div>
        <RecipeList recipes={this.state.recipes}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
              handleClick={this.handleClickModal}></RecipeList>
              <div className="RecipeFooter">
            <p>Thank you!</p>
          </div>
          </div>
          <ItemModal modalIsOpen={this.state.itemModalIsOpen}
            recipe={this.state.recipe}
            closeModal={this.closeItemModal}/>
            <RecipeModal
            modalIsOpen={this.state.modalIsOpen}
            recipe={this.state.recipe}
            closeModal={this.closeModal}
        />
        
        
        <RecipeButton handleClick={this.openModal.bind(this, null)} />
      
      </div>
    );
  }
}

export default App;
