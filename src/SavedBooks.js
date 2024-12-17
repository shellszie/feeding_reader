import React, {useState, useEffect} from 'react';
import {axiosRails, removeElt} from "./lib";
import Book from "./Book";
import {Container, Row} from "react-bootstrap";
import Logout from "./Logout";
import {Link} from 'react-router';

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

            <div className="heading-wrapper">
                <div className="feeding-reader">
                    <img alt="Feeding Reader Book Previews" src="logo_50x50.png" className="logo"/>&nbsp;
                    <span>Feeding Reader</span>
                </div>
                <div className="my-saved-books">My Saved Books</div>
                <Link to="/">Return Home</Link>
                <div className="mt-3">
                    <div>Welcome {localStorage.getItem('email')}</div>
                    <Logout/>
                </div>
            </div>

            <Row className="mt-5">
                {savedBooks && savedBooks.map((book, index) => (
                    <Book title={book.title} author={book.author} isbn={book.isbn} img_url={book.img_url}
                          key={index} id={book.id} isSaved={true} handleDelete={handleDelete}/>
                ))}
            </Row>
        </Container>
    );

}

export default SavedBooks;
