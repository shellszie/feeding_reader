// const axios = require('axios');

export const baseUrl = () => {

    if (process.env.NODE_ENV === 'development') {
        return "http://localhost:5000";
    } else {
        return "https://intense-beyond-88293-6a4d48fa1f58.herokuapp.com";
    }
}