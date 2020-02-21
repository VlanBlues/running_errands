<template>
    <div class="my">
        <div class="user">
            
            <div class="user_img">
                <!--<van-image
                        round
                        fit="cover"
                        width="70"
                        height="70"
                        :src="image"
                />-->
                <van-uploader :after-read="afterRead">
                    <van-image
                            round
                            fit="cover"
                            width="70"
                            height="70"
                            :src="image"
                    />
                </van-uploader>
                <img v-if="sex === '男'" src="../../../assets/img/sex/man.png" class="sex"/>
                <img v-else src="../../../assets/img/sex/women.png" class="sex"/>
                <span>{{username}}</span>
                
            </div>
            <div class="order">
                <span>接单&nbsp{{jOrder}}</span>
                <span>发单&nbsp{{fOrder}}</span>
            </div>
            
            
            
        </div>
        <div class="personal">
            <van-cell title="我的钱包" is-link :icon="money" to="/home_page/my/account"  class="van_cell"/>
            <van-cell title="个人资料" :icon="person" is-link to="/home_page/my/personal" class="van_cell"/>
            <van-cell title="地址" is-link :icon="position" to="/home_page/my/address" class="van_cell"/>
            <button @click="signOut" class="sign_out">退出登录</button>
        </div>
    </div>
</template>

<script>
    // import Upload from '../../../components/upload/Upload'
    import axios from 'axios';
    export default {
        name: "My",
        components:{
            
            // Upload
        },
        data() {
            return {
                money: require('../../../assets/img/money.png'),
                // image: require('../../../assets/img/cat.jpg'),
                image: this.$store.state.user.img,
                sex:this.$store.state.user.sex,
                person: require('../../../assets/img/person.png'),
                position: require('../../../assets/img/position.png'),
                username:this.$store.state.user.username,
                fOrder:'',
                jOrder:''
                
            }
        },
        methods:{
            afterRead(file) {
                let param = new FormData();
                param.append('file',file.file);
                axios.post('http://localhost:8080/user/up_img?id='+this.$store.state.user.id,param)
                    .then(response=>{
                        this.$store.commit('upUser',response.data)
                        this.image= file.content
                    })

                /*this.$api.get('/user/up_img', {
                    'id': this.$store.state.user.id,
                    param
                }, response => {
                    if (response.data.id !== 0) {
                        this.recipient = response.data;
                        this.recipient.tel = 'tel:' + this.recipient.tel
                    }
                }, err => {
                    console.log('err');
                });*/
                // console.log(file);
            },
            signOut(){
                this.$dialog.confirm({
                    title: '警告',
                    message: '确定要退出么'
                }).then(() => {
                    this.$router.push('/')
                }).catch(() => {
                    console.log('camcel');
                });
            }
        },
        activated(){
            this.$api.get('/order/get_fb_orders',{
                'id':this.$store.state.user.id
            },response =>{
                // console.log(response.data);
                this.fOrder = response.data.length
            },err =>{
                console.log('err');
            });
            this.$api.get('/order/get_js_orders',{
                'id':this.$store.state.user.id
            },response =>{
                // console.log(response.data);
                this.jOrder = response.data.length
            },err =>{
                console.log('err');
            })
        }
    }
</script>

<style scoped>
    .my{
        width: 100%;
        height: 100%;
        position: relative;
        color: white;
    }
    .user{
        width: 100%;
        height: 230px;
        position: fixed;
        top: 0;
        background: url("../../../assets/img/fj1.jpg") no-repeat;
        background-size: 100%;
    }

    
    .user_img{
        position: relative;
        width: 70px;
        height: 100px;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-60%);
    }
    .user_img span{
        display: block;
        /*width: 20px;*/
        height: 20px;
        line-height: 20px;
        position: relative;
        text-align: center;
        left: 50%;
        transform: translate(-50%,10%);
    }
    
    .sex{
        width: 20px;
        position: absolute;
        left: 50px;
        top: 50px;
    }
    .order{
        position: absolute;
        left: 50%;
        top:75%;
        transform: translate(-50%,0);
    }
    .order span{
        margin: 20px;
    }
    .personal{
        position: relative;
        margin-top: 240px;
    }
    .van_cell{
        position: relative;
        margin-top: 10px;
    }
    .sign_out{
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