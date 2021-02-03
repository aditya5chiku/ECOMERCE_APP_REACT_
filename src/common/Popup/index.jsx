import React from 'react'
import "./style.css"
function Popup({ open, children }) {
    return open ? (
        <div className="overlay-root" style={open ? { display: "flex" } : { display: "none" }}>
            {children}
        </div>
    ) : (<React.Fragment />)
}

export default Popup
