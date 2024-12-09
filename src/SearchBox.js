import React from 'react';

export default function SearchBox() {
    return (
        <form>

            <div className="form-group">

                <input type="text" className="form-control" id="searchTerm" placeholder="NY Times Bestsellers"/>
            </div>

            <button type="submit" className="btn btn-primary">Search</button>
        </form>
    );
}