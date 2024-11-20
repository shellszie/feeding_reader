import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Books() {

  const [books, setBooks] = useState([]);

  function parseBookData(input) {
    //title, author, cover image
    let items = input.items;
    let result = [];
    let ctr = 0;
    for (let i in items) {
      let info = items[i].volumeInfo;
      let book = {};
      
      book.id = ctr++;
      book.title = info.title ? info.title : ""; 
      book.author = info.authors ? info.authors[0] : ""
      book.image_url = info.imageLinks && info.imageLinks.thumbnail ? info.imageLinks.thumbnail : ""
      result.push(book);
    }
    return result;

  }

  async function fetchBooks() {
    try {
      const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers')
      .then(response => {
        let parsedBooks = parseBookData(response.data);
        setBooks(parsedBooks);
        debugger
        console.log(response.data)
      })
      } catch (error) {
        console.error(error.message);
      }
  }
  
  useEffect(() => {    
    fetchBooks(); 
  }, []);


  return (
    <>
      <h1>Book Area:</h1>

      <ul>
        {books.map((book) => (
          <li>
            <img src={book.image_url} /> <br/>
            <>{book.title} by {book.author}</>
          </li>
        ))}
      </ul>

      
      
    </>
  );
}








