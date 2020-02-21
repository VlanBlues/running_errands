import {request} from "./request";

export function getHomeMultidata() {
    return request({
        url: '/user/login',
        params:{
            
        }
    })
}