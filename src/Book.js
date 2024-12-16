import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BookViewer from './BookViewer.js';
import Col from 'react-bootstrap/Col';
import {axiosNode} from './lib';
import Button from "react-bootstrap/Button";

const Book = ({isbn, title, author, img_url, id}) => {

    const [hasPreview, setHasPreview] = useState(false);

    useEffect(() => {
        const doesPreviewExist = async (isbn) => {
            try {
                const response = await axiosNode.get('/previewExists', {
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

    const handleSave = (id) => {

    }

    return (
        <>
            {hasPreview &&
                <Col id={id}>

                    <img alt={title} src={img_url}/>
                    <br/>
                    <span>{title} by {author}</span>
                    <BookViewer isbn={isbn} id={id}/>
                    <div className="center-text">
                        <Button variant="" onClick={()=>handleSave(id)}>
                            <i className="fa-solid fa-floppy-disk fa-2xl"></i>
                        </Button>
                    </div>
                </Col>
            }
        </>
    );

}

export default Book;
