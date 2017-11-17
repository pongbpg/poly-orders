import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectPath from '../selectors/path';

export class AppPage extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    render() {
        // console.log(this.props);
        return (
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Welcome to app {this.props.match.params.appName}.</h1>
                    <h1 className="page-header__title">{this.props.path}</h1>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    path: selectPath(state.path, state.user.apps)
});

export default connect(mapStateToProps)(AppPage);
