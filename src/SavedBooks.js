import React, {useState, useEffect} from 'react';
import {axiosRails, removeElt} from "./lib";
import Book from "./Book";
import {Container, Row} from "react-bootstrap";
import Logout from "./Logout";
import {Link} from 'react-router';
import {useSavedContext} from "./context/SavedContext";

const SavedBooks = () => {

    // const [savedBooks, setSavedBooks] = useState(null);
    const { state, dispatch } = useSavedContext();

    useEffect(() => {
        const getSavedBooks = async () => {
            try {
                const response = await axiosRails.get('/savedBooks');
                // setSavedBooks(response.data);
                dispatch({type: "init", books: response.data});
                console.log("end of init");
            } catch (error) {
                console.error(error.message);
            }
        };

        getSavedBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (isbn, id) => {
        try {
            const response = await axiosRails.delete( `/savedBook/${isbn}`);
            // let updatedBooks = removeElt(savedBooks, id);
            // setSavedBooks(updatedBooks);
        } catch (error) {
            throw error;
        }
    }

    return (
        <Container>
            <Row className="mt-5 center-text">
                {state && state.map((book, index) => (
                    <Book title={book.title} author={book.author} isbn={book.isbn} img_url={book.img_url}
                          key={index} id={book.id} isSaved={true} handleDelete={handleDelete}/>
                ))}
            </Row>
        </Container>
    );

}

export default SavedBooks;
