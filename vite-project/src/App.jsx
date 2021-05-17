import React from 'react'
import './App.css'
import BooksList from './BooksList/BooksList'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      title: '',
      author: '',
      owner: '',
      booksList: []
    }
  }

  componentDidMount() {
    const existingBooksList = JSON.parse(localStorage.getItem('booksList'))
      if(existingBooksList) {
        this.setState({booksList: existingBooksList})
      }

  }


  handleChange = (e, propToChange) => {
    const obj = {}
    obj[propToChange] = e.target.value
    this.setState(obj)
  }

  addToList = () => {
    const titleInputValue = this.state.title
    const authorInputValue = this.state.author
    const ownerInputValue = this.state.owner

    const bookToAdd = {
      title: titleInputValue,
      author: authorInputValue,
      owner: ownerInputValue
    }

    const newBookList = [bookToAdd, ...this.state.booksList]

    localStorage.setItem('booksList', JSON.stringify(newBookList))
    this.setState({
      booksList: newBookList,
      title: '',
      author: '',
      owner: ''
    })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={(event) => event.preventDefault()}>
        <input type="text"
               name="title"
               value={this.state.title}
               onChange={
                 (e) => this.handleChange(e, 'title')
               }/>
        <input type="text"
               name="author"
               value={this.state.author}
               onChange={(e) => this.handleChange(e, 'author')}/>
        <select name="owner"
                value={this.state.owner}
                onChange={(e) => this.handleChange(e, 'owner')}
        >
          <option value=""/>
          <option value="Kami">Kamila</option>
          <option value="Dariusz">Dariusz Wladca</option>
        </select>
          <button type={'submit'} onClick={this.addToList}>add</button>
        </form>
<br/>
        <BooksList list={this.state.booksList}/>
      </div>
    )
  }
}

export default App
