import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectPath from '../selectors/path';

export class AppPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userApps: this.props.userApps,
            path: this.props.path,// || this.props.history.location.pathname,
            selectPath: this.props.selectPath
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.userApps !== this.state.userApps) {
            this.setState({ selectPath: selectPath(nextProps.path, nextProps.userApps) });
            // this.props.history.push(selectPath(nextProps.path, nextProps.userApps));
        }
    };
    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    {
                        this.state.selectPath === '/' ? (
                            <h1 className="page-header__title"><Link to="/">Go home</Link> You don't have permission this app {this.props.match.params.appName}.</h1>
                        ) : (
                                <h1 className="page-header__title">Welcome to app {this.props.match.params.appName}.</h1>
                            )
                    }
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    // console.log('state userApps', state.user.apps);
    return {
        userApps: state.user.apps,
        path: state.path,
        selectPath: selectPath(state.path, state.user.apps)
    }
};

export default connect(mapStateToProps)(AppPage);
