import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BookViewer from './BookViewer.js';
import Col from 'react-bootstrap/Col';
import {axiosNode, axiosRails} from './lib';
import Button from "react-bootstrap/Button";

const Book = ({isbn, title, author, img_url, id, isSaved, handleDelete}) => {

    const [hasPreview, setHasPreview] = useState(false);
    const [confirm, setConfirm] = useState("");

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
        setConfirm("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isbn]);

    const handleSave = async (title, author, isbn, img_url) => {
        try {
            const response = await axiosRails.post( '/saveBook', {
                title: title,
                author: author,
                isbn: isbn,
                img_url: img_url
            });
            setConfirm("Saved");
        } catch (error) {
            throw error;
        }
    }

    return (
        <>
            {hasPreview &&
                <Col id={id}>
                    {isSaved &&
                        <div className="mb-1" onClick={() => handleDelete(isbn, id)}>
                            <i className="fa-solid fa-circle-xmark fa-2xl"></i>
                        </div>
                    }
                    <img alt={title} src={img_url}/>
                    <br/>
                    <span>{title} by {author}</span>
                    <div>
                        <BookViewer isbn={isbn} id={id}/>
                    </div>
                    {!isSaved &&
                        <>
                            <div className="center-text">
                                <Button variant="" onClick={() => handleSave(title, author, isbn, img_url)}>
                                    <i className="fa-solid fa-floppy-disk fa-2xl"></i>
                                </Button>
                                <Button variant="">
                                    <i className="fa-solid fa-thumbs-up fa-2xl"></i>
                                </Button>
                            </div>
                            <div className="center-text">
                                {confirm}
                            </div>
                        </>
                    }
                </Col>
            }
        </>
    );

}

export default Book;
