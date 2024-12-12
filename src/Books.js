import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Book from './Book.js';
import {axiosNode} from './lib';
import SearchBox from "./SearchBox";

export default function Books() {

    const [allBooks, setAllBooks] = useState([]);
    function parseBookData(input) {
        let items = input.items;
        let result = [];
        let ctr = 0;
        for (let i in items) {
            let info = items[i].volumeInfo;
            if (info.industryIdentifiers && info.industryIdentifiers[0] && info.industryIdentifiers[0].identifier) {
                let book = {};
                book.id = ctr++;
                book.title = info.title ? info.title : "";
                book.author = info.authors ? info.authors[0] : "";
                book.img_url = info.imageLinks && info.imageLinks.thumbnail ? info.imageLinks.thumbnail : "";
                book.isbn = info.industryIdentifiers[0].identifier;
                result.push(book);
            }
            else {
                continue
            }
        }
        return result;
    }


    const fetchAllBooks = async (searchTerm) => {
        try {
            const response = await axiosNode.get('/googlebooks', {
                params: {
                    searchTerm: searchTerm
                }
            });
            setAllBooks(parseBookData(response.data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchAllBooks('new york times bestsellers');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className="pt-3">
            <SearchBox fetchAllbooks={fetchAllBooks} />
            <Row>
                {allBooks.map((book, index) => (
                    <Book title={book.title} author={book.author} isbn={book.isbn} img_url={book.img_url} key={index}
                          id={book.id}/>
                ))}
            </Row>
        </Container>
    );
}








