import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import ListItem from './ListItem';
import { setTitle } from '../../actions/sys';
// import { listProducts} from '../../actions/product';
export class ListProducts extends React.Component {
    constructor(props) {
        super(props);
        this.props.setTitle('ลายสินค้า');
        // console.log(this.props.listProducts());
    }
    render() {
        return (
            <div className="container">
                <div className="tile is-ancestor">
                    {
                        this.props.products.map((product, key) => {
                            return (
                                <div key={key} className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">{product.name}</p>
                                        {/* <p className="subtitle"></p> */}
                                        <figure className="image is-96x96">
                                            <img src={product.downloadURLs[0]} />
                                        </figure>
                                    </article>
                                </div>
                            )
                        })
                    }
                </div>
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
