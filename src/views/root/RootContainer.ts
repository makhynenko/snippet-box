import { connect } from 'react-redux';
import { actions } from './duck';
import Root from './Root';
import { Store } from '../types';
import { RootStoreProps, RootDispatchProps } from './types';

const mapDispatchToProps = (dispatch): RootDispatchProps => ({
    fetch: () => dispatch(actions.fetch.started(''))
});

const mapStateToProps = (state: Store): RootStoreProps => ({
    data: state.root.data,
    loading: state.root.loading,
});

export default connect<RootStoreProps, RootDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(Root);
