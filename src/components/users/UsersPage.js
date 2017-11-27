import React from 'react';
import { connect } from 'react-redux';
import ListUsers from './List';

class UsersPage extends React.Component {
    render() {
        const marginTop = {
            marginTop: '20px'
        };
        return (
            <div style={marginTop}>
                <ListUsers />
            </div>
        )
    }
}

export default connect()(UsersPage);