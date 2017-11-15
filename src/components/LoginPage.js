import React from 'react';
import { connect } from 'react-redux';
import { startLoginWithGoogle, startLoginWithFacebook } from '../actions/auth';

export const LoginPage = ({ startLoginWithGoogle, startLoginWithFacebook }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">KMUTNB AUTH</h1>
            {/* <p>It's time to get your expenses under control.</p> */}
            <div className="box-layout__button">
                <button className="button login-google" onClick={startLoginWithGoogle}>Login with Google</button>
            </div>
            <div className="box-layout__button">
                <button className="button login-facebook" onClick={startLoginWithFacebook}>Login with Facebook</button>
            </div>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
    startLoginWithFacebook: () => dispatch(startLoginWithFacebook())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);