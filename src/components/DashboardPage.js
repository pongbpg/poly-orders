import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddPage from './apps/AddPage';
import ListApps from './apps/List';
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
    if (path !== '/' && path !== '/dashboard') {
      this.props.history.push(path);
    }
  }

  render() {
    // const marginTop = {
    //   marginTop: '20px'
    // };

    // const marginLeft = {
    //   marginLeft: '10px'
    // };
    // return (
    //   <div>
    //     {
    //       this.props.role === 'admin' && (
    //         <div className="page-header">
    //           <div className="content-container">
    //             <div className="page-header__actions">
    //               <Link className="button" to="/create">จัดการแอพ</Link>
    //               <Link className="button" to="/users" style={marginLeft}>จัดการผู้ใช้งาน</Link>
    //             </div>
    //           </div>
    //         </div>
    //       )
    //     }
    //     < div className="content-container" style={marginTop} >
    //       <ListApps />
    //       <ListLogins />
    //     </div>
    //   </div>
    // );

    return (
      <div>
        <ListApps />
        <ListLogins />
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
