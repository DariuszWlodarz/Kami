import React from 'react'

const BooksList = (props) => {
  return (
    <div>
      {props.list.map((book, index) => {
        return <div key={index}>
          <p>{book.title}</p>
          <p>{book.author}</p>
          <p>{book.owner}</p>
          <hr/>
        </div>

      })}
    </div>
  )
}

export default BooksList
