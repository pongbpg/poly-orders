import React from 'react';
import { connect } from 'react-redux';
import AppForm from './Form';
import { startEditApp } from '../../actions/apps';
import { setTitle } from '../../actions/sys';
export class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            app: props.app
        }
        this.props.setTitle('แก้ไขแอพพลิเคชั่น');
    }
    componentWillReceiveProps(nextProps) {
        // console.log('next prop', nextProps.user);
        // console.log('this state', this.state)
        console.log(nextProps.app)
        if (nextProps.app !== this.state.app) {
            this.setState({ app: nextProps.app });
        }
    };
    onSubmit = (app) => {
        this.props.startEditApp(this.state.app.id, app);
        this.props.history.push('/apps');
    };
    render() {
        return (
            <AppForm onSubmit={this.onSubmit} app={this.state.app} />
        );
    }
}
const mapStateToProps = (state, props) => ({
    app: state.apps.find((app) => app.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    setTitle: (title) => dispatch(setTitle(title)),
    startEditApp: (id, app) => dispatch(startEditApp(id, app))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);