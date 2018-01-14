import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { setTitle } from '../../actions/sys';
import { addLike, disLike, listProducts } from '../../actions/product';
import selectProducts from '../../selectors/products';
export class ListProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: props.products,
            datas: [],
            rowsNo: 0,
            sizeTile: 3,
            productsCount: 0,
            uid: props.uid
        };
        this.props.setTitle('เลือกลายเสื้อ');
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.products != this.state.products) {
            this.sliceArray(nextProps.products);
        }
        if (nextProps.uid != this.state.uid) {
            this.setState(() => ({
                uid: nextProps.uid
            }));
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
    onLike = (pid) => {
        this.props.addLike(this.state.uid, pid);
    }
    onDisLike = (pid) => {
        this.props.disLike(this.state.uid, pid);
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
                                            <ListItem
                                                key={product.id}
                                                product={product}
                                                onLike={this.onLike}
                                                onDisLike={this.onDisLike}
                                            />
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

const mapStateToProps = (state) => {
    // console.log(state.auth.uid)
    return {
        products: selectProducts(state.products, state.auth.like),
        uid: state.auth.uid
    }
}
// ({
//     products: state.products,
//     memderId: state.auth.uid
// });
const mapDispatchToProps = (dispatch, props) => ({
    setTitle: (title) => dispatch(setTitle(title)),
    addLike: (uid, pid) => dispatch(addLike(uid, pid)),
    disLike: (uid, pid) => dispatch(disLike(uid, pid)),
    listProducts: () => dispatch(listProducts())
});
export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
