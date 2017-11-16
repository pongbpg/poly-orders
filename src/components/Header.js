import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import MdExitToApp from 'react-icons/lib/md/exit-to-app';
export const Header = (props) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h2>KMUTNB-AUTH</h2>
        </Link>
        {/* <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink> */}
        <div className="header__user-info">
          <img className="image image--user" src={props.providerData.photoURL} title={props.providerData.displayName} />
          <button className="button button--link" onClick={props.startLogout}><MdExitToApp />Logout</button>
        </div>
      </div>
    </div>
  </header>
);
const mapStateToProps = (state) => ({
  providerData: state.auth.providerData
});
const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => dispatch(startLogout())
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
