import React, {useContext, useReducer, createContext} from "react";

const ThumbsDownContext = createContext();

const thumbsDownReducer = (thumbsDownState, action) => {
    switch (action.type) {
        case 'ADD':
            return { books: [...thumbsDownState.books, action.payload] };
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


export const ThumbsDownProvider = ({ children }) => {
    const [thumbsDownState, thumbsDownDispatch] = useReducer(thumbsDownReducer, { books: [] });

    return (
        <ThumbsDownContext.Provider value={{thumbsDownState, thumbsDownDispatch }}>
            {children}
        </ThumbsDownContext.Provider>
    );
}


export const useThumbsDownContext = () => {
    return useContext(ThumbsDownContext);
}
