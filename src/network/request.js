import axios from 'axios'
//npm i vant -S
//npm i babel-plugin-import -D
/*在babel.config.js配置
    plugins: [
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant']
    ]*/
//npm install axios --save
//npm install better-scroll --save
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 2000
    });
    /*//请求拦截器
    instance.interceptors.request.use(config =>{
        console.log(config);
        return config;
    },error => {
        console.log(error);
    });*/
    
    /*//响应拦截
    instance.inserceptor.request.use(res =>{
        return res.data
    },err =>{
        console.log(err);
    });*/
    return instance(config)
}


