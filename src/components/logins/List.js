import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';

export class ListLogins extends React.Component {
    render() {
        return (
            <div className="content-container">
                <div className="list-header">
                    <div className="show-for-mobile">ผู้ให้บริการ</div>
                    <div className="show-for-desktop">ผู้ให้บริการ</div>
                    <div className="show-for-desktop">ชื่อ/อีเมลล์</div>
                </div>
                <div className="list-body">
                    {
                        this.props.logins.length === 0 ? (
                            <div className="list-item list-item--message">
                                <span>ไม่มีผู้ให้บริการ</span>
                            </div>
                        ) : (
                                this.props.logins.map((user) => {
                                    return <ListItem key={user.uid} user={user} loginId={this.props.loginId} />;
                                })
                            )
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        logins: state.user.logins ? state.user.logins : [],
        loginId: state.auth.providerData.uid
    };
};
export default connect(mapStateToProps)(ListLogins);