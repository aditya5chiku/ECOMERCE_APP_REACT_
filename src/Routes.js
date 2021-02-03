import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Register from './user/Register/Register'
import Login from './user/Login/Login'
import AdminDashboard from "./user/AdminDashboard"
import Error from './common/Error';
import AdminRoute from './PrivateRoute/AdminRoute'
import AddProductCategory from './admin/AddProductCategory'

function Routes() {
    return (
        <div>
            <Error />
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact component={Login} />
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                    <AdminRoute path="/create/category" exact component={AddProductCategory} />



                    {/* <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute
                    path="/user/dashboard"
                    exact
                    component={Dashboard}
                />
                <AdminRoute
                    path="/admin/dashboard"
                    exact
                    component={AdminDashboard}
                />
                <AdminRoute
                    path="/create/category"
                    exact
                    component={AddCategory}
                />
                <AdminRoute
                    path="/create/product"
                    exact
                    component={AddProduct}
                /> */}
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default Routes
