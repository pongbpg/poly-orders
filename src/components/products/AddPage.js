import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './Form';
import { addProduct } from '../../actions/product';
import { setTitle } from '../../actions/sys';
export class AddPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.setTitle('เพิ่มรายการสินค้า')
    }
    onSubmit = (product) => {
        this.props.addProduct(product)
            .then((snapshot) => {
                this.props.history.push('/products');
            });
    };
    render() {
        return (
            <div>
                <ProductForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addProduct: (product) => dispatch(addProduct(product)),
    setTitle: (title) => dispatch(setTitle(title))
});

export default connect(undefined, mapDispatchToProps)(AddPage);