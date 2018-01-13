import React from 'react';
import { Link } from 'react-router-dom';
import MdCheck from 'react-icons/lib/md/check';
import MdClose from 'react-icons/lib/md/close';
export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appId: props.app.id,
            appName: props.app.appName,
            isActive: props.app.isActive,
            index: props.index
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log('next prop', nextProps.user);
        // console.log('this state', this.state)
        // if (nextProps.user.role !== this.state.role) {
        //     this.setState({ role: nextProps.user.role });
        // }
    };
    render() {
        return (
            <tr>
                <td className="has-text-centered">{this.state.index + 1}</td>
                <th><h3>{this.state.appName.toUpperCase()}</h3></th>
                <td className="has-text-centered">{this.state.isActive ?
                    (<span className="icon has-text-success is-bol"><MdCheck /></span>)
                    : (<span className="icon has-text-danger"><MdClose /></span>)}</td>
                <td className="has-text-centered">
                    <Link className="button" to={`/apps/edit/${this.state.appId}`}>แก้ไข</Link>
                </td>
            </tr>
        );
    }
}


