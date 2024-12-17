import React, {useState, useEffect} from 'react';
import {axiosRails} from "./lib";
import Book from "./Book";

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

    return (
        <>
            {savedBooks && savedBooks.map((book, index) => (
                <Book title={book.title} author={book.author} isbn={book.isbn} img_url={book.img_url} key={index}
                      id={book.id} isSaved={true} />
            ))}
        </>
    );

}

export default SavedBooks;
