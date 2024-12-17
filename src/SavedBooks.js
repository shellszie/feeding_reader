import React, {useState, useEffect} from 'react';
import {axiosRails, removeElt} from "./lib";
import Book from "./Book";
import {Container, Row} from "react-bootstrap";

const SavedBooks = () => {

    const [savedBooks, setSavedBooks] = useState(null);

    useEffect(() => {
        const getSavedBooks = async () => {
            try {
                const response = await axiosRails.get('/savedBooks');
                setSavedBooks(response.data);
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
            let updatedBooks = removeElt(savedBooks, id);
            setSavedBooks(updatedBooks);
        } catch (error) {
            throw error;
        }
    }

    return (
        <Container>
            <Row>
                {savedBooks && savedBooks.map((book, index) => (
                    <Book title={book.title} author={book.author} isbn={book.isbn} img_url={book.img_url}
                      key={index} id={book.id} isSaved={true} handleDelete={handleDelete}/>
                ))}
            </Row>
        </Container>
    );

}

export default SavedBooks;
