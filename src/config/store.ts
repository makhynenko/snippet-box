import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootReducer as Reducer } from './reducer';
import rootSaga from './saga';

function configureStore(initialState = {}) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(Reducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        module.hot.accept('./reducer', () => {
            // eslint-disable-next-line
            const newReducer = require('./reducer').rootReducer; // eslint-disable-line
            store.replaceReducer(newReducer);
        });
    }
    return store;
}

const store = configureStore();

export { store };
