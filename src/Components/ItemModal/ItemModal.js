import React from 'react';
import Modal from 'react-modal';

import './ItemModal.css'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class ItemModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      author: '',
      title:'',
      ingredients:'',
      content: '',
      _id: ''
    }
  }


  componentWillReceiveProps({recipe}) {
    this.setState(recipe)
  }

  render() {
    const {
        modalIsOpen,
        closeModal
    } = this.props;
    // Use React's Modal component
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal.bind(this, null)}
            style={customStyles}
            shouldCloseOnOverlayClick={false}
            contentLabel="Item Modal"
        >

          <div className="Modal">
            <h4 className="text-center">Recipe</h4>
            <div className="col-md-6 col-md-offset-3">
              <form>
                <div className="form-group">
                  <label>Name: </label>
                  <span>{this.state.author}</span>
                </div>
                <div className="form-group">
                  <label>Title: </label>
                  <span>{this.state.title}</span>
                </div>
                <div className="form-group">
                  <label>Ingredients: </label>
                  <span>{this.state.ingredients}</span>
                </div>
                <div className="form-group">
                  <label>Content: </label>
                  <span>{this.state.content}</span>
                </div>
                <div className="form-group">
                  <button
                      className="ModalButton ModalButton--close"
                      onClick={closeModal.bind(this, null)}
                  >Close</button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
    )
  }
}