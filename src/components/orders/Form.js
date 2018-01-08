import { Link } from 'react-router-dom';
import React from 'react';

export default class AppForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            remark: props.order ? props.order.remark : '',
            amount: props.order ? props.order.amount : 1,
            sizes: props.order ? props.order.sizes : 'S'
        };
    }
    onRemarkChange = (e) => {
        const remark = e.target.value;
        this.setState(() => ({ remark }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        this.setState(() => ({ amount }));
    };
    onSizesChange = (e) => {
        const sizes = e.target.value;
        this.setState(() => ({ sizes }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.remark) {
            this.remark.focus();
        } else if (!this.state.amount) {
            this.amount.focus();
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                remark: this.state.remark,
                amount: this.state.amount,
                sizes: this.state.sizes
            });
        }
    };
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">ขนาด :</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-grouped">
                            <div className="control">
                                <div className="select">
                                    <select className="is-hovered" value={this.state.sizes} onChange={this.onSizesChange}>
                                        <option value="S">S กว้าง 32 ยาว 25</option>
                                        <option value="M">M กว้าง 36 ยาว 26</option>
                                        <option value="L">L กว้าง 40 ยาว 28</option>
                                        <option value="XL">XL กว้าง 44 ยาว 29</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">จำนวน :</label>
                    </div>
                    <div className="field-body">
                        <div className="field has-addons">
                            <div className="control">
                                <input className="input" type="text"
                                    placeholder="www.test.com"
                                    value={this.state.amount}
                                    onChange={this.onAmountChange}
                                    ref={(c) => { this.amount = c; }}
                                />
                            </div>
                            <p className="control">
                                <a className="button is-static">ตัว</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">รายละเอียดเพิ่มเติม* :</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <textarea className="textarea" placeholder="กรุณาอธิบายเพิ่มเติม เช่น ลาย 1234.pdf 10ตัว / ลาย 5678.pdf 5 ตัว เป็นต้น"
                                    value={this.state.remark}
                                    onChange={this.onRemarkChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label"></div>
                    <div className="field-body">
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">บันทึก</button>
                            </div>
                            <div className="control">
                                <Link className="button is-danger is-link" to="/">ยกเลิก</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        );
    }
};