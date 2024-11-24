import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Book from './Book.js';
import {baseUrl} from './lib';

export default function Books() {

    const [allBooks, setAllBooks] = useState([]);
    function parseBookData(input) {
        let items = input.items;
        let result = [];
        let ctr = 0;
        for (let i in items) {
            let info = items[i].volumeInfo;
            let isbn = info.industryIdentifiers[0].identifier;
            let book = {};
            book.id = ctr++;
            book.title = info.title ? info.title : "";
            book.author = info.authors ? info.authors[0] : "";
            book.img_url = info.imageLinks && info.imageLinks.thumbnail ? info.imageLinks.thumbnail : "";
            book.isbn = isbn;
            result.push(book);
        }
        return result;
    }

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await axios.get(baseUrl() + '/googlebooks', {
                    params: {
                        searchTerm: 'new york times bestsellers'
                    }
                });
                setAllBooks(parseBookData(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchAllBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Container className="pt-3">
            <Row>
                {allBooks.map((book, index) => (
                    <Book title={book.title} author={book.author} isbn={book.isbn} img_url={book.img_url} key={index}
                          id={book.id}/>
                ))}
            </Row>
        </Container>
    );
}








