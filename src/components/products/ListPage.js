import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import ListItem from './ListItem';
import { setTitle } from '../../actions/sys';
import OrderForm from './OrderForm';
export class ListProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: props.products,
            datas: [],
            rowsNo: 0,
            sizeTile: 3,
            productsCount: 0
        };
        this.props.setTitle('ลายสินค้า');
        // console.log(this.props.listProducts());
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.products != this.state.products) {
            this.sliceArray(nextProps.products);
        }
    }
    componentWillMount = () => {
        this.sliceArray(this.state.products);
    }
    sliceArray = (products) => {
        // const rowsNo = Math.floor(Math.sqrt(products.length));
        // const rowsCount = Math.ceil(products.length / rowsNo);
        const rowsCount = 3;
        let datas = [];
        for (var i = 0; i < products.length; i += rowsCount) {
            datas.push(products.slice(i, i + rowsCount));
        }
        this.setState(() => ({
            products,
            datas
        }))
    }
    render() {
        return (
            <div className="container">
                {
                    this.state.datas.map((products, key) => {
                        return (
                            <nav key={key} className="tile is-ancestor level">
                                {
                                    products.map((product) => {
                                        return (
                                            <div key={product.id} className="tile is-parent is-2 level-item">
                                                <article className="tile is-child box">
                                                    <nav className="level is-grouped is-grouped-multiline">
                                                        <div className="title">id:{product.id}</div>

                                                        <div className="control">
                                                            <div className="tags has-addons">
                                                                <span className="tag is-dark">Liked</span>
                                                                <span className="tag is-info">98</span>
                                                            </div>
                                                        </div>
                                                        <div className="control">
                                                            <div className="tags has-addons">
                                                                <span className="tag is-dark">Ordered</span>
                                                                <span className="tag is-success">1,234</span>
                                                            </div>
                                                        </div>

                                                    </nav>
                                                    <div className="column has-text-centered">
                                                        <figure className="image is-1by1">
                                                            <img src={product.downloadURLs[0]} />
                                                        </figure>
                                                    </div>
                                                    <div className="content">
                                                        <OrderForm />
                                                    </div>
                                                </article>
                                            </div>
                                        )
                                    })
                                }
                            </nav>
                        )
                    })
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    products: state.products
});
const mapDispatchToProps = (dispatch, props) => ({
    setTitle: (title) => dispatch(setTitle(title))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
