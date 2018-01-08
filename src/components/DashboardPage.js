import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPath, setTitle } from '../actions/sys';
import OrderListPage from './orders/ListPage';
export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.props.setTitle('แบบฟอร์มสั่งซื้อ');
  }
  render() {
    return (
      <div>
        <OrderListPage />
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   path: state.sys.path
// });

const mapDispatchToProps = (dispatch) => ({
  // setPath: (path) => dispatch(setPath(path)),
  setTitle: (title) => dispatch(setTitle(title))
});
export default connect(undefined, mapDispatchToProps)(DashboardPage);
