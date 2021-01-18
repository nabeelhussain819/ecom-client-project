import request from '../request'
import { BASE_API } from '../../Constant'

const baseUrl = `${BASE_API}categories`;

function all(params = {}) {
    return request({
        url: baseUrl,
        params
    });
}


function save(data) {
    return request({
        url: baseUrl,
        data,
        method: 'POST',
    });
}

const Category = {
    all, save
};

export default Category