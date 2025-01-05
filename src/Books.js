import React from 'react';
import {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Book from './Book.js';
import {axiosNode, axiosRails} from './lib';
import SearchBox from "./SearchBox";
import Logout from "./Logout";
import {Link} from "react-router";
import {SavedProvider, useSavedContext} from "./context/SavedContext";
import {useThumbsUpContext} from "./context/ThumbsUpContext";
import {useThumbsDownContext} from "./context/ThumbsDownContext";


export default function Books({handleDelete}) {

    const [allBooks, setAllBooks] = useState([]);
    const { state, dispatch } = useSavedContext();
    const {thumbsUpState, thumbsUpDispatch} = useThumbsUpContext();
    const {thumbsDownState, thumbsDownDispatch} = useThumbsDownContext();

    function isSavedBook(isbn) {
        if (state && state.books && state.books.length > 0) {
            for (let i = 0; i < state.books.length; i++) {
                if (state.books[i].isbn == isbn) {
                    return true;
                }
            }
        }
    }

    function isThumbsUpBook(isbn) {
        if (thumbsUpState && thumbsUpState.books && thumbsUpState.books.length > 0) {
            for (let i = 0; i < thumbsUpState.books.length; i++) {
                if (thumbsUpState.books[i].isbn == isbn) {
                    return true;
                }
            }
            return false;
        }
    }

    function isThumbsDownBook(isbn) {
        if (thumbsDownState && thumbsDownState.books && thumbsDownState.books.length > 0) {
            for (let i = 0; i < thumbsDownState.books.length; i++) {
                if (thumbsDownState.books[i].isbn == isbn) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }


    const removeThumbsUp = async (isbn) => {
        try {
            const response = await axiosRails.delete( `/thumbsUpBook/${isbn}`);
            thumbsUpDispatch({ type: 'DELETE', payload: isbn});
        } catch (error) {
            throw error;
        }
    }

    const handleThumbsDown = async (isbn) => {
        try {
            debugger
            const response = await axiosRails.post( `/thumbsDownBook/${isbn}`);
            thumbsDownDispatch({ type: 'ADD', payload: {isbn: isbn}});
        } catch (error) {
            throw error;
        }
    }


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
        fetchAllBooks('Fiction');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = async (title, author, isbn, img_url) => {
        try {
            const response = await axiosRails.post( '/saveBook', {
                title: title,
                author: author,
                isbn: isbn,
                img_url: img_url
            });
            dispatch({ type: 'ADD', payload: {
                title: title,
                author: author,
                isbn: isbn,
                img_url: img_url
            } });
        } catch (error) {
            throw error;
        }
    }

    const handleThumbsUp = async (isbn) => {
        try {
            const response = await axiosRails.post( '/likeBook', {
                isbn: isbn
            });
            thumbsUpDispatch({ type: 'ADD', payload: {isbn: isbn} });
        } catch (error) {
            throw error;
        }
    }

    return (
        <>
            <SearchBox fetchAllbooks={fetchAllBooks}/>

            <Row className="center-text">
                {allBooks.map((book, index) => (
                    <Book title={book.title} author={book.author} isbn={book.isbn} img_url={book.img_url} key={index}
                        id={book.id} savedPage={false} isSavedBook={isSavedBook(book.isbn)} handleSave={handleSave}
                        handleDelete={handleDelete} isThumbsUpBook={isThumbsUpBook(book.isbn)}
                          handleThumbsUp={handleThumbsUp} removeThumbsUp={removeThumbsUp}
                          handleThumbsDown={handleThumbsDown} isThumbsDownBook={isThumbsDownBook(book.isbn)} />
                ))}
            </Row>
        </>
    );
}








