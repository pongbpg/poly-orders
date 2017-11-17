import React from 'react';

export default class AppForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            appName: '',
            domainName: '',
            callbackUrl: ''
        };
    }
    onAppNameChange = (e) => {
        const appName = e.target.value;
        const domainName = appName === '' ? '' : `http://${window.location.host}/app/${appName.toLowerCase()}`;
        const callbackUrl = appName === '' ? '' : `/app/${appName.toLowerCase()}`;
        this.setState(() => ({
            appName,
            domainName,
            callbackUrl
        }));
    };
    // onDomainNameChange = (e) => {
    //     const domainName = e.target.value;
    //     this.setState(() => ({ domainName, callbackUrl: domainName + '/callback' }));
    // };
    // onCallbackUrlChange = (e) => {
    //     const callbackUrl = e.target.value;
    //     this.setState(() => ({ callbackUrl }));
    // };
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
            });
        }
    };
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="App Name"
                    autoFocus
                    className="text-input"
                    value={this.state.appName}
                    onChange={this.onAppNameChange}
                    ref={(c) => { this.appName = c; }}
                />
                <input
                    type="text"
                    placeholder="Domain Name"
                    className="text-input"
                    value={this.state.domainName}
                    disabled
                // onChange={this.onDomainNameChange}
                />
                <input
                    type="text"
                    placeholder="Callback URL"
                    className="text-input"
                    value={this.state.callbackUrl}
                    disabled
                // onChange={this.onCallbackUrlChange}
                />
                <button className="button">Save</button>
            </form>
        );
    }
};