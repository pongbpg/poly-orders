import React from 'react';
import { connect } from 'react-redux';
import AppForm from './Form';
import { startAddApp } from '../../actions/apps';
import { setTitle } from '../../actions/sys';
export class AddPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.setTitle('เพิ่มแอพพลิเคชั่น')
    }
    onSubmit = (app) => {
        this.props.startAddApp(app);
        this.props.history.push('/');
    };
    render() {
        return (
            <AppForm onSubmit={this.onSubmit} />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddApp: (app) => dispatch(startAddApp(app)),
    setTitle: (title) => dispatch(setTitle(title))
});

export default connect(undefined, mapDispatchToProps)(AddPage);