<template>
    <div style="height: 100vh">
        <van-nav-bar
                title="搜索"
                left-arrow
                @click-left="onClickLeft"
        />
        <div style="position: relative;">
            <van-dropdown-menu style="height: 40px;width: 20%;position: absolute;left: 0">
                <van-dropdown-item v-model="value1" :options="option1"  @click.native="change"/>
            </van-dropdown-menu>
            <van-search
                    style="width: 80%;position: absolute;right: 0"
                    v-model="searchValue"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
            >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>
        <div style="width: 100%;height: 50px;background: #f5f5f5;position: absolute;bottom: 0;z-index: 2"></div>
        <scroll class="contents" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <ul>
                <li v-for="orderContent in orderContents">
                    <order-content :orderContent="orderContent"></order-content>
                </li>
            </ul>
        </scroll>
        <div class="searchNothing" v-show="searchNothingShow">
            没有任何订单信息
        </div>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
    import Scroll from '@/components/scroll/Scroll'
    import OrderContent from '@/components/ordercontent/OrderContent'
    import BackTop from '@/components/backtop/BackTop'
    export default {
        name: "searchOrder",
        components:{
            Scroll,
            OrderContent,
            BackTop
        },
        created(){
            this.$api.get('/order/get_no_orders',{
            },response =>{
                // console.log(response.data);
                if(response.data.length !== 0){
                    this.searchNothingShow = false;
                    this.orderContents = response.data
                }else {
                    this.searchNothingShow = true
                }
            },err =>{
                console.log('err');
            })
        },
        data(){
            return{
                searchValue: "",
                searchNothingShow: false,
                value1: 0,
                isShowBackTop: false,
                option1: [
                    { text: '全部', value: 0 },
                    { text: '快递', value: 1 },
                    { text: '帮忙', value: 2 }
                ],
                orderContents:[],
            }
        },
        methods:{
            onClickLeft(){
                this.$router.back()
            },
            onSearch(){
                this.$api.get('/order/get_no_search_orders',{
                    'type':'',
                    'text':this.searchValue
                },response =>{
                    // console.log(response.data);
                    this.orderContents = [];
                    if(response.data.length !== 0){
                        this.searchNothingShow = false;
                        this.orderContents = response.data
                    }else {
                        this.searchNothingShow = true
                    }
                    
                },err =>{
                    console.log('err');
                })
            },
            change(){
                let type;
                if(this.value1 === 1){
                    type = '取快递'
                }else if(this.value1 === 2){
                    type = '求帮忙'
                }
                this.$api.get('/order/get_no_search_orders',{
                    'type':type,
                    'text':''
                },response =>{
                     // console.log(response.data);
                    if(response.data.length !== 0){
                        this.searchNothingShow = false;
                        this.orderContents = response.data
                    }else {
                        this.searchNothingShow = true
                    }
                },err =>{
                    console.log('err');
                })
            },
            contentScroll(position) {
                // console.log(position);
                this.isShowBackTop = -position.y > 100
            },
            backClick() {
                this.$refs.scroll.backTo(0, 0)
            },
        }
    }
</script>

<style scoped>
    .contents {
        position: relative;
        z-index: 3;
        margin-top: 40px;
        height: calc(100% - 86px);
        /*background: aquamarine;*/
        overflow: hidden;
    }
    .searchNothing{
        font-size: 16px;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%,0);
        z-index: 999;
        color: #9c9c9c;
    }
</style>