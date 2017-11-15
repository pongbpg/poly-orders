import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions/users';

export class IDCardPage extends React.Component {
    state = {
        idcard: ''
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addUser(this.props.uid, this.state.idcard, this.props.providerData);
        // this.props.updateIdCard(this.props.uid, this.state.idcard);
        this.props.history.push('/');
    };
    onIdCardChange = (e) => {
        const idcard = e.target.value;
        this.setState(() => ({ idcard }));
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">ลงทะเบียน : {this.props.providerData.displayName}</h1>
                    </div>
                </div>
                <div className="content-container">
                    <form className="form" onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder="รหัสประชาชน"
                            autoFocus
                            className="text-input"
                            value={this.state.idcard}
                            onChange={this.onIdCardChange}
                        />
                        <button className="button">บันทึก</button>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    uid: state.auth.uid,
    providerData: state.auth.providerData
});
const mapDispatchToProps = (dispatch) => ({
    addUser: (registerId, idcard, providerData) => dispatch(addUser(registerId, idcard, providerData)),
    // updateIdCard: (uid, idcard) => dispatch(updateIdCard(uid, idcard))
});

export default connect(mapStateToProps, mapDispatchToProps)(IDCardPage);
