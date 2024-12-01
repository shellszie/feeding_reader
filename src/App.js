import './App.css';
import Books from './Books.js';
import Image from 'react-bootstrap/Image';
import { BrowserRouter, Routes, Route } from "react-router";
import Signup from './Signup.js';

function App() {
    return (
        <div className="App">

            <span className="feeding-reader">Feeding Reader</span>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Books />} />
                    <Route path="/signup" element={<Signup />}>
                        {/*<Route index element={<RecentActivity />} />*/}
                        {/*<Route path="project/:id" element={<Project />} />*/}
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
