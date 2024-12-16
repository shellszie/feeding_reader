import React, {useState, useEffect} from 'react';

const SavedBooks = () => {

    useEffect(() => {
        // const doesPreviewExist = async (isbn) => {
        //     try {
        //         const response = await axiosNode.get('/previewExists', {
        //             params: {
        //                 isbn: isbn
        //             }
        //         });
        //         setHasPreview(response.data);
        //     } catch (error) {
        //         console.error(error.message);
        //     }
        // };
        // doesPreviewExist(isbn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            Saved Books Go here
        </>
    );

}

export default SavedBooks;
