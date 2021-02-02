import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}user`;

function all(params = {}) {
    return request({
        url: baseUrl,
        params
    });
}
function detail(params = {}) {
    return request({
        url: `${baseUrl}auth/details`,
        params
    });
}

const UserService = {
    all, detail, 
};

export default UserService