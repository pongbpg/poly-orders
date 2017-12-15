import { Link } from 'react-router-dom';
import React from 'react';

export default class AppForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            appName: '',
            domainName: '',
            callbackUrl: '',
            securityKey: 'auth@kmutnb'
        };
    }
    onAppNameChange = (e) => {
        const appName = e.target.value;
        this.setState(() => ({
            appName
        }));
    };
    onDomainNameChange = (e) => {
        const domainName = e.target.value;
        this.setState(() => ({ domainName }));
    };
    onCallbackUrlChange = (e) => {
        const callbackUrl = e.target.value;
        this.setState(() => ({ callbackUrl }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.appName || !this.state.domainName || !this.state.callbackUrl) {
            this.setState(() => ({ error: 'Please provide app name.' }));
            this.appName.focus();
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                appName: this.state.appName,
                domainName: this.state.domainName,
                callbackUrl: this.state.callbackUrl,
                securityKey: 'auth@kmutnb'
            });
        }
    };
    render() {
        return (
            // <form className="form" onSubmit={this.onSubmit}>
            //     {this.state.error && <p className="form__error">{this.state.error}</p>}
            //     <input
            //         type="text"
            //         placeholder="App Name"
            //         autoFocus
            //         className="text-input"
            //         value={this.state.appName}
            //         onChange={this.onAppNameChange}
            //         ref={(c) => { this.appName = c; }}
            //     />
            //     <input
            //         type="text"
            //         className="text-input"
            //         placeholder="Domain Name"
            //         value={this.state.domainName}
            //         disabled
            //     // onChange={this.onDomainNameChange}
            //     />
            //     <input
            //         type="text"
            //         placeholder="Callback URL"
            //         className="text-input"
            //         value={this.state.callbackUrl}
            //         disabled
            //     // onChange={this.onCallbackUrlChange}
            //     />
            //     <button className="button">Save</button>
            // </form>
            <form className="form" onSubmit={this.onSubmit}>
                <div className="column is-8 is-offset-2">
                    <div className="field">
                        <label className="label">ชื่อแอพพลิเคชั่น</label>
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
                    <div className="field">
                        <label className="label">ชื่อโดเมน</label>
                        <div className="control">
                            <input className="input" type="text"
                                placeholder="www.test.com"
                                value={this.state.domainName}
                                onChange={this.onDomainNameChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Callback URL</label>
                        <div className="control">
                            <input className="input" type="text"
                                placeholder="www.test.com/callback?token=xxx"
                                value={this.state.callbackUrl}
                                onChange={this.onCallbackUrlChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">รายละเอียด</label>
                        <div className="control">
                            <textarea className="textarea" placeholder="ยังไม่ต้องใส่หรอก ไม่ได้เก็บอะไร"></textarea>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">เพิ่ม</button>
                        </div>
                        <div className="control">
                            <Link className="button is-danger is-link" to="/">ยกเลิก</Link>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
};