import { all, fork } from 'redux-saga/effects';
import { saga as rootSaga } from '../views/root/duck';
import { saga as globalSaga } from '../views/duck';

export default function* saga() {
    yield all([
        fork(rootSaga),
        fork(globalSaga),
    ]);
}
