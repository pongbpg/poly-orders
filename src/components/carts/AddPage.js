import React from 'react';
import { connect } from 'react-redux';
import CartForm from './Form';
// import { startAddApp } from '../../actions/apps';
import { setTitle } from '../../actions/sys';
export class CartAddPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.setTitle('เพิ่มรายการสั่งซื้อ')
    }
    onSubmit = (app) => {
        // this.props.startAddApp(app);
        this.props.history.push('/');
    };
    render() {
        return (
            <CartForm onSubmit={this.onSubmit} />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    // startAddApp: (app) => dispatch(startAddApp(app)),
    setTitle: (title) => dispatch(setTitle(title))
});

export default connect(undefined, mapDispatchToProps)(CartAddPage);