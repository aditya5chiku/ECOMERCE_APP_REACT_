import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import Layout from "../../core/Layout";
import Popup from '../../common/Error/index'
import PropTypes from 'prop-types'
import { login } from '../../redux/action/auth'
import { useHistory } from 'react-router-dom'

const Login = ({ login, load, isAuthenticated, auth }) => {

    console.log("LOGING", auth)

    const history = useHistory()
    const [values, setValues] = useState({
        email: "adityakumar8203@gmail.com",
        password: "17Mcr@2020"
    });

    console.log("oo", auth);
    if (isAuthenticated) {
        history.push("/admin/dashboard")
    }

    const { email, password } = values;


    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        login({ email, password })
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );




    return (

        <Layout
            title="Signin"
            description="Signin to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {signUpForm()}
        </Layout>
    );
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state,
    load: state.loader.loading,

});


Popup.propTypes = {
    load: PropTypes.bool,
}

Popup.defaultProps = {
    open: false,
    load: false,
    categories: []
}


export default connect(mapStateToProps, { login })(Login);

