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
        const color = ['primary', 'warning', 'info', 'danger', 'success'];
        const colorRandom = color[Math.floor(Math.random() * color.length)];
        return (
            // <div className="list-item">
            //     <div>
            //         <Link to={this.state.callbackUrl}>
            //             <h3 className="list-item__title">{this.state.appName.toUpperCase()}</h3>
            //         </Link>
            //         <span className="list-item__sub-title">{this.state.domainName}</span>
            //     </div>
            //     {
            //         this.state.hasSelected === true ? (
            //             <button className="button button--secondary" onClick={this.onRemoveUserApp}>ยกเลิกใช้งาน</button>
            //         ) : (
            //                 <button className="button" onClick={this.onAddUserApp}>สมัครใช้งาน</button>
            //             )
            //     }
            // </div>
            <div className={`tile is-parent is-${this.props.size}`}>
                <article className={`tile is-child notification is-${colorRandom}`}>
                    {/* <p className="title"></p> */}
                    <p className="subtitle">{this.state.appName.toUpperCase()}</p>
                    <figure className="image is-128x128 is-center">
                        <img src="https://bulma.io/images/placeholders/128x128.png" />
                    </figure>
                    <div className="content">
                        <Link to={this.state.callbackUrl}><span className="is-small">{this.state.domainName}</span></Link>
                    </div>
                    <div className="field">
                        {
                            this.state.hasSelected === true ? (
                                <button className="button is-danger is-inverted is-hovered" onClick={this.onRemoveUserApp}>ยกเลิกใช้งาน</button>
                            ) : (
                                    <button className="button is-info is-inverted" onClick={this.onAddUserApp}>สมัครใช้งาน</button>
                                )
                        }
                    </div>
                </article>
            </div>
        );
    }
}


