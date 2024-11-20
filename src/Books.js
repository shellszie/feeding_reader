import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Books() {

  const [books, setBooks] = useState([]);
  const [data, setData] = useState([]);

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
      const res = await axios.get('http://localhost:5000/googlebooks', {
        params: {
          searchTerm: 'cats'
        }
      })
      .then(response => {

        let parsedBooks = parseBookData(response.data);
        setBooks(parsedBooks);
        console.log(response.data)
      })
      } catch (error) {
      console.error(error.message);
    }
  }

  // async function fetchAPI() {
  //     await axios.get('http://localhost:5000/api?name=michelle&animal=cat')
  //     .then((response) => {
        
  //       console.log(response);
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }
  
  useEffect(() => {    
    fetchBooks(); 
    // fetchAPI();
  }, []);


  return (
    <>
      <h1>Book Area:</h1>

      <div class="container">
        <div class="row">
        {books.map((book) => (
          <div class="col-sm">
            <img src={book.image_url} /> <br/>
            <span>{book.title} by {book.author}</span>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}








