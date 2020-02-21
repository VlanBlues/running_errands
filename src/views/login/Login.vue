<template>
    <div class="main" :style="{marginTop: marginTop}">
        <img src="../../assets/img/back/back2.png" class="back" @click="back"/>
        <div class="form">
            <div class="content">
                <div class="box">
                    <span>
                        <input v-model="tel" class="slide-up" id="user" type="text" placeholder="请输入账号" @click="test"/><label
                            for="user">手机</label>
                    </span>
                </div>
                <div class="box">
                    <span>
                        <input v-model="password" class="slide-up" id="pass" type="password" placeholder="请输入用户名"/><label
                            for="pass">密码</label>
                    </span>
                </div>
                <button @click="login">登录</button>
            </div>

        </div>
        <div class="forget" @click="forget">忘记密码?</div>
    </div>

</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                marginTop: "",
                clientHeight: "",
                mode: 0,
                tel: '',
                password:''
            }
        },
        methods: {
            test(){
                if (this.mode === 0) {
                    this.clientHeight = document.documentElement.clientHeight;
                    this.mode = 1
                }
            },
            back(){
                this.$router.back()
            },
            login(){
                this.$api.post('/user/login',{
                    'tel':this.tel,
                    'password': this.password
                },response =>{
                    if(response.data.id === -1){
                        this.$toast.fail('用户名或密码错误')
                    }else {
                        this.$toast.success('登录成功');
                        this.$store.commit('upUser',response.data);
                        
                        this.$api.post('/address/get_addr_uid',{
                            id:this.$store.state.user.id
                        },response =>{
                            this.$store.commit('upAddress',response.data);
                        },err =>{
                            console.log('err');
                        });
                        this.$router.push('/home_page')
                    }
                    // console.log(response.data);
                },err =>{
                    console.log('err');
                })
                // this.$router.push('/home_page')
                // this.$router.push('/home_page')
            },
            forget(){
                this.$router.push('/forget_pass')
            }
        },
        created(){
            
        },
        mounted() {
            // 安卓手机键盘吊起挡住输入框

            window.onresize = function () {
                
                if (document.documentElement.clientHeight < this.clientHeight) {
                    // scrollVal为负值
                    this.marginTop = document.documentElement.clientHeight - this.clientHeight;
                } else {
                    this.marginTop = 0
                }

            };
        }
    }
</script>

<style scoped>
    .main {
        background: url("../../assets/img/bg1.jpg") no-repeat;
        background-size: cover;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
    }
    .back{
        width: 8%;
        position: fixed;
        top: 2%;
        left: 5%;
        z-index: 10;
    }
    .form {
        position: relative;
        height: 100vh;
        overflow-y: auto;
        width: 100%;
    }

    .content {
        position: absolute;
        width: 300px;
        height: 400px;
        left: 50%;
        top: 50%;
        transform: translate(-150px, -150px);
        /*background: aquamarine;*/
    }

    .box {
        position: relative;
        z-index: 1;
        margin-bottom: 40px;
    }

    .content button {
        width: 100%;
        height: 40px;
        color: white;
        font-size: 18px;
        border: none;
        background: #4fc5aa;
        border-radius: 30px;
    }

    .forget{
        position: fixed;
        left: 50%;
        bottom: 2%;
        color: white;
        font-size: 15px;
        margin: 0 auto;
        transform: translate(-55%);

    }
    .slide-up {
        display: inline-block;
        width: 95%;
        height: 11%;
        padding: 10px 0 10px 15px;
        font-weight: 400;
        color: #52bfa4;
        background: #efefef;
        border: 0;
        border-radius: 3px;
        outline: 0;
        text-indent: 80px;
        transition: all .3s ease-in-out;
    }

    .slide-up::-webkit-input-placeholder {
        color: #efefef;
        text-indent: 0;
        font-weight: 300;
    }

    .slide-up + label {
        display: inline-block;
        position: absolute;

        transform: translateX(0);
        color: #fff;
        top: 0;
        left: 0;
        padding: 11.5px 15px;
        text-shadow: 0 1px 0 rgba(19, 74, 70, 0.4);
        transition: all .3s ease-in-out;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        overflow: hidden;
    }

    .slide-up + label:before, .slide-up + label:after {
        content: "";
        position: absolute;
        right: 0;
        left: 0;
        z-index: -1;
        transition: all .3s ease-in-out;
    }

    .slide-up + label:before {
        top: 6px;
        left: 5px;
        right: 5px;
        bottom: 6px;
        background: #4fc5aa;
    }

    .slide-up + label:after {
        top: 0;
        bottom: 0;
        background: #4fc5aa;
    }

    span:nth-child(1) .slide-up {
        text-indent: 105px;
    }

    span:nth-child(3) .slide-up {
        text-indent: 125px;
    }

    span:nth-child(1) .slide-up:focus,
    span:nth-child(1) .slide-up:active,
    span:nth-child(3) .slide-up:focus,
    span:nth-child(3) .slide-up:active {
        text-indent: 0;
    }

    .slide-up:focus,
    .slide-up:active {
        color: #377D6A;
        text-indent: 0;
        background: #fff;
    }

    .slide-up:focus::-webkit-input-placeholder,
    .slide-up:active::-webkit-input-placeholder {
        color: #aaa;
    }

    .slide-up:focus + label,
    .slide-up:active + label {
        transform: translateY(-90%);
    }

    .slide-up:focus + label:before,
    .slide-up:active + label:before {
        border-radius: 5px;
    }

    .slide-up:focus + label:after,
    .slide-up:active + label:after {
        transform: translateY(100%);
    }

</style>