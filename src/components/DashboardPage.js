import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddPage from './apps/AddPage';
import ListMyApps from './myapps/List';
import ListLogins from './logins/List';
import { setPath, setTitle } from '../actions/sys';
import selectPath from '../selectors/sys';
export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.props.setTitle('แอพพลิเคชั่นของฉัน');
  }
  componentDidUpdate() {
    const path = this.props.path;
    // console.log(path);
    if (path !== '/' && path !== '/dashboard') {
      // if (path.indexOf('callback') > -1) {
      //   this.props.history.push('/');
      // } else {
      this.props.history.push(path);
      // }
    }
  }

  render() {

    return (
      <div>
        <ListMyApps />
        {/* <ListLogins /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  path: state.sys.path,
  role: state.user.role
});

const mapDispatchToProps = (dispatch) => ({
  setPath: (path) => dispatch(setPath(path)),
  setTitle: (title) => dispatch(setTitle(title))
});
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
