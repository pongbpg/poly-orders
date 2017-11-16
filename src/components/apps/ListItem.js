import React from 'react';
import { Link } from 'react-router-dom';
export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appId: props.app.id,
            appName: props.app.appName,
            domainName: props.app.domainName,
            callbackUrl: props.app.callbackUrl,
            hasSelected: props.app.hasSelected
        };
    }
    onAddUserApp = () => {
        this.props.onAddUserApp({
            appId: this.state.appId,
            appName: this.state.appName,
            domainName: this.state.domainName,
            callbackUrl: this.state.callbackUrl
        });
    };
    onRemoveUserApp = () => {
        this.props.onRemoveUserApp(this.state.appId);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.app.hasSelected !== this.state.hasSelected) {
            this.setState({ hasSelected: nextProps.app.hasSelected });
        }
    };

    render() {
        return (
            <div className="list-item">
                <div>
                    <h3 className="list-item__title">{this.state.appName.toUpperCase()}</h3>
                    <span className="list-item__sub-title">{this.state.domainName}</span>
                </div>
                {
                    this.state.hasSelected === true ? (
                        <button className="button button--secondary" onClick={this.onRemoveUserApp}>ยกเลิกใช้งาน</button>
                    ) : (
                            <button className="button" onClick={this.onAddUserApp}>สมัครใช้งาน</button>
                        )
                }
            </div>
        );
    }
}


