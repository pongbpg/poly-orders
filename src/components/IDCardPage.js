import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions/users';
import { setTitle } from '../actions/sys';
export class IDCardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idcard: '',
            isRequire: false
        };
        this.props.setTitle('ลงทะเบียนยืนยันตัวตน');
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.idcard !== '') {
            this.props.addUser(this.props.uid, this.state.idcard, this.props.providerData);
            // this.props.updateIdCard(this.props.uid, this.state.idcard);
            this.props.history.push('/');
        } else {
            this.setState(() => ({
                isRequire: true
            }))
        }

    };
    onIdCardChange = (e) => {
        const idcard = e.target.value;
        this.setState(() => ({
            idcard,
            isRequire: idcard !== '' ? false : true
        }));
    };
    render() {
        return (
            // <div>
            //     <div className="page-header">
            //         <div className="content-container">
            //             <h1 className="page-header__title">ลงทะเบียน : {this.props.providerData.displayName}@{this.props.providerData.providerId}</h1>
            //         </div>
            //     </div>
            //     <div className="content-container">
            //         <form className="form" onSubmit={this.onSubmit}>
            //             <input
            //                 type="text"
            //                 placeholder="รหัสประชาชน"
            //                 autoFocus
            //                 className="text-input"
            //                 value={this.state.idcard}
            //                 onChange={this.onIdCardChange}
            //             />
            //             <button className="button">บันทึก</button>
            //         </form>
            //     </div>
            // </div>
            <div className="column is-8 is-offset-2">
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">รหัสประชาชน :</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        autoFocus
                                        className={`input ${this.state.isRequire === true?"is-danger":""}`}
                                        type="text"
                                        placeholder="รหัสประชาชน"
                                        value={this.state.idcard}
                                        onChange={this.onIdCardChange}
                                    />
                                </div>
                                {this.state.isRequire === true && <p className="help is-danger">This field is required</p>}
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label">
                            {/*Left empty for spacing */}
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary">บันทึก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
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
    setTitle: (title) => dispatch(setTitle(title))
    // updateIdCard: (uid, idcard) => dispatch(updateIdCard(uid, idcard))
});

export default connect(mapStateToProps, mapDispatchToProps)(IDCardPage);
