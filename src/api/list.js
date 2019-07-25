import axios from 'axios';

export const getLists = () => {
    return axios.get('/api/lists');
};
