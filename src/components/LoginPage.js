import React from 'react';
import { connect } from 'react-redux';
import FaGoogle from 'react-icons/lib/fa/google';
import FaFacebook from 'react-icons/lib/fa/facebook';
import { startLoginWithGoogle, startLoginWithFacebook } from '../actions/auth';

export const LoginPage = (props) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">KMUTNB AUTH</h1>
            <button className="button button--secondary login-google box-layout__button" onClick={props.startLoginWithGoogle}><FaGoogle />oogle</button>
            <button className="button login-facebook box-layout__button" onClick={props.startLoginWithFacebook}><FaFacebook />acebook</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
    startLoginWithFacebook: () => dispatch(startLoginWithFacebook())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);