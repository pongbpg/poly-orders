import React from 'react';
import { Link } from 'react-router-dom';
export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.user.uid,
            displayName: props.user.displayName,
            providerId: props.user.providerId,
            email: props.user.email,
            isCurrent: props.user.uid === props.loginId
        };
    }

    render() {
        return (
            <div className="list-item">
                <div>
                    <h3 className="list-item__title">{this.state.providerId} {this.state.isCurrent?"(loging)":""}</h3>
                    <span className="list-item__sub-title">uid:{this.state.uid}</span>
                </div>
                <div className="text-right">
                    <h3 className="list-item__title">{this.state.displayName}</h3>
                    <span className="list-item__sub-title">{this.state.email ? this.state.email : 'No Email'}</span>
                </div>
            </div>
        );
    }
}


