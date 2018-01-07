import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions/users';
import { setTitle } from '../actions/sys';
export class IDCardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idcard: '4209900002904',
            year: '1948',
            month: '08',
            date: '02',
            reqIdcard: false,
            reqDob: false
        };
        this.props.setTitle('ลงทะเบียนยืนยันตัวตน');
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.idcard === '') {
            this.setState(() => ({
                reqIdcard: true
            }));
        } else if (this.state.year.length !== 4 || this.state.month.length !== 2 || this.state.date.length !== 2) {
            this.setState(() => ({
                reqDob: true
            }));
        } else {
            //chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
            const dob = this.state.year + '-' + this.state.month + '-' + this.state.date;
            // this.props.addUser(this.props.uid, this.state.idcard, dob, this.props.providerData);
            // this.props.history.push('/');
            fetch(`http://api.upis.kmutnb.ac.th/api/personnel/getListOfPersonnel/pid/${this.state.idcard}`)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    if (data.ListOfPersonnel.count > 0) {
                        if (data.ListOfPersonnel.PersonnelInfo[0].birthdate === dob) {
                            this.props.addUser(this.props.uid, this.state.idcard, this.props.providerData, data.ListOfPersonnel.PersonnelInfo[0]);
                            this.props.history.push('/');
                        } else {
                            this.setState(() => ({
                                reqDob: true
                            }));
                        }
                    } else {
                        this.setState(() => ({
                            reqIdcard: true
                        }));
                    }
                })
        }

    };
    onIdCardChange = (e) => {
        const idcard = e.target.value;
        this.setState(() => ({
            idcard,
            reqIdcard: idcard !== '' ? false : true
        }));
    };

    onDobChange = (e) => {
        const obj = { [e.target.name]: e.target.value };
        const checkLength = e.target.value.length === e.target.maxLength;
        this.setState(() => ({
            ...obj,
            reqDob: !checkLength
        }));
    };
    render() {
        return (
            <div className="column">
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
                                        className={`input ${this.state.reqIdcard === true ? "is-danger" : ""}`}
                                        type="text"
                                        placeholder="รหัสประชาชน"
                                        value={this.state.idcard}
                                        onChange={this.onIdCardChange}
                                    />
                                </div>
                                {this.state.reqIdcard === true && <p className="help is-danger">This field is required</p>}
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">วันเกิด (ปี-เดือน-วัน) :</label>
                        </div>
                        <div className="field-body">
                            <div className="field is-grouped">
                                <div className="control">
                                    <input
                                        className={`input  ${this.state.reqDob === true ? "is-danger" : ""}`}
                                        type="number"
                                        placeholder="ปี ค.ศ."
                                        maxLength={4}
                                        name="year"
                                        value={this.state.year}
                                        onChange={this.onDobChange}
                                    />
                                </div>
                                <div className="control">
                                    <input
                                        className={`input ${this.state.reqDob === true ? "is-danger" : ""}`}
                                        type="number"
                                        placeholder="เดือน"
                                        maxLength={2}
                                        name="month"
                                        value={this.state.month}
                                        onChange={this.onDobChange}
                                    />
                                </div>
                                <div className="control">
                                    <input
                                        className={`input ${this.state.reqDob === true ? "is-danger" : ""}`}
                                        type="number"
                                        placeholder="วัน"
                                        maxLength={2}
                                        name="date"
                                        value={this.state.date}
                                        onChange={this.onDobChange}
                                    />
                                </div>
                            </div>
                            {this.state.reqDob === true && <p className="help is-danger">This field is wrong format YYYY-MM-DD!</p>}
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
    addUser: (registerId, idcard, providerData, upis) => dispatch(addUser(registerId, idcard, providerData, upis)),
    setTitle: (title) => dispatch(setTitle(title))
    // updateIdCard: (uid, idcard) => dispatch(updateIdCard(uid, idcard))
});

export default connect(mapStateToProps, mapDispatchToProps)(IDCardPage);
