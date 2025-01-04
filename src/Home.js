import React, { useState, useReducer, useContext, createContext } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Logout from "./Logout";
import {Link} from "react-router";
import SavedBooks from "./SavedBooks";
import Books from "./Books.js";
import Nav from "./Nav.js";
import {useSavedContext} from "./context/SavedContext";
import {SavedProvider} from "./context/SavedContext";

function Home() {
    const [key, setKey] = useState('home');


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
                    <SavedProvider>
                        <Books />
                    </SavedProvider>

                </Tab>
                <Tab eventKey="saved" title="Saved">
                    <SavedProvider>
                        <SavedBooks />
                    </SavedProvider>
                </Tab>
            </Tabs>
        </>
)
    ;
}

export default Home;