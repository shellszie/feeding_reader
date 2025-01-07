import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BookViewer from './BookViewer.js';
import Col from 'react-bootstrap/Col';
import {axiosNode, axiosRails} from './lib';
import Button from "react-bootstrap/Button";
import {useSavedContext} from "./context/SavedContext";

const Book = ({isbn, title, author, img_url, preview_url, viewability, id, savedPage, handleDelete, isSavedBook, handleSave,
                isThumbsUpBook, handleThumbsUp, removeThumbsUp, handleThumbsDown, isThumbsDownBook, isEmailedBook,
                handleEmail}) => {

    const [hasPreview, setHasPreview] = useState(false);

    const containsNonDigits = (isbn) => {
        let hasNonDigit = /\D/.test(isbn);
        return hasNonDigit;
    }

    useEffect(() => {
        const doesPreviewExist = async (isbn) => {
            try {
                const response = await axiosNode.get('/previewExists', {
                    params: {
                        isbn: isbn
                    }
                });
                if (response.data && (viewability !== 'NO_PAGES') && !containsNonDigits(isbn)) {
                    setHasPreview(true);
                }
                else {
                    setHasPreview(false);
                }
            } catch (error) {
                console.error(error.message);
            }
        };
        doesPreviewExist(isbn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isbn]);

    return (
        <>
            {hasPreview && !isThumbsDownBook &&
                <Col id={id}>
                    {savedPage &&
                        <div className="mb-1 saved-delete" onClick={() => handleDelete(isbn)}>
                            <i className="fa-solid fa-circle-xmark fa-2xl"></i>
                        </div>
                    }
                    <img alt={title} src={img_url}/>
                    <br/>
                    <span>{title} by {author}</span>
                    <div>
                        <BookViewer isbn={isbn} id={id}/>
                    </div>


                    {!savedPage &&
                        <>
                            <div className="center-text mb-5">
                                <Button variant="" onClick={() => handleThumbsDown(isbn, title, author)}>
                                    <i className="fa-regular fa-thumbs-down fa-2xl"></i>
                                </Button>
                                {!isThumbsUpBook &&
                                    <Button variant="" onClick={() => handleThumbsUp(isbn)}>
                                        <i className="fa-regular fa-thumbs-up fa-2xl"></i>
                                    </Button>
                                }
                                {isThumbsUpBook &&
                                    <Button variant="" onClick={() => removeThumbsUp(isbn)}>
                                        <i className="fa-solid fa-thumbs-up fa-2xl"></i>
                                    </Button>
                                }
                                {!isSavedBook &&
                                    <Button variant="" onClick={() => handleSave(title, author, isbn, img_url)}>
                                        <i className="fa-regular fa-heart fa-2xl"></i>
                                    </Button>
                                }
                                {isSavedBook &&
                                    <Button variant="" onClick={() => handleDelete(isbn)}>
                                        <i className="fa-solid fa-heart fa-2xl"></i>
                                    </Button>
                                }
                                {/*{!isEmailedBook &&*/}
                                {/*    <Button variant="" onClick={() => handleEmail(title, author, isbn, img_url, preview_url)}>*/}
                                {/*        <i className="fa-regular fa-envelope fa-2xl"></i>*/}
                                {/*    </Button>*/}
                                {/*}*/}
                                {/*{isEmailedBook &&*/}
                                {/*    <Button variant="">*/}
                                {/*        <i className="fa-solid fa-envelope fa-2xl"></i>*/}
                                {/*    </Button>*/}
                                {/*}*/}
                            </div>
                        </>
                    }
                </Col>
            }
        </>
    );

}

export default Book;
