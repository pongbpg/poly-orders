import React from 'react';
import { connect } from 'react-redux';


export const DashboardPage = (props) => (
  <div className="content-container">
    <div className="page-header">
      <img src={props.providerData.photoURL} />
      <h1 className="page-header__title">คุณ {props.providerData.displayName}</h1>
      <h1 className="page-header__title">รหัสประชาชน {props.providerData.idcard}</h1>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  providerData: state.auth.providerData
});
export default connect(mapStateToProps)(DashboardPage);
