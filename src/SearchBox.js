import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {axiosNode, axiosRails} from "./lib";

export default function SearchBox({fetchAllbooks}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (searchTerm === '') {
            setError("Must enter a search term");
        }
        else {
            setError('');
            try {
                const searchResults = await doSearch();
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
          } catch (error) {
              throw error;
          }
          try {
              if (searchTerm !== "") {
                const response = await fetchAllbooks(searchTerm);
              }
          } catch (error) {
              throw error;
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