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
        const token = true ? jwt.sign({ appId: this.state.appId, callbackUrl: this.state.callbackUrl, idcard: this.state.idcard }, 'auth@kmutnb') : '';
        // console.log(token);
        return (
            <div className={`tile is-parent is-${this.props.size}`}>
                <article className={`tile is-child notification`}>
                    <p className="title">
                        <a href={"https://" + this.state.callbackUrl + "?token=" + token}><span className="is-small">{this.state.appName.toUpperCase()}</span></a>
                    </p>
                    {/* <p className="subtitle">{this.state.appName.toUpperCase()}</p> */}
                    {/* <figure className="image is-128x128 is-center">
                        <img src="https://bulma.io/images/placeholders/128x128.png" />
                    </figure> */}
                    {/* <div className="content">
                        {`const config ={ appId : '${this.state.appId}', 
                        appName:'${this.state.appName}', 
                        domainName:'${this.state.domainName}', 
                        callbackUrl:'${this.state.callbackUrl}',
                        securityKey:'auth@kmutnb',
                        authDomain:'kmutnb-auth.herokuapp.com/callback/'
                        }`}
                    </div> */}
                    <div className="card">
                        <div className="card-content">
                            <p className="title">Node.js</p>
                            <p className="subtitle">npm install jsonwebtoken</p>
                        </div>
                        <footer className="card-footer">
                            <p className="card-footer-item">
                                <code>const jwt = require('jsonwebtoken');
                                <br />
                                    {`const config ={ appId : '${this.state.appId}', 
                        appName:'${this.state.appName}', 
                        domainName:'${this.state.domainName}', 
                        callbackUrl:'${this.state.callbackUrl}',
                        securityKey:'auth@kmutnb',
                        authDomain:'kmutnb-auth.herokuapp.com/callback/'
                        }`}
                        <br />
                        {
                            'jwt.verify(request.query.token, config.securityKey, function (err, decoded) {'+
                                'if (err) {'+
                                    'response.redirect(`http://${config.authDomain}${config.callbackUrl}/${config.appId}`);'+
                                '} else {'+
                                    'if (decoded.appId === config.appId) {'+
                                        'response.redirect(`/?token=${request.query.token}`);'+
                                    '} else {'+
                                        'response.redirect(`http://${config.authDomain}${config.callbackUrl}/${config.appId}`);'+
                                    '}'+
                               '}'+
                            '});'
                        }
                                </code>
                            </p>
                        </footer>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <p className="title">PHP</p>
                            <p className="subtitle"><a href="https://github.com/firebase/php-jwt">composer require firebase/php-jwt</a></p>
                        </div>
                        <footer className="card-footer">
                            <p className="card-footer-item">
                                <code>
                                {
                                    `<?php
                                        use \Firebase\JWT\JWT;


                                        $config = array(
                                            "appId" => "-L0Oosr9HzBOfUP2kOdW",
                                            "appName"=>"สวัสดิการ",
                                            "domainName"=>"localhost:3000", 
                                            "callbackUrl"=>"localhost:3000/api/auth",
                                            "securityKey"=>"auth@kmutnb",
                                            "authDomain"=>"kmutnb-auth.herokuapp.com/callback/"
                                        );

                                        $decoded = JWT::decode($_GET["token"], $config["securityKey"], array('HS256'));

                                        if($decoded["appId"]===$config["appId"]){
                                            echo 'authen ok';
                                        }else{
                                            echo 'authen fail';
                                        }

                                        ?>`
                                    }
                                </code>
                            </p>
                        </footer>
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


