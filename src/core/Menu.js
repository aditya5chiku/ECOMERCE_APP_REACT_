import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Menu = ({ auth, load, isAuthenticated }) => {
    console.log("PP", isAuthenticated, auth)
    const histroy = useHistory()

    return (
        <>
            <div>
                <ul className="nav nav-tabs bg-primary">
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/"
                        >
                            Home
                         </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"

                            to="/shop"
                        >
                            Shop
                      </Link>
                    </li>

                    {isAuthenticated && auth.user.role === 0 && (
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/user/dashboard"
                            >
                                Dashboard
                    </Link>
                        </li>
                    )}

                    {isAuthenticated && auth.user.role === 0 && (
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/admin/dashboard"
                            >
                                Dashboard
                    </Link>
                        </li>
                    )}

                    {!isAuthenticated && (
                        <Fragment>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/login"
                                >
                                    Login
                        </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/register"
                                >
                                    Register
                        </Link>
                            </li>
                        </Fragment>
                    )}

                    {isAuthenticated && (
                        <li className="nav-item">
                            <span
                                className="nav-link"
                                style={{ cursor: "pointer", color: "#ffffff" }}
                            // onClick={() =>
                            //     signout(() => {
                            //         history.push("/");
                            //     })
                            // }
                            >
                                Signout
                    </span>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}


// Popup.propTypes = {
//     load: PropTypes.bool,
// }

// Popup.defaultProps = {
//     open: false,
//     load: false,
//     categories: []
// }
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    load: state.loader.loading,

});

export default connect(mapStateToProps)(Menu);


