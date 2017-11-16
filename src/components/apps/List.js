import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { addUserApp, removeUserApp } from '../../actions/users';
import selectApps from '../../selectors/apps';

export class ListApps extends React.Component {
    onAddUserApp = (app) => {
        this.props.addUserApp(this.props.idcard, app);
    };
    onRemoveUserApp = (appId) => {
        this.props.removeUserApp(this.props.idcard, appId);
    };
    render() {
        return (
            <div className="content-container">
                <div className="list-header">
                    <div className="show-for-mobile">Apps</div>
                    <div className="show-for-desktop">แอพพลิเคชั่น</div>
                    <div className="show-for-desktop">สถานะ</div>
                </div>
                <div className="list-body">
                    {
                        this.props.apps.length === 0 ? (
                            <div className="list-item list-item--message">
                                <span>ไม่มีแอพพลิเคชั่น</span>
                            </div>
                        ) : (
                                this.props.apps.map((app) => {
                                    return <ListItem key={app.id} app={app} onAddUserApp={this.onAddUserApp} onRemoveUserApp={this.onRemoveUserApp} />;
                                })
                            )
                    }
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        apps: state.apps,
        idcard: state.auth.idcard
    };
};
const mapDispatchToProps = (dispatch, props) => ({
    addUserApp: (idcard, app) => dispatch(addUserApp(idcard, app)),
    removeUserApp: (idcard, appId) => dispatch(removeUserApp(idcard, appId))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListApps);
