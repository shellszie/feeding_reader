import axios from 'axios';

export const baseNodeUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        console.log("process.env.NODE_ENV = " + process.env.NODE_ENV);
        return "http://localhost:5000";
    } else {
        console.log("process.env.NODE_ENV = " + process.env.NODE_ENV);
        return "https://intense-beyond-88293-6a4d48fa1f58.herokuapp.com";
    }
}

export const baseRailsUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        // console.log("process.env.NODE_ENV = " + process.env.NODE_ENV);
        // return "http://localhost:3001";
        return "http://localhost:3001";
    } else {
        // console.log("process.env.NODE_ENV = " + process.env.NODE_ENV);
        //TODO: update below URL to new heroku url after deploying rails app
        return "https://tranquil-oasis-66716-28841a8a86c6.herokuapp.com/";
    }
}

// const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// export const login = async (email, password) => {
//     try {
//         const response = await axios.post(baseRailsUrl() + '/login', { email, password }, {
//             headers: {
//                 'X-CSRF-Token': csrfToken  // Include CSRF token in the request headers
//             }
//         });
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }

