import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BookViewer from './BookViewer.js';
import Col from 'react-bootstrap/Col';
import {baseNodeUrl} from './lib';

const Book = ({isbn, title, author, img_url, id}) => {

    const [hasPreview, setHasPreview] = useState(false);

    useEffect(() => {
        const doesPreviewExist = async (isbn) => {
            try {
                const response = await axios.get(baseNodeUrl() +'/previewExists', {
                    params: {
                        isbn: isbn
                    }
                });
                setHasPreview(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };
        doesPreviewExist(isbn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {hasPreview &&
                <Col id={id}>
                    <img alt={title} src={img_url}/>
                    <br/>
                    <span>{title} by {author}</span>
                    <BookViewer isbn={isbn} id={id}/>
                </Col>
            }
        </>
    );

}

export default Book;
