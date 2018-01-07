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
        return (
            <div className="column is-8 is-offset-2">
                <table className="table is-bordered is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>รหัสประชาชน</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.users.map((user, index) => {
                                return <ListItem
                                    key={user.idcard}
                                    index={index}
                                    user={user}
                                    onAddRoleAdmin={this.onAddRoleAdmin}
                                    onAddRoleUser={this.onAddRoleUser}
                                />;
                            })
                        }
                    </tbody>
                </table>
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
