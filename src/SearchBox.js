import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {axiosRails} from "./lib";

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

        <Form onSubmit={handleSubmit} className="mb-5 mt-3 center-text">
            <Form.Group controlId="searchTerm">
                <Form.Control
                    type="text"
                    placeholder="NY Times Best Sellers"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="my-form"
                />
                <Button variant="primary" type="submit" className="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-search"
                         viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </Button>
                <div className="error">
                    {error}
                </div>
            </Form.Group>



        </Form>
    );
}