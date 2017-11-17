import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectPath from '../selectors/path';
import { setPath } from '../actions/path';

export class AppPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userApps: this.props.userApps,
            path: this.props.path,
            selectPath: this.props.history.location.pathname
        };
        this.props.setPath(this.props.history.location.pathname);
    }
    componentWillReceiveProps(nextProps) {
        const correctPath = selectPath(nextProps.path, nextProps.userApps);
        if (nextProps.userApps !== this.state.userApps) {
            this.setState({ selectPath: correctPath });
        }
    };

    componentDidMount() {
        this.props.setPath(this.props.history.location.pathname);
        const correctPath = selectPath(this.props.history.location.pathname, this.state.userApps);
        this.setState({ selectPath: correctPath });
    }
    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    {
                        this.state.selectPath !== '/' ? (
                            <h1 className="page-header__title">Welcome to app {this.props.match.params.appName}.</h1>
                        ) : (
                                <h1 className="page-header__title"><Link to="/">Go home</Link> You don't have permission this app {this.props.match.params.appName}.</h1>

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
        path: state.path
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPath: (path) => dispatch(setPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
