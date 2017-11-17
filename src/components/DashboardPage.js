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
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <div className="page-header__actions">
              <Link className="button" to="/create">เพิ่มแอพ</Link>
            </div>
          </div>
        </div>
        <div className="content-container">
          <ListApps />
          <ListLogins />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  path: state.path
});

const mapDispatchToProps = (dispatch) => ({
  setPath: (path) => dispatch(setPath(path))
});
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
