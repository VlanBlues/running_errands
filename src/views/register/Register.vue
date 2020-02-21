<template>
    <div>
        <div class="main" :style="{marginTop: marginTop}">
            <img src="../../assets/img/back/back2.png" class="back" @click="back"/>
            <div class="form">
                <div class="content">
                    <div class="box">
                    <span>
                        <input v-model="tel" class="slide-up" id="phone" type="text" placeholder="请输入手机号" @click="test"/><label
                            for="phone">手&nbsp;&nbsp;&nbsp;&nbsp;机</label>
                    </span>
                    </div>
                    <div class="box">
                    <span>
                        <input v-model="email" class="slide-up" id="email" type="email" placeholder="请输入邮箱"/><label
                            for="email">邮&nbsp;&nbsp;&nbsp;&nbsp;箱</label>
                    </span>
                    </div>
                    <div class="box">
                    <span>
                        <input v-model="username" class="slide-up" id="user" type="text" placeholder="请输入姓名"/><label
                            for="user">昵&nbsp;&nbsp;&nbsp;&nbsp;称</label>
                    </span>
                    </div>

                    <div class="box">
                    <span>
                        <input v-model="password" class="slide-up" id="pass" type="password" placeholder="请输入密码"/><label
                            for="pass">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                    </span>
                    </div>
                    <div class="box">
                    <span>
                        <input v-model="code" class="slide-up" id="code" type="text" placeholder="请输入验证码"/><label
                            for="code">验证码</label>
                    </span>
                    </div>
                    <van-radio-group v-model="sex"
                                     style="position: relative;width: 100%;height: 39px;margin: -10px 0 10px 0;border: 5px">
                        <van-radio name="1" checked-color="#45baff" style="position: absolute;left: 20%;top: 10px;">男
                        </van-radio>
                        <van-radio name="0" checked-color="#45baff" style="position: absolute;left: 60%;top: 10px">女
                        </van-radio>
                    </van-radio-group>
                    <div>
                        <button @click="sendCode" :class="{ send:isSend }" >{{sendBtn}}</button>
                        <button @click="register">注册</button>
                    </div>
                    
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                marginTop: "",
                clientHeight: "",
                tel: '',
                email: '',
                username: '',
                password: '',
                sex: '1',
                code:'',
                mode: 0,
                sendBtn: '发送邮箱验证',
                count:60,
                isSend: false
            }
        },
        methods: {
            test() {
                if (this.mode === 0) {
                    this.clientHeight = document.documentElement.clientHeight;
                    this.mode = 1
                }
            },
            back() {
                this.$router.back()
            },
            register() {
                if(this.tel === ''|| this.tel === null){
                    this.$toast.fail('手机不能为空！')
                    return
                }else if(this.email === ''|| this.email === null){
                    this.$toast.fail('邮箱不能为空！')
                    return
                }else if(this.username === ''|| this.username === null){
                    this.$toast.fail('昵称不能为空！')
                    return
                }else if(this.password === ''|| this.password === null){
                    this.$toast.fail('密码不能为空！')
                    return
                }else if(this.code === ''|| this.code === null){
                    this.$toast.fail('验证码不能为空！')
                    return
                }
                let sex_word;
                if (this.sex === '1') {
                    sex_word = '男'
                } else {
                    sex_word = '女'
                }
                this.$api.get('/user/register', {
                    'tel': this.tel,
                    'email': this.email,
                    'username': this.username,
                    'password': this.password,
                    'sex': sex_word,
                    'code':this.code
                }, response => {
                    if (response.data === 100) {
                        this.$toast.fail('手机号或邮箱被注册')
                        // this.$router.push('/login')
                    }else if(response.data === 404){
                        this.$toast.fail('验证码错误！')
                    }else {
                        this.$toast.success('注册成功');
                        this.$router.push('/login')
                    }
                }, err => {
                    console.log('err');
                })
            },
            sendCode(){
                if(this.email === ''|| this.email === null){
                    this.$toast.fail('邮箱不能为空！')
                    return
                }
                let countDown = setInterval(()=>{
                    if(this.count < 1){
                        this.isSend = false;
                        this.sendBtn = '发送验证码';
                        this.count = 60;
                        clearInterval(countDown);
                    }else{
                        this.isSend = true;
                        this.sendBtn = this.count-- + 's后可重发';
                    }
                },1000);
                this.$api.post('/user/email_code', {
                    email:this.email
                }, response => {
                    this.$toast.success("已发送")
                }, err => {
                    console.log('err');
                })
            }
            
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

    .back {
        width: 8%;
        position: absolute;
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
        top: 45%;
        transform: translate(-150px, -55%);
        /*background: aquamarine;*/
    }

    .box {
        position: relative;
        z-index: 1;
        margin-bottom: 30px;
    }

    
    
    .content button {
        width: 40%;
        height: 40px;
        color: white;
        font-size: 14px;
        border: none;
        background: #4fc5aa;
        border-radius: 16px;
        margin: 0 15px;
    }
    .send{
        pointer-events: none;
        background: #b8c5bb;
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