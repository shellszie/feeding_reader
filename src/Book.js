import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BookViewer from './BookViewer.js';
import Col from 'react-bootstrap/Col';

const Book = ({isbn, title, author, img_url, id}) => {

    const [hasPreview, setHasPreview] = useState(false);

    useEffect(() => {
        const doesPreviewExist = async (isbn) => {
            try {
              const response = await axios.get('http://localhost:5000/previewExists', {
                params: {
                    isbn: isbn
                }
            });

            console.log("Returning " + response.data);
            setHasPreview(response.data);

          } catch (error) {
          console.error(error.message);
        }
    };

    doesPreviewExist(isbn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasPreview) {
        console.log("hasPreview changed to : " + hasPreview);
    }

  }, [hasPreview])

  return (
      <>
         {hasPreview &&
           <Col key={id}>
                <img alt={title} src={img_url} />
                <br/>
                <span>{title} by {author}</span>
                <BookViewer isbn={isbn} id={id} />
            </Col>
         }
      </>
  );

}

export default Book;
