import {useRef, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

const BookViewer = ({isbn, id}) => {
    const canvasRef = useRef();
    const modalRef = useRef();
    const [loaded, setLoaded] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!show) {
            return
        } else {
            window.viewer = new window.google.books.DefaultViewer(canvasRef.current);
            window.viewer.load('ISBN:' + isbn);
            const canvas = document.getElementById("viewerCanvas-" + id);
            modalRef.current.appendChild(canvas);
            canvasRef.current.style.display = 'block';
        }
    }, [show])

    useEffect(() => {
        const scriptTag = document.createElement('script')
        scriptTag.src = 'https://www.google.com/books/jsapi.js'
        scriptTag.addEventListener('load', () => setLoaded(true))
        scriptTag.id = "google-script"
        document.body.appendChild(scriptTag);
    }, []);

    useEffect(() => {
        if (!loaded) {
            return
        } else {
            window.google.books.load();
        }
    }, [loaded])

    const divStyle = {
        height: '600px',
        width: '470px',
        display: 'none'
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <Image src="google_button.png" rounded />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ISBN: {isbn}</Modal.Title>
                </Modal.Header>

                <Modal.Body ref={modalRef}>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div ref={canvasRef} id={`viewerCanvas-${id}`} style={divStyle}></div>
        </>
    )
}
export default BookViewer;
