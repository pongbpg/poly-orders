import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import MdExitToApp from 'react-icons/lib/md/exit-to-app';
export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>KMUTNB AUTH</h1>
        </Link>
        {/* <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink> */}
        <button className="button button--link" onClick={startLogout}><MdExitToApp />Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => dispatch(startLogout())
  }
};
export default connect(undefined, mapDispatchToProps)(Header);
