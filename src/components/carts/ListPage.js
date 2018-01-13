import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { setTitle } from '../../actions/sys';
import MdAddCircle from 'react-icons/lib/md/add-circle';
export class ListApps extends React.Component {
    constructor(props) {
        super(props);
        this.props.setTitle('ตระกร้าสินค้าของฉัน')
    }
    render() {
        return (
            <div className="column is-8 is-offset-2">
                <div className="columns is-pulled-right">
                    <div className="column">
                        <Link className="button is-info" to="/carts/add" ><MdAddCircle />&nbsp;สั่งซื้อ</Link>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <table className="table is-bordered is-striped is-fullwidth is-hovered">
                            <thead>
                                <tr>
                                    <th className="has-text-centered">ลำดับ</th>
                                    <th className="has-text-centered">รายละเอียด</th>
                                    <th className="has-text-centered">สถานะ</th>
                                    <th className="has-text-centered">เครื่องมือ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.carts.map((order, index) => {
                                        return <ListItem
                                            key={order.id}
                                            index={index}
                                            app={order}
                                        />;
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    carts: state.auth.carts
});
const mapDispatchToProps = (dispatch, props) => ({
    setTitle: (title) => dispatch(setTitle(title))
    // updateRole: (idcard, role) => dispatch(updateRole(idcard, role))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListApps);
