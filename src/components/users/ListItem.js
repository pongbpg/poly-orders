import React from 'react';
export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idcard: props.user.idcard,
            role: props.user.role,
            index: props.index
        };
    }
    onAddRoleAdmin = () => {
        this.props.onAddRoleAdmin(this.state.idcard);
    };
    onAddRoleUser = () => {
        this.props.onAddRoleUser(this.state.idcard);
    };

    componentWillReceiveProps(nextProps) {
        // console.log('next prop', nextProps.user);
        // console.log('this state', this.state)
        if (nextProps.user.role !== this.state.role) {
            this.setState({ role: nextProps.user.role });
        }
    };
    render() {
        return (
            // <div className="list-item">
            //     <div>
            //         <h3 className="list-item__title">{this.state.idcard.toUpperCase()}</h3>
            //     </div>
            //     {
            //         this.state.role === 'admin' ? (
            //             <button className="button button--secondary" onClick={this.onAddRoleUser}>Admin</button>
            //         ) : (
            //                 <button className="button" onClick={this.onAddRoleAdmin}>User</button>
            //             )
            //     }
            // </div>
            <tr>
                <td>{this.state.index + 1}</td>
                <th>
                    <h3 className="list-item__title">{this.state.idcard.toUpperCase()}</h3>
                </th>
                <td>
                    {
                        this.state.role === 'admin' ? (
                            <button className="button is-info" onClick={this.onAddRoleUser}>Admin</button>
                        ) : (
                                <button className="button" onClick={this.onAddRoleAdmin}>User</button>
                            )
                    }
                </td>
            </tr>
        );
    }
}


