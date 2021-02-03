
import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import { createProductCategory } from '../redux/action/auth'
function AddProductCategory({ auth, isAuthenticated, load, createProductCategory }) {


    const [name, setName] = useState("");
    console.log("??", auth.user._id)
    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );

    const handleChange = e => {

        setName(e.target.value);
    };
    const clickSubmit = e => {
        let id = auth.user._id
        console.log("product")
        console.log("fromAdd", id)
        e.preventDefault();
        createProductCategory(id, name)
    };



    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    return (

        <div >
            <div>
                {newCategoryFom()}
                {goBack()}
            </div>
        </div>

    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    load: state.loader.loading,

});

// Popup.propTypes = {
//     load: PropTypes.bool,
// }

// Popup.defaultProps = {
//     open: false,
//     load: false,
//     categories: []
// }


export default connect(mapStateToProps, { createProductCategory })(AddProductCategory);





