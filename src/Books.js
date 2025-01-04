import React from 'react';
import {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Book from './Book.js';
import {axiosNode} from './lib';
import SearchBox from "./SearchBox";
import Logout from "./Logout";
import {Link} from "react-router";

export default function Books() {

    const [allBooks, setAllBooks] = useState([]);
    function parseBookData(input) {
        let items = input.items;
        let result = [];
        let ctr = 0;
        for (let i in items) {
            let info = items[i].volumeInfo;
            if (info.industryIdentifiers && info.industryIdentifiers[0] && info.industryIdentifiers[0].identifier &&
            info.imageLinks && info.imageLinks.thumbnail && info.title && info.authors && info.authors[0]) {
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
        fetchAllBooks('best sellers');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <SearchBox fetchAllbooks={fetchAllBooks}/>

            <Row className="center-text">
                {allBooks.map((book, index) => (
                    <Book title={book.title} author={book.author} isbn={book.isbn} img_url={book.img_url} key={index}
                          id={book.id} isSaved={false} />
                ))}
            </Row>
        </>
    );
}








