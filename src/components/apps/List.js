import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import ListItem from './ListItem';
import { addUserApp, removeUserApp } from '../../actions/users';
import selectApps from '../../selectors/apps';

export class ListApps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apps: props.apps,
            rowsNo: 0,
            sizeTile: 3,
            appsCount: 0,
            datas: []
        };
    }
    onAddUserApp = (app) => {
        this.props.addUserApp(this.props.idcard, app);
    };
    onRemoveUserApp = (appId) => {
        this.props.removeUserApp(this.props.idcard, appId);
    };
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.apps != this.state.apps) {
            this.sliceArray(nextProps.apps);
        }
    }
    componentWillMount = () => {
        this.sliceArray(this.state.apps);
    }
    sliceArray = (apps) => {
        const rowsNo = Math.floor(Math.sqrt(apps.length));
        const rowsCount = Math.ceil(apps.length / rowsNo);
        let datas = [];
        for (var i = 0; i < apps.length; i += rowsCount) {
            datas.push([apps.slice(i, i + rowsCount)]);
        }
        this.setState(() => ({
            apps,
            datas
        }))
    }
    render() {
        // console.log(this.state.rowsNo);
        // console.log(this.state.datas)
        return (
            // <div className="content-container">
            //     <div className="list-header">
            //         <div className="show-for-mobile">แอพพลิเคชั่น</div>
            //         <div className="show-for-desktop">แอพพลิเคชั่น</div>
            //         <div className="show-for-desktop">สถานะ</div>
            //     </div>
            //     <div className="list-body">
            //         {
            //             this.props.apps.length === 0 ? (
            //                 <div className="list-item list-item--message">
            //                     <span>ไม่มีแอพพลิเคชั่น</span>
            //                 </div>
            //             ) : (
            //                     this.props.apps.map((app) => {
            //                         return <ListItem
            //                             key={app.id}
            //                             app={app}
            //                             onAddUserApp={this.onAddUserApp}
            //                             onRemoveUserApp={this.onRemoveUserApp}
            //                         />;
            //                     })
            //                 )
            //         }
            //     </div>
            // </div>
            <div>
                {
                    this.state.apps.length === 0 ? (
                        <section className="section">
                            <div className="box">
                                <h1 className="title">ไม่พบรายการ</h1>
                                <h2 className="subtitle">
                                    กรุณาติดต่อคุณติ๊ก <strong>tik@kmutnb.ac.th</strong> หรือ <strong>085-555-4071</strong>
                                </h2>
                            </div>
                        </section>
                    ) : (
                            <div className="container">
                                {
                                    this.state.datas.map((apps, key) => {
                                        // let sizeAll =12;
                                        return (
                                            <div key={key} className="tile is-ancestor">
                                                {
                                                    apps[0].map((app) => {
                                                        const size = 12 / apps[0].length;
                                                        // sizeAll -= size;
                                                        return (
                                                            <ListItem
                                                                key={app.id}
                                                                app={app}
                                                                size={size}
                                                                onAddUserApp={this.onAddUserApp}
                                                                onRemoveUserApp={this.onRemoveUserApp}
                                                            />
                                                        );
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            // <div className="tile is-ancestor">
                            //     {   
                            //         this.state.apps.map((app) => {
                            //             return (
                            //                 <ListItem
                            //                     key={app.id}
                            //                     app={app}
                            //                     size={this.state.sizeTile}
                            //                     onAddUserApp={this.onAddUserApp}
                            //                     onRemoveUserApp={this.onRemoveUserApp}
                            //                 />
                            //             );
                            //         })
                            //     }
                            // </div>
                        )
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        apps: state.apps,
        idcard: state.auth.idcard
    }
};
const mapDispatchToProps = (dispatch, props) => ({
    addUserApp: (idcard, app) => dispatch(addUserApp(idcard, app)),
    removeUserApp: (idcard, appId) => dispatch(removeUserApp(idcard, appId))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListApps);
