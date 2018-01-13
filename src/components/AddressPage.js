import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { login, updateMember } from '../actions/auth';
import { setTitle } from '../actions/sys';
export class AddressPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.uid);
        this.state = {
            name: props.providerData.name || '',
            address: props.providerData.address || '',
            postcode: props.providerData.postcode || '',
            mobileNumber: props.providerData.mobileNumber || '',
            reqName: props.providerData.name ? false : true,
            reqAddress: props.providerData.address ? false : true,
            reqPostCode: props.providerData.postcode ? false : true,
            reqPhone: props.providerData.mobileNumber ? false : true,
            submited: false
        };
        this.props.setTitle('ลงทะเบียนชื่อและที่จัดส่งสินค้า');
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.reqName && !this.state.reqAddress && !this.state.reqPostCode && !this.state.reqPhone) {
            const data = {
                name: this.state.name,
                address: this.state.address,
                postcode: this.state.postcode,
                mobileNumber: this.state.mobileNumber
            };
            this.setState(() => ({
                submited: true
            }));
            this.props.updateMember(this.props.uid, data)
                .then(() => {
                    this.props.login(this.props.uid, data, { hasAddress: true });
                    this.props.history.push('/products');
                });
        } else {
            console.log('error', this.state);
        }

    };
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({
            name,
            reqName: name == ''
        }));
    };

    onAddressChange = (e) => {
        const address = e.target.value;
        this.setState(() => ({
            address,
            reqAddress: address == ''
        }));
    };
    onPostCodeChange = (e) => {
        const postcode = e.target.value;
        this.setState(() => ({
            postcode,
            reqPostCode: postcode == ''
        }));
    };
    onMobileNumberChange = (e) => {
        const mobileNumber = e.target.value;
        this.setState(() => ({
            mobileNumber,
            reqPhone: mobileNumber == ''
        }));
    };
    render() {
        return (
            <div className="column">
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="field is-horizontal">
                        <div className="field-label is-medium">
                            <label className="label">ชื่อผู้รับสินค้า :</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        autoFocus
                                        className={`input is-medium ${this.state.reqName === true ? "is-danger" : ""}`}
                                        type="text"
                                        placeholder="ชื่อ-นามสกุล"
                                        value={this.state.name}
                                        onChange={this.onNameChange}
                                    />
                                </div>
                                {this.state.reqName === true && <p className="help is-danger">This field is required</p>}
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-medium">
                            <label className="label">ที่อยู่ :</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <textarea
                                        style={{ minHeight: 150 }}
                                        className={`input is-medium  ${this.state.reqAddress === true ? "is-danger" : ""}`}
                                        placeholder="สำหรับจัดส่งสินค้า"
                                        value={this.state.address}
                                        onChange={this.onAddressChange}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-medium">
                            <label className="label">รหัสไปรษณีย์ :</label>
                        </div>
                        <div className="field-body">
                            {/* <div className="field"> */}
                            <div className="control">
                                <input
                                    className={`input is-medium  ${this.state.reqPostCode === true ? "is-danger" : ""}`}
                                    type="text"
                                    placeholder="รหัสไปรษณีย์"
                                    name="postcode"
                                    value={this.state.postcode}
                                    onChange={this.onPostCodeChange}
                                />
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-medium">
                            <label className="label">เบอร์ติดต่อ :</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        className={`input is-medium  ${this.state.reqPhone === true ? "is-danger" : ""}`}
                                        type="text"
                                        placeholder="ติดต่อกรณีมีปัญหาอื่นๆ เช่น ของส่งกลับ เป็นต้น"
                                        value={this.state.mobileNumber}
                                        onChange={this.onMobileNumberChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label">
                            {/*Left empty for spacing */}
                        </div>
                        <div className="field-body">
                            <div className="field is-grouped">
                                <div className="control">
                                    <button className={`button is-primary ${this.state.submited === true ? "disabled" : ""}`}>บันทึก</button>
                                </div>
                                <div className="control">
                                    <Link className="button is-danger is-link" to="/">ยกเลิก</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form >
            </div >
        );
    }
}
const mapStateToProps = (state) => ({
    uid: state.auth.uid,
    providerData: state.auth.providerData
});
const mapDispatchToProps = (dispatch) => ({
    // addUser: (registerId, name, providerData, upis) => dispatch(addUser(registerId, name, providerData, upis)),
    setTitle: (title) => dispatch(setTitle(title)),
    updateMember: (uid, data) => dispatch(updateMember(uid, data)),
    login: (uid, data, hasAddress) => dispatch(login(uid, data, hasAddress))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressPage);
