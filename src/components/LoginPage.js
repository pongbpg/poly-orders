import React from 'react';
import { connect } from 'react-redux';
import FaGoogle from 'react-icons/lib/fa/google';
import FaFacebook from 'react-icons/lib/fa/facebook';
import { startLoginWithGoogle, startLoginWithFacebook } from '../actions/auth';

// const styleBg = {
//     background: 'url("/images/bg.png")',
//     backgroundSize: 'cover',
//     height: '100vh'
// };

export const LoginPage = (props) => (
    // <div className="box-layout">
    //     <div className="box-layout__box">
    //         <h1 className="box-layout__title">KMUTNB AUTH</h1>
    //         <button className="button button--secondary login-google box-layout__button" onClick={props.startLoginWithGoogle}><FaGoogle />oogle</button>
    //         <button className="button login-facebook box-layout__button" onClick={props.startLoginWithFacebook}><FaFacebook />acebook</button>
    //     </div>
    // </div>
    <div className="hero is-dark is-fullheight">
        <div className="hero-body">
            <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                    <h3 className="title has-text-white">KMUTNB AUTH</h3>
                    <p className="subtitle has-text-white">Please login to proceed.</p>
                    <div className="box">
                        {/* <form> */}
                        <div className="field">
                            <div className="control">
                                <input className="input is-medium" type="email" placeholder="Your Email" autoFocus />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input className="input is-medium" type="password" placeholder="Your Password" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="checkbox">
                                <input type="checkbox" />
                                Remember me
                                </label>
                        </div>
                        <div className="field">
                            <a className="button is-block is-primary is-large">Login</a>
                        </div>
                        <div className="field is-grouped is-grouped-centered">
                            <div className="control">
                                <a className="button is-light" onClick={props.startLoginWithGoogle}>Login with&nbsp;<FaGoogle />oogle</a>
                            </div>
                            <div className="control">
                                <a className="button is-link" onClick={props.startLoginWithFacebook}>Login with&nbsp;<FaFacebook />acebook</a>
                            </div>
                        </div>
                        {/* </form> */}
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