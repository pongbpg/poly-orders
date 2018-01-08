import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
export const RegisterRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
     }) => (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div>
                    <Header />
                    <div className="container">
                        <Component {...props} />
                    </div>
                </div>
            ) : (
                    <Redirect to="/address" />
                )
        )} />
    );

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid && !!state.auth.hasAddress
});

export default connect(mapStateToProps)(RegisterRoute);