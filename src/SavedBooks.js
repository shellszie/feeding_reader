import React, {useState, useEffect} from 'react';
import {axiosRails, removeElt} from "./lib";
import Book from "./Book";
import {Container, Row} from "react-bootstrap";
import Logout from "./Logout";
import {Link} from 'react-router';
import {SavedProvider, useSavedContext} from "./context/SavedContext";
const SavedBooks = () => {

    // const [savedBooks, setSavedBooks] = useState(null);
    const { state, dispatch } = useSavedContext();

    const handleDelete = async (isbn, id) => {
        try {
            const response = await axiosRails.delete( `/savedBook/${isbn}`);
            // let updatedBooks = removeElt(savedBooks, id);
            // setSavedBooks(updatedBooks);
            dispatch({ type: 'DELETE', payload: isbn});
        } catch (error) {
            throw error;
        }
    }

    return (
        <Container>
            <Row className="mt-5 center-text">
                {state && state.books.map((book, index) => (
                    <Book title={book.title} author={book.author} isbn={book.isbn} img_url={book.img_url}
                          key={index} id={book.id} savedPage={true} handleDelete={handleDelete} isSavedBook={true} />
                ))}
            </Row>
        </Container>
    );

}

export default SavedBooks;
