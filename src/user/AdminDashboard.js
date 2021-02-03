import React from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
const AdminDashboard = ({ auth }) => {
    const { name, role, email } = auth

    const adminLinks = () => {
        return (
            <div  >
                <h4 >Admin Links</h4>
                <ul >
                    <li >
                        <Link to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li >
                        <Link className="nav-link" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div>
                <h3 >User Information</h3>
                <ul>
                    <li>{name}</li>
                    <li >{email}</li>
                    <li>
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div >
                <div >{adminLinks()}</div>
                {/* <div >{adminInfo()}</div> */}
            </div>
        </Layout>
    );
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth.user,
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


export default connect(mapStateToProps, {})(AdminDashboard);



