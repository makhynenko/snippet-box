import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { call, put } from 'redux-saga/effects';
import { getLists } from 'api/list';
import { safeTakeLatest } from '../../helpers/saga';
import { AxiosResponse } from 'axios';

const actionCreator = actionCreatorFactory('root');

const FETCH = 'FETCH';

export const actions = {
    fetch: actionCreator.async<string, any[]>(FETCH),
};

export interface RootStore {
    data: any[];
    loading: boolean;
}

const initialState: RootStore = {
    data: [],
    loading: false,
};

export default reducerWithInitialState(initialState)
    .case(actions.fetch.started, state => ({
        ...state,
        loading: true,
    }))
    .case(actions.fetch.done, (state, { result }): RootStore => ({
        ...state,
        data: result,
        loading: false,
    }));

function* fetch() {
    const res: AxiosResponse<any> = yield call(getLists);
    console.log(res.data);
    yield put(actions.fetch.done({ params: null, result: res.data }));
}

export function* saga() {
    yield safeTakeLatest(actions.fetch.started.type, fetch);
}
