import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Logout from "./Logout";
import {Link} from "react-router";
import SavedBooks from "./SavedBooks";
import Books from "./Books.js";

function Home() {
    const [key, setKey] = useState('home');

    return (
        <>
            <div className="heading-wrapper">
                <div className="feeding-reader">
                    <img alt="Feeding Reader Book Previews" src="logo_50x50.png" className="logo"/>&nbsp;
                    <span>Feeding Reader</span>
                </div>

                <div className="mt-3">
                    <div>Welcome {localStorage.getItem('email')}</div>
                    <Logout/>
                </div>

            </div>

            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="home" title="Home">
                    <Books />
                </Tab>
                <Tab eventKey="saved" title="Saved">
                    <SavedBooks />
                </Tab>
            </Tabs>
        </>
)
    ;
}

export default Home;