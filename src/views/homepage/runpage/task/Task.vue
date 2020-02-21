<template>
    <div class="task">
        <van-nav-bar :title="title" class="navbar" left-arrow @click-left="onClickLeft"/>
        <div class="cell">
            <van-cell-group>
                <van-field
                        v-model="message"
                        rows="3"
                        autosize
                        label="目的"
                        type="textarea"
                        placeholder="请描述这一次的目的"
                />
                <van-cell title="地址" center is-link :value="$store.state.address.addressDetail" to="/home_page/my/address"/>
                <div class="set-money">
                    <span class="title">感恩回馈</span>
                    <div class="money-input">
                        <span>￥</span>
                        <input type="text" placeholder="请输跑腿费" v-model="money">
                    </div>
                </div>
            </van-cell-group>
            
            <button @click="submit" class="submit">提交订单</button>
        </div>
        <div style="z-index: 10; width: 100%;height: 50px;position: fixed;bottom: 0;left: 0;right: 0;background: #f5f5f5">

        </div>
    </div>
</template>

<script>
    export default {
        name: "Task",
        data() {
            return {
                title: '',
                message: '',
                money: '2',
                // addressDetail: this.$store.state.address.addressDetail
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back()
            },
            submit(){
                this.$api.get('/account/get_account', {
                    'uid': this.$store.state.user.id
                }, response => {
                    if(response.data.id !== 0){
                        if(response.data.balance<this.money){
                            this.$toast.fail('余额不足，请及时充值！')
                        }else {
                            this.$dialog.confirm({
                                title: '提示',
                                message: '确定要支付'+this.money+'元提交订单么'
                            }).then(() => {
                                this.$api.get('/order/add_order',{
                                    'type':this.title,
                                    'objective':this.message,
                                    'money':this.money,
                                    'addressId':this.$store.state.address.id,
                                    'originatorId':this.$store.state.user.id
                                },response =>{
                                    if(response.data.id === 0){
                                        this.$toast.fail("创建失败！")
                                    }else {
                                        this.$toast.success('支付成功！')
                                        this.$router.back()
                                    }

                                },err =>{
                                    console.log('err');
                                })
                            }).catch(() => {
                                console.log('camcel');
                            });
                            
                        }
                    }else {
                        this.$toast.fail('请求出错！！！')
                    }
                }, err => {
                    console.log('err');
                });
                
            }
        },
        created(){
            
        },
        activated() {
            // this.message = '';
            if (this.$route.params.sign === '0') {
                this.title = '取快递';
                this.type = '取快递'
            } else {
                this.title = '求帮忙';
                this.type = '求帮忙'
            }
        }
    }
</script>

<style scoped>
    .task{
        width: 100%;
    }
    .navbar{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
    .set-money {
        /*position: relative;*/
        /*width: 100%;*/
        height: 44px;
        font-size: 14px;
        background: white;
    }
    .cell{
        position: absolute;
        width: 100%;
        top: 44px;
    }
    .set-money .title{
        position: absolute;
        height: 44px;
        line-height: 44px;
        left: 18px;
        
    }
    .money-input{
        position: absolute;
        right: 20px;
        width: 100px;
    }
    .money-input span{
        line-height: 44px;
        left: 18px;
        position: relative;
        margin-left: 10px;
    }
    .money-input input {
        display: block;
        width: 75px;
        left: 60px;
        position: absolute;
        top: 50%;
        transform: translate(-15px,-50%);
        padding: 10px 0;
    }
    .submit{
        position: relative;
        padding: 4% 0;
        width: 98%;
        border: none;
        background: #45baff;
        border-radius: 5px;
        margin-top: 10%;
        left: 50%;
        transform: translate(-50%,0);

    }
</style>