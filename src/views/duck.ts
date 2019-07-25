import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { takeEvery, put } from 'redux-saga/effects';

const actionCreator = actionCreatorFactory('global');

const ERROR = 'ERROR';
const WARNING = 'WARNING';
const INFO = 'INFO';
const SUCCESS = 'SUCCESS';
const NOTIFICATION_SHOW = 'NOTIFICATION_SHOW';

export const actions = {
    error: actionCreator(ERROR),
    warning: actionCreator(WARNING),
    info: actionCreator(INFO),
    success: actionCreator(SUCCESS),
    notificationShow: actionCreator(NOTIFICATION_SHOW),
};

const TYPE = {
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    SUCCESS: 'success',
};

export interface GlobalStore {
    notificationMap: any;
    user: any;
}

const initialState: GlobalStore = {
    notificationMap: undefined,
    user: undefined,
};

export default reducerWithInitialState(initialState).case(actions.notificationShow, (state, data) => ({
    ...state,
    notificationMap: data.notification,
}));

const getPayload = (type, message) => {
    const time = new Date().toISOString();
    const notification = [{ type, message, time }];
    return { notification };
};

const getPayloadBulk = (type, messages) => {
    const time = new Date().toISOString();
    const notification = messages.map(message => ({ type, message, time }));
    return { notification };
};

export function* globalErrorHandler(gen) {
    try {
        yield* gen();
    } catch (e) {
        if (e.response && e.response.status === 'error code') {
            console.log('Response with special error code'); // eslint-disable-line  no-console
        } else {
            yield put(actions.error(e));
        }
    }
}

function* handleError(action) {
    const {
        payload: { message },
    } = action;
    if (Array.isArray(message)) {
        yield put(actions.notificationShow(getPayloadBulk(TYPE.ERROR, message)));
        message.map(x => console.error(x));
    } else {
        yield put(actions.notificationShow(getPayload(TYPE.ERROR, message)));
        console.error(message);
    }
}

function* handleWarning(action) {
    const {
        payload: { message },
    } = action;
    if (Array.isArray(message)) {
        yield put(actions.notificationShow(getPayloadBulk(TYPE.WARNING, message)));
        message.map(x => console.warn(x));
    } else {
        yield put(actions.notificationShow(getPayload(TYPE.WARNING, message)));
        console.warn(message);
    }
}

function* handleInfo(action) {
    const {
        payload: { message },
    } = action;
    if (Array.isArray(message)) {
        yield put(actions.notificationShow(getPayloadBulk(TYPE.INFO, message)));
    } else {
        yield put(actions.notificationShow(getPayload(TYPE.INFO, message)));
    }
}

function* handleSuccess(action) {
    const {
        payload: { message },
    } = action;
    if (Array.isArray(message)) {
        yield put(actions.notificationShow(getPayloadBulk(TYPE.SUCCESS, message)));
    } else {
        yield put(actions.notificationShow(getPayload(TYPE.SUCCESS, message)));
    }
}

export function* saga() {
    yield takeEvery(actions.error.type, handleError); // no "safe" here to avoid recursion.
    yield takeEvery(actions.warning.type, handleWarning);
    yield takeEvery(actions.info.type, handleInfo);
    yield takeEvery(actions.success.type, handleSuccess);
}
