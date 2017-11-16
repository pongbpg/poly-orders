import React from 'react';
import { connect } from 'react-redux';
import AppForm from './Form';
import { startAddApp } from '../../actions/apps';
export class AddPage extends React.Component {
    onSubmit = (app) => {
        this.props.startAddApp(app);
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">เพิ่มแอพ</h1>
                    </div>
                </div>
                <div className="content-container">
                    <AppForm onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddApp: (app) => dispatch(startAddApp(app))
});

export default connect(undefined, mapDispatchToProps)(AddPage);