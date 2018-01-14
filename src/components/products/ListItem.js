import React from 'react';
import OrderForm from './OrderForm';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: props.product.id,
            downloadURLs: props.product.downloadURLs[0],
            like: props.product.like,
            hasLike: props.product.hasLike
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.product.like != this.state.like) {
            this.setState(() => ({
                like: nextProps.product.like
            }));
        }
        if (nextProps.product.hasLike != this.state.hasLike) {
            this.setState(() => ({
                hasLike: nextProps.product.hasLike
            }));
        }
    }
    onAddLike = (e) => {
        this.props.onLike(this.state.pid);
    }
    onDisLike = () => {
        this.props.onDisLike(this.state.pid);
    }

    render() {
        return (
            <div className="tile is-parent is-4">
                <article className="tile is-child box">
                    <nav className="level is-grouped is-grouped-multiline">
                        <div className="title">P{this.state.pid}</div>

                        <div className="control">
                            <div className="tags has-addons">
                                {this.state.hasLike === false && <a className="tag button" onClick={this.onAddLike}><FaThumbsOUp /></a>}
                                {this.state.hasLike === true && <a className="tag  is-info button" onClick={this.onDisLike}><FaThumbsOUp /></a>}
                                <span className="tag is-dark">{this.state.like}</span>
                            </div>
                        </div>

                    </nav>
                    <div className="column has-text-centered">
                        <figure className="image is-1by1">
                            <img src={this.state.downloadURLs} />
                        </figure>
                    </div>
                    <div className="content">
                        <OrderForm />
                    </div>
                </article>
            </div>
        )
    }
}