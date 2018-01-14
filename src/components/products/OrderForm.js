import React from 'react';

export default class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'white',
            size: 's',
            amount: 0
        }
    }

    onValueChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name == "amount") {
            value = Number(value);
        }
        this.setState(() => ({
            [name]: value
        }));
    }

    onSubmit = () => {
        console.log(this.state);
    }

    render() {
        return (
            <div className="field is-grouped">
                <div className="select">
                    <select value={this.state.color} name="color" onChange={this.onValueChange}>
                        <option value="white">ขาว</option>
                        <option value="grey">เทา</option>
                        <option value="base">เบจ</option>
                    </select>
                </div>
                <div className="select">
                    <select value={this.state.size} name="size" onChange={this.onValueChange}>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                    </select>
                </div>
                <input className="input" type="number" name="amount" placeholder="จำนวน" value={this.state.amount} onChange={this.onValueChange} />
                <a className="button is-danger" onClick={this.onSubmit}>สั่งซื้อ</a>
            </div>
        );
    }
};