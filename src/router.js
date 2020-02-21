import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// import Home from '../components/Home'
const FirstPage = () => import( './views/firstpage/FirstPage');
const Login = () => import('./views/login/Login');
const Register = () => import('./views/register/Register');
const ForgetPass = () => import('./views/forgetpass/ForgetPass');
const HomePage = () => import('./views/homepage/HomePage');
const RunPage = () => import('./views/homepage/runpage/RunPage');
const Task = () => import('./views/homepage/runpage/task/Task');
const searchOrder = () => import('./views/homepage/runpage/search/searchOrder');
const Order = () => import('./views/homepage/order/Order');
const OrderDetail = () => import('./views/homepage/order/orderdetail/OrderDetail');
const My = () => import('./views/homepage/my/My');
const Address = () => import('./views/homepage/my/address/Address');
const Personal = () => import('./views/homepage/my/personal/Personal');
const AddAddr = () => import('./views/homepage/my/address/addaddr/AddAddr');
const Account = () => import('./views/homepage/my/account/Account');
const Operation = () => import('./views/homepage/my/account/Operation');

export default new Router({
    // mode: 'history',
    base: '/yiTownWebApp/',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'first_page',
            component: FirstPage
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/forget_pass',
            name: 'forget_pass',
            component: ForgetPass
        },
        {
            path: '/home_page',
            component: HomePage,
            children:[
                {
                    path:'/',
                    redirect:{
                        name:'run_page'
                    }
                },
                {
                    path:'run_page',
                    name:'run_page',
                    component: RunPage
                },
                {
                    path:'task',
                    name:'task',
                    component: Task
                },
                {
                    path:'searchOrder',
                    name:'searchOrder',
                    component: searchOrder
                },
                {
                    path:'order',
                    component: Order
                },
                {
                    path:'order_detail',
                    name:'order_detail',
                    component: OrderDetail
                },
                {
                    path:'my',
                    component: My
                },
                {
                    path:'my/address',
                    name:'address',
                    component:Address
                },
                {
                    path:'my/personal',
                    component:Personal
                },
                {
                    path:'my/add_addr',
                    name:'add',
                    component:AddAddr
                },
                {
                    path:'my/account',
                    name:'account',
                    component:Account
                },{
                    path:'my/operation',
                    name:'operation',
                    component:Operation
                }
            ]
        }
    ]
})

