import { Link } from 'react-router-dom';
import React from 'react';

export default class AppForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            appName: props.app ? props.app.appName : '',
            domainName: props.app ? props.app.domainName : '',
            callbackUrl: props.app ? props.app.callbackUrl : '',
            callbackProtocol: props.app ? props.app.callbackProtocol : 'http',
            adminApprove: props.app ? props.app.adminApprove : false,
            isActive: props.app ? props.app.isActive : true,
            secretKey: props.app ? props.app.secretKey : ''
        };
    }
    onAppNameChange = (e) => {
        const appName = e.target.value;
        this.setState(() => ({ appName }));
    };
    onDomainNameChange = (e) => {
        const domainName = e.target.value;
        this.setState(() => ({ domainName }));
    };
    onCallbackProtocolChange = (e) => {
        const callbackProtocol = e.target.value;
        this.setState(() => ({ callbackProtocol }));
    };
    onCallbackUrlChange = (e) => {
        const callbackUrl = e.target.value;
        this.setState(() => ({ callbackUrl }));
    };
    onSecretKeyChange = (e) => {
        const secretKey = e.target.value;
        this.setState(() => ({ secretKey }));
    };
    onAdminApproveChange = (e) => {
        const adminApprove = e.target.checked;
        this.setState(() => ({ adminApprove }));
    };
    onIsActiveChange = (e) => {
        const isActive = e.target.checked;
        this.setState(() => ({ isActive }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.appName) {
            this.appName.focus();
        } else if (!this.state.domainName) {
            this.domainName.focus();
        } else if (!this.state.callbackUrl) {
            this.callbackUrl.focus();
        } else if (!this.state.secretKey) {
            this.secretKey.focus();
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                appName: this.state.appName,
                domainName: this.state.domainName,
                callbackUrl: this.state.callbackUrl,
                callbackProtocol: this.state.callbackProtocol,
                adminApprove: this.state.adminApprove,
                isActive: this.state.isActive,
                secretKey: this.state.secretKey
            });
        }
    };
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">APP NAME :</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text"
                                    type="text"
                                    placeholder="แอพพลิเคชั่น"
                                    autoFocus
                                    value={this.state.appName}
                                    onChange={this.onAppNameChange}
                                    ref={(c) => { this.appName = c; }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">DOMAIN NAME :</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text"
                                    placeholder="www.test.com"
                                    value={this.state.domainName}
                                    onChange={this.onDomainNameChange}
                                    ref={(c) => { this.domainName = c; }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">CALLBACK URL :</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-grouped">
                            <div className="control">
                                <div className="select">
                                    <select className="is-hovered" value={this.state.callbackProtocol} onChange={this.onCallbackProtocolChange}>
                                        <option value="http">http</option>
                                        <option value="https">https</option>
                                    </select>
                                </div>
                            </div>
                            <div className="control is-expanded">
                                <input className="input" type="text"
                                    placeholder="www.test.com/callback?token=xxx"
                                    value={this.state.callbackUrl}
                                    onChange={this.onCallbackUrlChange}
                                    ref={(c) => { this.callbackUrl = c; }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">SECRET KEY :</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text"
                                    placeholder="auth@kmutnb"
                                    value={this.state.secretKey}
                                    onChange={this.onSecretKeyChange}
                                    ref={(c) => { this.secretKey = c; }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">REGISTER :</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <label className="checkbox">
                                <input type="checkbox" onChange={this.onAdminApproveChange} checked={this.state.adminApprove} /> Admin อนุมัติ
                            </label>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">ACTIVE :</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <label className="checkbox">
                                <input type="checkbox" onChange={this.onIsActiveChange} checked={this.state.isActive} /> เปิดใช้งาน
                            </label>
                        </div>
                    </div>
                </div>
                {/* <div className="field">
                        <label className="label">รายละเอียด</label>
                        <div className="control">
                            <textarea className="textarea" placeholder="ยังไม่ต้องใส่หรอก ไม่ได้เก็บอะไร"></textarea>
                        </div>
                    </div> */}
                <div className="field is-horizontal">
                    <div className="field-label"></div>
                    <div className="field-body">
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">บันทึก</button>
                            </div>
                            <div className="control">
                                <Link className="button is-danger is-link" to="/apps">ยกเลิก</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        );
    }
};