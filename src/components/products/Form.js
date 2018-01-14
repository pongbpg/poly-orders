import { Link } from 'react-router-dom';
import React from 'react';
import Dropzone from 'react-dropzone'
// import { storage } from '../../firebase/firebase';

export default class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            productCode: props.product ? props.product.productCode : '',
            productImage: {}
        };
    }
    onFilesDrop = (files) => {
        if (files[0] && files[0].type.indexOf('image') > -1) {
            const productImage = files[0];
            this.setState(() => ({ productImage }));
        } else {
            this.setState(() => ({ productImage: {} }));
        }
    };
    onProductCodeChange = (e) => {
        const productCode = e.target.value;
        this.setState(() => ({ productCode }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.productCode) {
            this.productCode.focus();
        } else if (!this.state.productImage) {
            alert('please select file upload');
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                productCode: this.state.productCode,
                productImage: this.state.productImage
            });
        }
    };
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">รหัสสินค้า :</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text"
                                    placeholder="ชื่อสินค้า"
                                    value={this.state.productCode}
                                    onChange={this.onProductCodeChange}
                                    ref={(c) => { this.productCode = c; }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">ภาพสินค้า :</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="file has-name is-fullwidth">
                                <label className="file-label">
                                    <Dropzone onDrop={this.onFilesDrop} className="file-input">
                                        {/* <div>Drag and drop files here or click to select</div> */}
                                    </Dropzone>
                                    <span className="file-cta">
                                        <span className="file-label">เลือกไฟล์</span>
                                    </span>
                                    <span className="file-name">{this.state.productImage.name ? this.state.productImage.name : ''}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Preview:</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <figure className="image is-1by1">
                                <img src={this.state.productImage.preview ? this.state.productImage.preview : 'https://bulma.io/images/placeholders/128x128.png'} />
                            </figure>
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
                                <Link className="button is-danger is-link" to="/products">ยกเลิก</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        );
    }
};