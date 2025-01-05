import React, {useState, useReducer, useContext, createContext, useEffect} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Logout from "./Logout";
import {Link} from "react-router";
import SavedBooks from "./SavedBooks";
import Books from "./Books.js";
import Nav from "./Nav.js";
import {useSavedContext} from "./context/SavedContext";
import {SavedProvider} from "./context/SavedContext";
import {axiosRails} from "./lib";

function Home() {
    const [key, setKey] = useState('home');
    const { state, dispatch } = useSavedContext();

    useEffect(() => {
        const getSavedBooks = async () => {
            try {
                const response = await axiosRails.get('/savedBooks');
                // setSavedBooks(response.data);
                dispatch({type: "INIT", payload: response.data});
            } catch (error) {
                console.error(error.message);
            }
        };
        getSavedBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (isbn) => {
        try {
            const response = await axiosRails.delete( `/savedBook/${isbn}`);
            dispatch({ type: 'DELETE', payload: isbn});
        } catch (error) {
            throw error;
        }
    }


    return (
        <>
            <Nav />

            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="home" title="Home">
                    <Books handleDelete={handleDelete} />
                </Tab>
                <Tab eventKey="saved" title="Favorites">
                    <SavedBooks handleDelete={handleDelete} />
                </Tab>
            </Tabs>
        </>
)
    ;
}

export default Home;