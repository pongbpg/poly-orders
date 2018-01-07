import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import MdExitToApp from 'react-icons/lib/md/exit-to-app';
import { setTitle } from '../actions/sys';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      title: props.title
    };
  }
  toggleIsActive = () => {
    this.setState(() => ({
      isActive: !this.state.isActive
    }))
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.state.title) {
      this.setState({ title: nextProps.title });
    }
  };
  render() {
    const color = { color: '#333' };
    const borderRadius = { borderRadius: '25px' }
    return (
      // <header className="header">
      //   <div className="content-container">
      //     <div className="header__content">
      //       <Link className="header__title" to="/dashboard">
      //         <h2>KMUTNB-AUTH</h2>
      //       </Link>
      //       {/* <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink> */}
      //       <div className="header__user-info">
      //         <img className="image image--user" src={props.providerData.photoURL} title={props.providerData.displayName} />
      //         <button className="button button--link" onClick={props.startLogout}><MdExitToApp />Logout</button>
      //       </div>
      //     </div>
      //   </div>
      // </header>
      <div>
        <nav className="navbar is-dark">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item brand-text" to="/">KMUTNB AUTH</Link>
              <div className="navbar-burger burger" data-target="navMenu">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div id="navMenu" className="navbar-menu">
              {
                this.props.role === 'admin' && (
                  <div className="navbar-start">
                    <Link className="navbar-item" to="/apps">Apps</Link>
                    <Link className="navbar-item" to="/users">Users</Link>
                  </div>
                )
              }
              <div className="navbar-end">
                <div className={this.state.isActive === true ? "navbar-item has-dropdown is-active" : "navbar-item has-dropdown"}>
                  <a className="navbar-link" onClick={this.toggleIsActive}>
                    <figure className="image is-32x32">
                      <img style={borderRadius} src={this.props.providerData.photoURL} title={this.props.providerData.displayName} />
                    </figure>
                    &nbsp;{this.props.providerData.displayName}
                  </a>
                  <div className="navbar-dropdown">
                    <Link className="navbar-item" to="/">
                      My Apps
                  </Link>
                    <Link className="navbar-item" to="/account">
                      My Accounts
                  </Link>
                    <hr className="navbar-divider" />
                    <div className="navbar-item">
                      <a className="button" onClick={this.props.startLogout}>
                        <span className="icon"><MdExitToApp /></span>
                        <span>Logout</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav >
        <section className="hero">
          <div className="hero-body is-marginless is-bold">
            <div className="container">
              <h1 className="title">{this.state.title}</h1>
              {/* <h2 class="subtitle">Hero subtitle</h2> */}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  providerData: state.auth.providerData,
  role: state.user.role,
  title: state.sys.title
});
const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => dispatch(startLogout())
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
