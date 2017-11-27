import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { updateRole } from '../../actions/users';

export class ListApps extends React.Component {
    onAddRoleAdmin = (idcard) => {
        this.props.updateRole(idcard, 'admin');
    };
    onAddRoleUser = (idcard) => {
        this.props.updateRole(idcard, 'user');
    };
    render() {
        // console.log('list users');
        // console.log(this.props.users);
        return (
            <div className="content-container">
                <div className="list-header">
                    <div className="show-for-mobile">รหัสประชาชน</div>
                    <div className="show-for-desktop">รหัสประชาชน</div>
                    <div className="show-for-desktop">สถานะ</div>
                </div>
                <div className="list-body">
                    {
                        this.props.users.length === 0 ? (
                            <div className="list-item list-item--message">
                                <span>ไม่มีสมาชิก</span>
                            </div>
                        ) : (
                                this.props.users.map((user) => {
                                    return <ListItem
                                        key={user.idcard}
                                        user={user}
                                        onAddRoleAdmin={this.onAddRoleAdmin}
                                        onAddRoleUser={this.onAddRoleUser}
                                    />;
                                })
                            )
                    }
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    users: state.users
});
const mapDispatchToProps = (dispatch, props) => ({
    updateRole: (idcard, role) => dispatch(updateRole(idcard, role))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListApps);
