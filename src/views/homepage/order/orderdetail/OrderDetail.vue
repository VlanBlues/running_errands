<template>
    <div style="height: 100vh;position: relative;width: 100%">
        <van-nav-bar style="position: fixed;top: 0;left: 0;right: 0;z-index: 9" title="详情" class="navbar" left-arrow
                     @click-left="onClickLeft"/>

        <scroll style="height: calc(100% - 96px);overflow: hidden;position: absolute;top: 46px;width: 100%"
                :probe-type="3">
            <div class="order">
                <div class="user_img">
                    <img :src="orderContent.user.img"/>
                </div>
                <div v-if="orderContent.sex === '男'">
                    <img :src="sexImg.man" class="sexImg"/>
                </div>
                <div v-else="orderContent.sex === '女'">
                    <img :src="sexImg.women" class="sexImg"/>
                </div>
                <div class="word">
                    <span>{{orderContent.user.username}}</span>
                    <span>{{orderContent.originatorTime}}</span>
                    <span style="display: block;margin: 10px 15px 0 10px">{{orderContent.objective}}</span>
                </div>

                <a :href="orderContent.user.tel" class="tel"><img src="../../../../assets/img/phone.png"
                                                                  height="20"/></a>
                <van-divider/>
                <div class="address">
                    <span class="address_detail">{{address.address}}</span>
                    <img src="../../../../assets/img/position.png" height="20"/>
                    <p class="money">已支付{{orderContent.money}}元 </p>
                </div>
                <van-divider class="xuxian"/>
                <van-steps
                        :active="active"
                        active-color="#45baff"
                >
                    <van-step>新发布</van-step>
                    <van-step>被抢啦</van-step>
                    <van-step>已送达</van-step>
                    <van-step>已结单</van-step>
                </van-steps>

            </div>
            <div style="background: white; margin: 5px 0;position: relative" v-show="isRecipientShow">
                <van-image
                        class="user"
                        round
                        fit="cover"
                        width="40"
                        height="40"
                        :src="recipient.img"
                />
                <p style="display: inline-block;position: absolute;top: 12px;">{{recipient.username}}</p>
                <p style="display: inline-block;position: absolute;top: 35px;font-size: 10px;background: #9ef10f;padding: 3px;border-radius: 10px;color: white;left: 55px;">
                    靠谱100%</p>
                <a :href="recipient.tel" style="position: absolute;right: 10px;top: 15px;"><img
                        src="../../../../assets/img/phone.png" height="20"/></a>


            </div>
            <div class="accept">
                <div v-show="!acceptAll">
                    <div v-if="!isRecipientShow">
                        <button v-if="isOriginator"  @click="cancelOrder">取消订单</button>
                        <button v-else  @click="acceptOrder">接受订单</button>
                    </div>
                    <div v-else>
                        <button v-show="isOriginator" @click="oComplete">完成订单</button>
                        <button v-show="isRecipient" @click="rComplete">完成订单</button>
                    </div>
                </div>
                <button v-show="acceptAll" style="background: #c8c8c8">已完成</button>

            </div>
            <div class="likes_mag">
                <div class="like">
                    <img src="../../../../assets/img/like/like.png" height="20" @click="like" v-show="!likeActive"/>
                    <img src="../../../../assets/img/like/like_active.png" height="20" @click="like"
                         v-show="likeActive"/>
                    <p>{{likeSize}}</p>
                </div>
                <div class="msg">
                    <img src="../../../../assets/img/msg.png" height="20"/>
                    <p>{{messages.length}}</p>
                </div>
            </div>
            <div class="msgs">
                <div class="msg_data">
                    <img src="../../../../assets/img/msg.png" height="20"/>
                    <p>评论{{messages.length}}条</p>
                </div>
                <div class="user_msg" v-for="message in messages">
                    <div class="user_info">
                        <van-image
                                class="user"
                                round
                                fit="cover"
                                width="30"
                                height="30"
                                :src="message.user.img"
                        />
                        <p class="name">{{message.user.username}}</p>
                        <p class="time">{{message.msgTime}}</p>
                    </div>
                    <p>{{message.msg}}</p>
                </div>
            </div>
        </scroll>
        <div class="comment">
            <van-cell-group>
                <van-field
                        v-model="comment"
                        center
                        clearable
                        label="评论"
                        placeholder="请输入评论"
                        style="height: 50px "
                >
                    <button @click="sendMsg" slot="button" style="border: none;color: white;background: #45baff">发送
                    </button>
                </van-field>
            </van-cell-group>

        </div>
    </div>
</template>

<script>
    import Scroll from '@/components/scroll/Scroll'

    export default {
        name: "OrderDetail",
        components: {
            Scroll
        },
        data() {
            return {
                msg: '',
                orderContent: '',
                money: 5,
                active: 0,
                likeActive: false,
                userImg: require('../../../../assets/img/cat.jpg'),
                comment: '',
                recipient: {},
                isRecipientShow: false,
                likeSize: 0,
                address: {},
                messages: [],
                isOriginator: false,
                isRecipient: false,
                acceptAll:false,
                sexImg: {
                    man: require('@/assets/img/sex/man.png'),
                    women: require('@/assets/img/sex/women.png')
                },
                orderHeight: {
                    height: '500'
                }
            }
        },
        activated() {
            this.isRecipientShow = false;
            this.isOriginator = false;
            this.isRecipient = false;
            this.acceptAll = false;
            this.active = 0;
            this.orderContent = this.$route.params.orderContent;
            // console.log(this.$route.params.orderContent);
            this.orderContent.user.tel = 'tel:' + this.orderContent.user.tel;
            this.isRecipientShow = this.orderContent.recipientId !== 0;
            this.isRecipient = this.orderContent.recipientId === this.$store.state.user.id;
            this.isOriginator = this.$store.state.user.id === this.orderContent.originatorId;

            if (this.orderContent.recipientState === '已接受') {
                this.active = 1
            } else if (this.orderContent.recipientState === '已完成') {
                this.active = 2
            }
            if (this.orderContent.recipientState === '已完成' && this.orderContent.originatorState ==='已完成') {
                this.active = 3;
                this.acceptAll = true
            }

  
            //getRecipient
            if (this.isRecipientShow) {
                this.$api.get('/user/get_by_id', {
                    'id': this.orderContent.recipientId
                }, response => {
                    if (response.data.id !== 0) {
                        this.recipient = response.data;
                        // console.log(this.recipient,999999999);
                        this.recipient.tel = 'tel:' + this.recipient.tel
                    }
                }, err => {
                    console.log('err');
                });
            }
            //getAddress
            this.$api.get('/address/get_by_id', {
                'id': this.orderContent.addressId
            }, response => {
                this.address = response.data
            }, err => {
                console.log('err');
            });

            this.$api.get('/msg/get_by_oid', {
                'orderId': this.orderContent.id
            }, response => {
                this.messages = response.data
            }, err => {
                console.log('err');
            });
            // console.log(this.orderContent, 777);

            this.$api.get('/likes/get_like', {
                'orderId': this.orderContent.id,
                'likeUserId': this.$store.state.user.id
            }, response => {
                if (response.data === 1) {
                    this.likeActive = true
                } else {
                    this.likeActive = false
                }
            }, err => {
                console.log('err');
            });

            this.$api.get('/likes/get_size', {
                'orderId': this.orderContent.id,
            }, response => {
                this.likeSize = response.data
            }, err => {
                console.log('err');
            });


        },
        methods: {
            onClickLeft() {
                this.$router.back()
            },
            cancelOrder(){
                this.$dialog.confirm({
                    title: '提示',
                    message: '确定要充值么'
                }).then(() => {
                    this.$api.get('/order/del_by_id', {
                        'id': this.orderContent.id
                    }, response => {
                        if(response.data === 1){
                            this.$toast.success('订单取消成功！');
                            this.$router.back()
                        }
                    }, err => {
                        console.log('err');
                    });
                }).catch(() => {
                    console.log('camcel');
                });
                
            },
            like() {
                this.likeActive = !this.likeActive;
                if(this.likeActive === true){
                    this.likeSize += 1
                }else {
                    this.likeSize -= 1
                }
                console.log(this.orderContent.user.id, 666);
                this.$api.get('/likes/set_like', {
                    'orderId': this.orderContent.id,
                    'likeUserId': this.$store.state.user.id,
                    'likeState': this.likeActive
                }, response => {
                    
                }, err => {
                    console.log('err');
                });
            },
            sendMsg() {
                this.$api.get('/msg/add', {
                    'orderId': this.orderContent.id,
                    'msgUserId': this.$store.state.user.id,
                    'msg': this.comment
                }, response => {
                    if (response.data === 1) {
                        this.$toast.success("发送成功")
                        this.comment = ''
                        this.$api.get('/msg/get_by_oid', {
                            'orderId': this.orderContent.id
                        }, response => {
                            this.messages = response.data
                            console.log(this.messages, 'message');
                        }, err => {
                            console.log('err');
                        });
                    }
                }, err => {
                    console.log('err');
                });
            },
            //接受订单
            acceptOrder() {
                this.$dialog.confirm({
                    title: '提示',
                    message: '确定要接受订单么'
                }).then(() => {
                    this.$api.get('/order/user_accept', {
                        'id': this.orderContent.id,
                        'recipientId': this.$store.state.user.id
                    }, response => {
                        if(response.data === 1){
                            this.isRecipientShow = !this.isRecipientShow;
                            this.isRecipient = !this.isRecipient;
                            this.active = 1;
                            this.$toast.success('接受成功')
                        }
                        
                    }, err => {
                        console.log('err');
                    });
                }).catch(() => {
                    // on cancel
                });
                
            },
            //发起者订单完成
            oComplete() {
                this.$dialog.confirm({
                    title: '提示',
                    message: '确定订单完成么'
                }).then(() => {
                    this.$api.get('/order/originator_up', {
                        'id': this.orderContent.id,
                    }, response => {
                        if(response.data === 1){
                            this.isOriginator = !this.isOriginator;
                            this.acceptAll = true;
                            this.active = 3;
                        }
                    }, err => {
                        console.log('err');
                    });
                }).catch(() => {
                    // on cancel
                });
            },
            //接受者订单完成
            rComplete() {
                this.$dialog.confirm({
                    title: '提示',
                    message: '确定订单完成么'
                }).then(() => {
                    this.$api.get('/order/recipient_up', {
                        'id': this.orderContent.id,
                    }, response => {
                        if(response.data === 1){
                            this.acceptAll = true
                            this.active = 2
                        }
                    }, err => {
                        console.log('err');
                    });
                }).catch(() => {
                    // on cancel
                });
            }

        },
        created() {
        }
    }
</script>

<style scoped>

    .order {
        position: relative;
        background: white;
        width: 100%;
        height: 240px;
        overflow: hidden;
    }

    .order_height {
        height: 300px;
    }

    .user_img {
        position: relative;
        height: 40px;
        width: 40px;
        margin: 10px;
        border-radius: 50%;
        overflow: hidden;

    }

    .user_img img {
        height: 100%;
        width: auto;
        position: absolute;
    }

    .sexImg {
        position: absolute;
        left: 38px;
        top: 35px;
        height: 15px;
        width: auto;

    }

    span {
        display: block;
        position: absolute;
        font-size: 15px;
    }

    .word span:first-child {
        font-size: 14px;
        left: 60px;
        top: 12px;
    }

    .word span:nth-child(2) {
        left: 60px;
        top: 35px;
        font-size: 10px;
        color: #b9b9b9;
    }

    .word span:nth-child(3) {
        position: relative;
        margin-left: 10px;
        margin-bottom: -10px;
        font-size: 13px;
    }

    .word span:nth-child(4) {
        right: 5px;
        bottom: 5px;
        font-size: 12px;
        color: #85cdff;
    }

    .tel {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .address {
        position: relative;
        margin-left: 10px;
    }

    .address_detail {
        display: block;
        margin-left: 25px;
        font-size: 12px;
        height: 50px;
        line-height: 20px;
        color: #a4acb3;
        width: 70%;
    }

    .money {
        position: absolute;
        width: 45px;
        height: 20px;
        right: 10px;
        top: 0;
        display: block;
    }

    .xuxian {
        position: relative;
        margin-top: 30px;
    }

    .comment {
        position: fixed;
        width: 100%;
        height: 50px;
        background: #f5f5f5;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;

    }

    .accept {
        position: relative;
        width: 100%;
        background: white;
        margin-top: 2px;
    }

    .accept button {
        width: 80px;
        height: 40px;
        border: none;
        background: #45baff;
        color: white;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 70%;
    }

    .likes_mag {
        position: relative;
        margin: 2px 0;
        width: 100%;
        background: white;
    }

    .likes_mag div {
        position: relative;
        width: 50%;
        background: white;
    }

    .like img {
        position: relative;
        margin: 5px 5px 5px 40%;
    }

    .like p {
        display: inline-block;
        position: relative;
        height: 30px;
        line-height: 30px;
    }

    .msg {
        margin-left: 49%;
        margin-top: -30px;
        border-left: 1px solid #e3e3e3;

    }

    .msg img {
        position: relative;
        margin: 5px 5px 5px 40%;
    }

    .msg p {
        display: inline-block;
        position: relative;
        height: 30px;
        line-height: 30px;
    }

    .user_msg {
        width: 100%;
        position: relative;

    }

    .msgs {
        width: 100%;
        background: white;
        /*background: #45baff;*/
    }

    .msg_data {
        border-bottom: 1px solid #f0f0f0;
    }

    .msg_data img {
        margin: 10px 10px;
    }

    .msg_data p {
        display: inline-block;
        height: 40px;
        line-height: 40px;
    }

    .user_info {
        width: 100%;
        position: relative;
    }

    .user {
        margin: 10px;
    }

    .user_info p {
        display: inline-block;
        position: absolute;
        top: 18px;
    }

    .time {
        right: 10px;
        color: #c0c8cf;
        font-size: 10px;
    }

    .user_msg > p {
        display: block;
        position: relative;
        margin-left: 10px;
        padding-bottom: 10px;
        width: 90%;
    }
</style>