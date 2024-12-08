import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

const baseRailsUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return "http://localhost:3001";
    } else {
        return "https://tranquil-oasis-66716-28841a8a86c6.herokuapp.com/";
    }
}

export const axiosRails = axios.create({
    baseURL: baseRailsUrl(),
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
});

export const baseNodeUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        console.log("process.env.NODE_ENV = " + process.env.NODE_ENV);
        return "http://localhost:5000";
    } else {
        console.log("process.env.NODE_ENV = " + process.env.NODE_ENV);
        return "https://intense-beyond-88293-6a4d48fa1f58.herokuapp.com";
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

