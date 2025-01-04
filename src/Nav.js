import Logout from "./Logout";
import React from "react";

function Nav() {


    return (
        <div className="heading-wrapper mb-3">
            <div className="feeding-reader">
                <img alt="Feeding Reader Book Previews" src="logo_50x50.png" className="logo"/>&nbsp;
                <span>Feeding Reader</span>
            </div>

            <div className="mt-3">
                <div>Welcome {localStorage.getItem('email')}</div>
                <div className="right-text">
                    <Logout/>
                </div>
            </div>
        </div>

    )
}

export default Nav;