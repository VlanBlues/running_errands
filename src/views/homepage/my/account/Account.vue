<template>
    <div>
        <van-nav-bar title="个人账户"
                     left-arrow
                     right-text="明细"
                     @click-left="onClickLeft"
                     @click-right="onClickRight"
                     style="background: white;border-bottom: 0.5px solid rgba(111, 111, 111, 0.5)"
        />
        <div class="container">
            <div class="balance">
                <div class="balance-content">
                    <p>余额(元)</p>
                    <p>￥{{account.balance.toFixed(1)}}</p>
                </div>
            </div>
            <div class="count">
                <div class="count-detail" style="border-right: 0.5px solid rgba(111, 111, 111, 0.3)">
                    <p>累计消费金额（元）</p>
                    <p>￥{{account.spend.toFixed(1)}}</p>
                </div>
                <div class="count-detail">
                    <p>佣金（元）</p>
                    <p>￥{{account.commission.toFixed(1)}}</p>
                </div>
            </div>
            <div class="btn">
                <button @click="withdrawal">提现</button>
                <button @click="recharge">充值</button>
            </div>
        </div>
        <van-popup
                class="pop"
                v-model="show"
                round
                position="bottom"
                :style="{ height: '25%' }"
        >
            <button @click="pay(0)">支付宝</button>
            <button @click="pay(1)">微信</button>
            <button @click="pay(2)">取消</button>
        </van-popup>
        <div class="bottom"></div>
    </div>
</template>

<script>
    export default {
        name: "Account",
        data() {
            return {
                account:{
                    balance: 0,
                    spend:0,
                    commission:0
                },
                show: false,
                type: 'get'
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back()
            },
            onClickRight() {
                this.$toast.success('明细')
            },
            withdrawal(){
                this.show = true;
                this.type = '提现'
            },
            recharge(){
                this.show = true;
                this.type = '充值'
            },
            pay(model){
                if(model === 0){
                    this.$router.push({
                        name:'operation',
                        params:{
                            title: '支付宝',
                            type: this.type,
                            balance:this.account.balance
                            
                        }
                    })
                }else if(model === 1){
                    this.$router.push({
                        name:'operation',
                        params:{
                            title: '微信',
                            type: this.type,
                            balance:this.account.balance

                        }
                    })
                }else {
                    this.show = false
                }
            },
        },
        activated(){
            this.$api.get('/account/get_account', {
                'uid': this.$store.state.user.id
            }, response => {
                if(response.data.id !== 0){
                    this.account = response.data;
                }else {
                    this.$toast.fail('请求出错！！！')
                }
            }, err => {
                console.log('err');
            });
        },
    }
</script>

<style scoped>
    .container{
        height: calc(100vh);
        background: white;
    }
    .balance {
        width: 100%;
        height: 150px;
        position: relative;
        border-bottom: 0.5px solid rgba(111, 111, 111, 0.5);
    }

    .balance-content {
        width: 120px;
        text-align: center;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-60px,0);
    }
    .balance-content p:first-child{
        font-size: 16px;
    }
    .balance-content p:last-child{
        font-size: 40px;
        margin: 15px 0;
        color: #45baff;
    }
    .count{
        position: relative;
        margin: 5px 0;
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 0.5px solid rgba(111, 111, 111, 0.5);
    }
    .count-detail{
        /*background: #45baff;*/
        width: 49%;
        display: inline-block;
        text-align: center;
    }

    .count-detail p:first-child{
        margin: 10px 0;
    }
    .btn{
        width: 100%;
        position: relative;
        margin: 30% 0;
    }
    .btn button{
        font-size: 16px;
        width: 120px;
        height: 40px;
        border: none;
        border-radius: 5px;
        position: absolute;
        color: white;
    }
    .btn button:first-child{
        left: 10%;
        background: #45baff;
    }
    .btn button:last-child{
        right: 10%;
        background: #ff9d31;
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
    
    .bottom {
        width: 100%;
        height: 50px;
        position: fixed;
        bottom: 0;
        background: #ffffff;
        z-index: 2;
    }
</style>