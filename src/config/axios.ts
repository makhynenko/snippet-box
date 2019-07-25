import axios from 'axios';

axios.defaults.timeout = 10000;

axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.baseURL = 'http://127.0.0.1:8080/',
axios.defaults.data = {};
