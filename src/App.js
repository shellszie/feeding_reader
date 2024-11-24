import './App.css';
import Books from './Books.js';
import Image from 'react-bootstrap/Image';

function App() {
    return (
        <div className="App">
            <Image src="logo.png" className="logo" thumbnail />
            <span className="feeding-reader">Feeding Reader</span>
            <Books/>
        </div>
    );
}

export default App;
