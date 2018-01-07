import React from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appId: props.app.id,
            appName: props.app.appName,
            domainName: props.app.domainName,
            callbackUrl: props.app.callbackUrl,
            hasSelected: props.app.hasSelected,
            idcard: props.idcard
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
        const color = ['primary', 'warning', 'info', 'danger', 'success'];
        const colorRandom = color[Math.floor(Math.random() * color.length)];
        const token = true ? jwt.sign({ appId: this.state.appId, callbackUrl: this.state.callbackUrl, idcard: this.state.idcard }, 'auth@kmutnb', { expiresIn: '1d' }) : '';
        // console.log(token);
        return (
            <div className={`tile is-parent is-${this.props.size}`}>
                <article className={`tile is-child notification`}>
                    <p className="title">
                        <a href={"http://" + this.state.callbackUrl + "?token=" + token}><span className="is-small">{this.state.appName.toUpperCase()}</span></a>
                    </p>
                    {/* <p className="subtitle">{this.state.appName.toUpperCase()}</p> */}
                    {/* <figure className="image is-128x128 is-center">
                        <img src="https://bulma.io/images/placeholders/128x128.png" />
                    </figure> */}
                    <div className="content">
                        {`{ appId : '${this.state.appId}', 
                        appName:'${this.state.appName}', 
                        domainName:'${this.state.domainName}', 
                        callbackUrl:'${this.state.callbackUrl}',
                        secretKey:'auth@kmutnb',
                        authDomain:'kmutnb-auth.herokuapp.com/callback/'
                        }`}
                    </div>

                    {/* <div className="field">
                        {
                            this.state.hasSelected === true ? (
                                <button className="button is-danger is-hovered" onClick={this.onRemoveUserApp}>ยกเลิกใช้งาน</button>
                            ) : (
                                    <button className="button is-info is-hovered" onClick={this.onAddUserApp}>สมัครใช้งาน</button>
                                )
                        }
                    </div> */}
                </article>
            </div>
        );
    }
}


