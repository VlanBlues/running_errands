<template>
    <div class="order" @click="detail">
        <div class="user_img">
            <img :src="orderContent.user.img"/>
        </div>
        <div v-if="orderContent.user.sex === '男'">
            <img :src="sexImg.man"  class="sexImg"/>
        </div>
        <div v-else="orderContent.user.sex === '女'">
            <img :src="sexImg.women" class="sexImg"/>
        </div>
        <div class="word">
            <span >{{orderContent.user.username}}</span>
            <span>{{orderContent.originatorTime}}</span>
            <span>{{orderContent.objective}}</span>
            <span>￥{{orderContent.money}}</span>
            <span>{{orderContent.type}}</span>
            <span v-if="orderContent.originatorState === '已完成'">已完成</span>
            <span v-else>未完成</span>

        </div>
        <hr/>
    </div>
</template>

<script>
    export default {
        name: "Order",
        data(){
            return{
                sexImg:{
                    man:require('../../assets/img/sex/man.png'),
                    women:require('../../assets/img/sex/women.png')
                }
            }
        },
        props:{
            orderContent:{
                type: Object,
                default: null
            }
        },
        methods:{
            detail(){
                this.$router.push({
                    name:'order_detail',
                    params:{
                        orderContent: this.orderContent
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .order{
        position: relative;
        background: white;
        width: 94%;
        border-radius: 6px;
        overflow: hidden;
        margin: 10px auto 0;
    }
    .order hr{
        width: 100%;
        position: relative;
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .user_img{
        position: relative;
        height: 40px;
        width: 40px;
        margin: 10px;
        border-radius:50%;
        overflow: hidden;

    }
    .user_img img{
        height:100%;
        width: auto;
        position: absolute;
    }
    .sexImg{
        position: absolute;
        left: 38px;
        top: 35px;
        height: 15px;
        width: auto;
        
    }
    span{
        display: block;
        position: absolute;
        font-size: 15px;
    }

    .word span:first-child{
        font-size: 14px;
        left: 60px;
        top: 12px;
    }
    .word span:nth-child(2){
        left: 60px;
        top: 35px;
        font-size: 10px;
        color: #b9b9b9;
    }
    .word span:nth-child(3){
        position: relative;
        margin-left: 10px;
        margin-bottom: -10px;
        font-size: 13px;
    }
    .word span:nth-child(4){
        right: 5px;
        bottom: 5px;
        font-size: 12px;
        color: #85cdff;
    }
    .word span:nth-child(5){
        left: 5px;
        bottom: 5px;
        font-size: 12px;
        color: #85cdff;
    }
    .word span:nth-child(6){
        font-size: 12px;
        line-height: 25px;
        text-align: center;
        height: 25px;
        width: 50px;
        background: #add1ff;
        top: 0;
        border-top-right-radius: 6px;
        border-bottom-left-radius: 6px;
        right: 0;
        color: white;
    }
</style>