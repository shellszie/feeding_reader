import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

const baseRailsUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return "http://192.168.0.29:3001";
    } else {
        return "https://tranquil-oasis-66716-28841a8a86c6.herokuapp.com/";
    }
}

const baseNodeUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return "http://192.168.0.29:5000";
    } else {
        console.log("process.env.NODE_ENV = " + process.env.NODE_ENV);
        return "https://intense-beyond-88293-6a4d48fa1f58.herokuapp.com";
    }
}

export const axiosNode = axios.create({
    baseURL: baseNodeUrl()
});

export const axiosRails = axios.create({
    baseURL: baseRailsUrl(),
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
});

export const removeElt = (inputArr, id) => {
    const result = inputArr.filter((elt) => elt.id !== id);
    return result;
}



