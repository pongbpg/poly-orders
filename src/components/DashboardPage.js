import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddPage from './apps/AddPage';
import ListApps from './apps/List';

export const DashboardPage = (props) => (
  <div>

    <div className="page-header">
      <div className="content-container">
        <div className="page-header__actions">
          <Link className="button" to="/app/create">เพิ่มแอพ</Link>
        </div>
      </div>
    </div>
    <div className="content-container">
      <ListApps />
    </div>
    {/* <AddPage /> */}
  </div>
  // <div className="page-header">
  //<img className="image" src={props.providerData.photoURL} />
  // </div>
);

// const mapStateToProps = (state) => ({
//   providerData: state.auth.providerData
// });
export default connect(undefined)(DashboardPage);
