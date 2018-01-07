import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { setTitle } from '../../actions/sys';
import MdAddCircle from 'react-icons/lib/md/add-circle';
export class ListApps extends React.Component {
    constructor(props) {
        super(props);
        this.props.setTitle('รายการแอพพลิเคชั่น')
    }
    render() {
        return (
            <div className="column is-8 is-offset-2">
                <div className="columns is-pulled-right">
                    <div className="column">
                        <Link className="button is-info" to="/apps/add" ><MdAddCircle />&nbsp;เพิ่มแอพ</Link>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <table className="table is-bordered is-striped is-fullwidth is-hovered">
                            <thead>
                                <tr>
                                    <th className="has-text-centered">ลำดับ</th>
                                    <th className="has-text-centered">แอพพลิเคชั่น</th>
                                    <th className="has-text-centered">สถานะ</th>
                                    <th className="has-text-centered">เครื่องมือ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.apps.map((app, index) => {
                                        return <ListItem
                                            key={app.id}
                                            index={index}
                                            app={app}
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
    apps: state.apps
});
const mapDispatchToProps = (dispatch, props) => ({
    setTitle: (title) => dispatch(setTitle(title))
    // updateRole: (idcard, role) => dispatch(updateRole(idcard, role))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListApps);
