import React from 'react';
import { connect } from 'react-redux';
import FaGoogle from 'react-icons/lib/fa/google';
import FaFacebook from 'react-icons/lib/fa/facebook';
import { startLoginWithGoogle, startLoginWithFacebook } from '../actions/auth';

const styleBg = {
    background: 'url("/images/cover.jpg")',
    backgroundSize: 'cover',
    height: '100vh',
    body: {
        fontFamily: 'Kanit, sans-serif;'
    }
};

export const LoginPage = (props) => (
    // <div className="box-layout">
    //     <div className="box-layout__box">
    //         <h1 className="box-layout__title">KMUTNB AUTH</h1>
    //         <button className="button button--secondary login-google box-layout__button" onClick={props.startLoginWithGoogle}><FaGoogle />oogle</button>
    //         <button className="button login-facebook box-layout__button" onClick={props.startLoginWithFacebook}><FaFacebook />acebook</button>
    //     </div>
    // </div>
    <div className="hero is-dark is-fullheight" style={styleBg}>
        <div className="hero-body">
            <div className="container has-text-centered">
                <div className="column is-4 is-offset-4 box">
                    <h2 className="title has-text-danger"><img src="/images/icon.png" /></h2>
                    <p className="subtitle has-text-danger">กรุณาล็อกอินเพื่อสั่งซื้อสินค้า</p>
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <a className="button is-success" onClick={props.startLoginWithGoogle}>Login with&nbsp;<FaGoogle />oogle</a>
                        </div>
                        <div className="control">
                            <a className="button is-link" onClick={props.startLoginWithFacebook}>Login with&nbsp;<FaFacebook />acebook</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
    startLoginWithFacebook: () => dispatch(startLoginWithFacebook())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);