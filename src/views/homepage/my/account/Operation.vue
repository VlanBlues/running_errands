<template>
    <div style="height: calc(100vh);background: white">
        <van-nav-bar :title="title"
                     left-arrow
                     @click-left="onClickLeft"
                     style="background: white;border-bottom: 0.5px solid rgba(111, 111, 111, 0.5)"
        />
        <div style="padding: 10px;margin: 10px;background: whitesmoke">
            <!--<p>在线支付</p>-->
            <van-divider/>
            <input type="text" v-model="num" placeholder="请输入金额">
            <div style="font-size: 14px;color: rgba(74,181,255,0.73);margin-left: 5%;margin-bottom: 5%">当前余额{{balance.toFixed(1)}}</div>

            <van-grid :gutter="20" :column-num="3">
                <van-grid-item v-for="value in money" @click="operation(value)" >
                    <p>{{value}}元</p>
                </van-grid-item>
            </van-grid>
        </div>
        <div>
            <button @click="confirm">确认{{type}}</button>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
    export default {
        name: "operation",
        data() {
            return {
                title: '',
                type: '',
                money:[
                    10,20,30,50,100,200
                ],
                num: '',
                balance:0.0
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back()
            },
            operation(value){
                this.num = value
            },
            confirm(){
                if(this.num ===''||this.num === null){
                    this.$toast.fail('金额不能为空！！！')
                }else {
                    if(this.type === '提现'){
                        if(this.num > this.balance){
                            this.$toast.fail('余额不足！！！');
                            return
                        }
                        this.$dialog.confirm({
                            title: '提示',
                            message: '确定要提现么'
                        }).then(() => {
                            this.$api.get('/account/update', {
                                'uid': this.$store.state.user.id,
                                'number':-this.num
                            }, response => {
                                if(response.data === 1){
                                    this.$toast.success('提现成功')
                                    this.num = ''
                                }else {
                                    this.$toast.fail('请求出错！！！')
                                }
                            }, err => {
                                this.$toast.fail('请求出错！！！')
                            });
                        }).catch(() => {
                            console.log('camcel');
                        });
                        
                    }else if(this.type === '充值') {
                        this.$dialog.confirm({
                            title: '提示',
                            message: '确定要充值么'
                        }).then(() => {
                            this.$api.get('/account/update', {
                                'uid': this.$store.state.user.id,
                                'number':this.num
                            }, response => {
                                if(response.data === 1){
                                    this.$toast.success('充值成功')
                                    this.num = ''
                                }else {
                                    this.$toast.fail('请求出错！！！')
                                }
                            }, err => {
                                this.$toast.fail('请求出错！！！')
                            });
                        }).catch(() => {
                            console.log('camcel');
                        });
                        
                    }
                }
                
            }
        },
        activated() {
            this.num = '';
            this.title = this.$route.params.title;
            this.type = this.$route.params.type;
            this.balance = this.$route.params.balance;
            console.log(this.$route.params.balance);
            this.title += this.type
        }
    }
</script>

<style scoped>

    .bottom {
        width: 100%;
        height: 50px;
        position: fixed;
        bottom: 0;
        background: white;
        z-index: 9;
    }
    input{
        display: block;
        /*border: 1px solid #ccc;*/
        border-radius: 3px;
        padding: 10px 0;
        font-size: 16px;
        width: 90%;
        text-align: center;
        margin: 0 auto 10px;
    }
    button{
        display: block;
        width: 80%;
        color: whitesmoke;
        font-size: 16px;
        padding: 14px 0;
        margin: 40px auto 0;
        background: #45baff;
        border:  none;
        border-radius: 5px;
    }
    input:focus {outline: none; }
    input:focus::-webkit-input-placeholder {text-indent: 100%; opacity: 0; -webkit-transition: .4s; transition: .4s; }
    input:focus::-moz-placeholder {text-indent: 100%; opacity: 0; -moz-transition: .4s; }
    input:focus:-ms-input-placeholder {text-indent: 100%; opacity: 0; -webkit-transition: .4s; transition: .4s; }
</style>