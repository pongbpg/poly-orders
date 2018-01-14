import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import MdExitToApp from 'react-icons/lib/md/exit-to-app';
import FaHome from 'react-icons/lib/fa/home';
import { setTitle } from '../actions/sys';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenu: false,
      isBurger: false,
      title: props.title
    };
  }
  toggleIsMenu = () => {
    this.setState(() => ({
      isMenu: !this.state.isMenu
    }))
  };
  toggleIsBurger = () => {
    // console.log('click burger')
    this.setState(() => ({
      isBurger: !this.state.isBurger
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
      <div>
        <nav className="navbar is-danger">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item brand-text" to="/products"><FaHome />&nbsp;หน้าแรก</Link>
              <div data-target="navMenu" onClick={this.toggleIsBurger}
                className={this.state.isBurger === true ? "navbar-burger burger is-active" : "navbar-burger burger"}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div id="navMenu" className={this.state.isBurger === true ? "navbar-menu is-active" : "navbar-menu"}>
              < div className="navbar-start">
                <Link className="navbar-item" to="/products">เลือกสินค้า</Link>
                <Link className="navbar-item" to="/products/add">เพิ่มสินค้า</Link>
                <Link className="navbar-item is-hidden-desktop" to="/address">ที่อยู่จัดส่งสินค้า</Link>
                <a className="navbar-item is-hidden-desktop" onClick={this.props.startLogout}>ออกจากระบบ</a>
              </div>
              <div className="navbar-end is-hidden-touch">
                <div className={this.state.isMenu === true ? "navbar-item has-dropdown is-active" : "navbar-item has-dropdown"}>
                  <a className="navbar-link" onClick={this.toggleIsMenu}>
                    <figure className="image is-32x32">
                      <img style={borderRadius} src={this.props.providerData.photoURL} title={this.props.providerData.displayName} />
                    </figure>
                    &nbsp;{this.props.providerData.name ? this.props.providerData.name : this.props.providerData.displayName}
                  </a>
                  <div className="navbar-dropdown">
                    <Link className="navbar-item" to="/address">
                      ที่อยู่จัดส่งสินค้า
                    </Link>
                    <hr className="navbar-divider" />
                    <a className="navbar-item" onClick={this.props.startLogout}> ออกจากระบบ</a>
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
      </div >
    );
  }
}
const mapStateToProps = (state) => ({
  providerData: state.auth.providerData,
  role: state.auth.role,
  title: state.sys.title
});
const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => dispatch(startLogout())
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
