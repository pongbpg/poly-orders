import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddPage from './apps/AddPage';
import ListApps from './apps/List';
import ListLogins from './logins/List';
import { setPath } from '../actions/path';
import selectPath from '../selectors/path';

export class DashboardPage extends React.Component {

  componentDidUpdate() {
    const path = this.props.path;
    if (path !== '/' && path !== '/dashboard') {
      this.props.history.push(path);
    }
  }

  render() {
    const marginTop = {
      marginTop: '20px'
    };

    const marginLeft = {
      marginLeft: '10px'
    };
    return (
      <div>
        {
          this.props.role === 'admin' && (
            <div className="page-header">
              <div className="content-container">
                <div className="page-header__actions">
                  <Link className="button" to="/create">จัดการแอพ</Link>
                  <Link className="button" to="/users" style={marginLeft}>จัดการผู้ใช้งาน</Link>
                </div>
              </div>
            </div>
          )
        }
        < div className="content-container" style={marginTop} >
          <ListApps />
          <ListLogins />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  path: state.path,
  role: state.user.role
});

const mapDispatchToProps = (dispatch) => ({
  setPath: (path) => dispatch(setPath(path))
});
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
