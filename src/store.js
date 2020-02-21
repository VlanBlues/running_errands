import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user:{
            id: 1,
            username: 'lan',
            password:'',
            tel:'',
            email:'',
            sex: '男',
            // img:'http://localhost:8080/img/20191023 140929.jpg'
            img:'http://101.132.147.72/img/cat.jpg'
        },
        address:{
            id:1,
            addressDetail:'学院路202'
        },
        type:'取快递'
    },
    mutations: {
        upUser(state,user){
            state.user = user;
        },
        upAddress(state,address){
            state.address = address;
            // console.log(address);
        },
        upType(state,type){
            state.type = type;
            // console.log(address);
        }
    },
    actions: {
        
    }
})
