import React from 'react';
import { connect } from 'react-redux';
import ListUsers from './List';
import { setTitle } from '../../actions/sys';
class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.setTitle('รายการผู้ใช้งาน')
    }
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

const mapDispatchToProps = (dispatch) => ({
    setTitle: (title) => dispatch(setTitle(title))
});
export default connect(undefined, mapDispatchToProps)(UsersPage);