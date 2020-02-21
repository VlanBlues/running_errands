<template>
    <div class="order" >
        <van-nav-bar title="跑腿订单" class="navbar"/>

        <van-tabs v-model="active" swipeable color="#45baff" >
            <van-tab :title="'我的发布'" class="tab" :probe-type="3">
                <scroll class="contents" :probe-type="3">
                    <ul>
                        <li v-for="orderContent in fbOrders">
                            <order-content :orderContent="orderContent"></order-content>
                        </li>

                    </ul>
                </scroll>
            </van-tab>
            <van-tab  :title="'我的抢单 '" class="tab">
                <scroll class="contents" :probe-type="3">
                    <ul>
                        <li v-for="orderContent in jsOrders">
                            <order-content :orderContent="orderContent"></order-content>
                        </li>
                    </ul>
                </scroll>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import Scroll from '../../../components/scroll/Scroll'
    import OrderContent from '@/components/ordercontent/OrderContent'
    export default {
        name: "Order",
        components:{
            Scroll,
            OrderContent
        },
        data(){
            return{
                active: 0,
                isShowBackTop: false,
                fbOrders:[],
                jsOrders:[]
            }
        },
        activated(){
            this.$api.get('/order/get_fb_orders',{
                'id':this.$store.state.user.id
            },response =>{
                // console.log(response.data);
                this.fbOrders = response.data
            },err =>{
                console.log('err');
            });
            this.$api.get('/order/get_js_orders',{
                'id':this.$store.state.user.id
            },response =>{
                // console.log(response.data);
                this.jsOrders = response.data
            },err =>{
                console.log('err');
            })
        },
        methods:{
            contentScroll(position) {
                // console.log(position);
                this.isShowBackTop = -position.y > 100
            }
        }
    }
</script>

<style scoped>
    .navbar {
        /*background: #add1ff;*/
        display: flex;
        left: 0;
        top: 0;
        right: 0;
    }
    .tab{
        height: 100vh;
        width: 100%;
    }
    ul >li:first-child{
        padding-top: 0.1px;
    }
    .contents{
        height: calc(100% - 140px);
        /*background: aquamarine;*/
        overflow: hidden;
    }
</style>