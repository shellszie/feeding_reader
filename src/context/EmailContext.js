import React, {useContext, useReducer, createContext} from "react";

const EmailContext = createContext();

const emailReducer = (emailState, action) => {
    switch (action.type) {
        case 'ADD':
            return { books: [...emailState.books, action.payload] };
        case 'INIT':
            return { books: (action.payload || [])  };
        default:
            throw new Error();
    }
}

function removeIsbnElt(arr, isbn) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].isbn !== isbn){
            result.push(arr[i]);
        }
    }
    return result;
}


export const EmailProvider = ({ children }) => {
    const [emailState, emailDispatch] = useReducer(emailReducer, { books: [] });

    return (
        <EmailContext.Provider value={{emailState, emailDispatch }}>
            {children}
        </EmailContext.Provider>
    );
}


export const useEmailContext = () => {
    return useContext(EmailContext);
}
