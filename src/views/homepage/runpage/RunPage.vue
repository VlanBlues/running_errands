<template>
    <div class="run_page">
        <van-nav-bar title="跑腿" class="navbar">
            <img src="../../../assets/img/write.png" width="20px" slot="right" class="image" @click="addRunBtn"/>
            <img src="../../../assets/img/search.png" width="20px" slot="left" class="image" @click="searchOrder"/>
        </van-nav-bar>
        <scroll class="contents" ref="scroll" :probe-type="3" @scroll="contentScroll"><!--@scroll 监听滚动条-->
            <div class="self-swipe">
                <van-swipe :autoplay="3000"  :width="fullWidth">
                    <van-swipe-item v-for="(image, index) in images" :key="index">
                        <a>
                            <img :src="image" alt="" :width="fullWidth">
                        </a>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <ul>
                <li v-for="orderContent in orderContents">
                    <order-content :orderContent="orderContent"></order-content>
                </li>
            </ul>
        </scroll>
        <van-popup
                class="pop"
                v-model="show"
                round
                position="bottom"
                :style="{ height: '25%' }"
        >
            <button @click="addRun(0)">取快递</button>
            <button @click="addRun(1)">求帮忙</button>
            <button @click="addRun(2)">取消</button>
        </van-popup>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
    import Scroll from '@/components/scroll/Scroll'
    import BackTop from '@/components/backtop/BackTop'
    import OrderContent from '@/components/ordercontent/OrderContent'
    export default {
        name: "RunPage",
        data() {
            return {
                images: [
                    require('../../../assets/img/lb/lb2.jpg'),
                    require('../../../assets/img/lb/lb3.jpg'),
                    require('../../../assets/img/lb/lb4.jpg'),
                ],
                fullWidth:document.documentElement.clientWidth,
                isShowBackTop: false,
                show: false,
                orderContents:[],
                orderContent:{
                    name:'lan',
                    time:'时间：啦啦啦啦',
                    explain:'任务详细说明任务详细说明任务详细说明任务详细说明任务详细说明',
                    money:'2',
                    special:'特殊要求',
                    sex:'男'
                }
            }
        },
        components: {
            Scroll,
            BackTop,
            OrderContent
        },
        activated(){
            this.$api.get('/order/get_no_orders',{
            },response =>{
                // console.log(response.data);
                this.orderContents = response.data
            },err =>{
                console.log('err');
            })
        },
        methods:{
            addRunBtn(){
                this.show = true
            },
            addRun(model){
                if(model === 0){
                    this.$store.commit('upType','取快递');
                    this.$router.push({
                        name:'task',
                        params:{
                            sign:'0'
                        }
                    })
                }else if(model === 1){
                    this.$store.commit('upType','求帮忙');
                    this.$router.push({
                        name:'task',
                        params:{
                            sign:'1'
                        }
                    })
                }else {
                    this.show = false
                }
            },
            searchOrder(){
                this.$router.push("/home_page/searchOrder")
            },
            contentScroll(position) {
                // console.log(position);
                this.isShowBackTop = -position.y > 100
            },
            backClick() {
                this.$refs.scroll.backTo(0, 0)
            },
            test(index){
                alert(index)
            }
        }
    }
</script>

<style scoped>
    .run_page{
        height: 100vh;
    }
    .image {
        margin-bottom: 70%;
    }

    .navbar {
        /*background: #add1ff;*/
        display: flex;
        left: 0;
        top: 0;
        right: 0;
    }
    .contents {
        height: calc(100% - 96px);
        /*background: aquamarine;*/
        overflow: hidden;
    }
    .contents ul> li{
        font-size: 3em;
    }
    .pop button{
        border: none;
        color: #45baff;
        border-bottom: #e3e3e3 1px solid;
        font-size: 16px;
        background: white;
        width: 100%;
        height: 33%;
    }
    .pop button:last-child{
        color: #d65b51;
        border-bottom: none;
    }

</style>