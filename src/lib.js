// const axios = require('axios');

export const baseUrl = () => {

    if (process.env.NODE_ENV === 'development') {
        console.log('App is running in development mode');
        return "http://localhost:5000";
    } else if (process.env.NODE_ENV === 'production') {
        console.log('App is running in production mode');
        return "https://intense-beyond-88293-6a4d48fa1f58.herokuapp.com";
    } else {
        console.log("env was neither local nor production");
        return "env was neither local nor production";
    }
}