import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {axiosNode, axiosRails} from "./lib";

export default function SearchBox({allBooks, parseBookData}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    // const [allBooks, setAllBooks] = useState(allBooks);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (searchTerm === '') {
            setError("Must enter a search term");
        }
        else {
            setError('');
            try {
                const searchResults = await doSearch();
                console.log("searchResults = " + searchResults);
            }
            catch (error) {
                console.log("search failed");
            }

        }
      }

      const doSearch = async () => {
          try {
              const response = await axiosRails.post( '/saveSearchTerm', {
                  searchTerm: searchTerm
              });
              console.log("response.data = " + response.data.items);
              // setAllBooks(parseBookData(response.data.items));
          } catch (error) {
              throw error;
          }

          try {
              const response = await axiosNode.get('/googlebooks', {
                  params: {
                  searchTerm: searchTerm
                }
              });
              console.log("response from google books = " + response.data);
              // setAllBooks(parseBookData(response.data));
          } catch (error) {
              console.error('Error fetching data:', error);
          }

      }



    return (
        // <form>
        //
        //     <div className="form-group">
        //
        //         <input type="text" className="form-control" id="searchTerm" placeholder="NY Times Bestsellers"/>
        //     </div>
        //
        //     <button type="submit" className="btn btn-primary">Search</button>
        // </form>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="searchTerm">
                <Form.Control
                    type="text"
                    placeholder="NY Times Best Sellers"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    // isInvalid={!!errors.search}
                />
                <div className="error">
                    {error}
                </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
                Search
            </Button>
        </Form>
    );
}