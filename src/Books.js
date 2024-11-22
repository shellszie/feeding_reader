import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookViewer from './BookViewer.js';

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
      book.author = info.authors ? info.authors[0] : "";
      book.image_url = info.imageLinks && info.imageLinks.thumbnail ? info.imageLinks.thumbnail : "";
      book.isbn = info.industryIdentifiers[0].identifier;
      result.push(book);
    }
    return result;
  }

  async function fetchBooks() {
    try {
      await axios.get('http://localhost:5000/googlebooks', {
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

  useEffect(() => {    
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Container>
      <Row>
      {books.map((book) => (
        <Col key={book.id}>
          <img alt={book.title} src={book.image_url} /> <br/>
          <span>{book.title} by {book.author}</span>
          <BookViewer isbn={book.isbn} id={book.id} />
        </Col>
      ))}
      </Row>
    </Container>
  );
}








