import React, {useState, useEffect} from 'react';
import {axiosRails, removeElt} from "./lib";
import Book from "./Book";
import {Container, Row} from "react-bootstrap";
import Logout from "./Logout";
import {Link} from 'react-router';
import {SavedProvider, useSavedContext} from "./context/SavedContext";
const SavedBooks = ({handleDelete}) => {

    const { state, dispatch } = useSavedContext();

    return (
        <Container>
            <Row className="mt-5 center-text">
                {state && state.books && state.books.map((book, index) => (
                    <Book title={book.title} author={book.author} isbn={book.isbn} img_url={book.img_url}
                          key={index} id={book.id} savedPage={true} handleDelete={handleDelete} isSavedBook={true} />
                ))}
            </Row>
        </Container>
    );

}

export default SavedBooks;
