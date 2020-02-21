<template>
    <div class="main" :style="{marginTop: marginTop}">
        <img src="../../assets/img/back/back2.png" class="back" @click="back"/>
        <div class="form">
            <div class="content">
                <div class="box">
                    <span>
                        <input v-model="email" class="slide-up" id="user" type="email" placeholder="请输入邮箱" @click="test"/><label
                            for="user">邮箱</label>
                    </span>
                </div>
                
                <div class="box">
                    <span>
                        <input v-model="code" class="slide-up" id="test" type="text" placeholder="请输入验证码" @click="test"/><label
                            for="test">验证</label>
                    </span>
                </div>
                <div class="box">
                    <span>
                        <input v-model="newPass" class="slide-up" id="pass" type="password" placeholder="请输入新密码"/><label
                            for="pass">新密码</label>
                    </span>
                </div>
            </div>
            <div class="btn">
                <button class="register" @click="emailCode">发送邮箱验证</button>
                <button class="login" @click="upPass">确认修改</button>
            </div>
        </div>
        
    </div>

</template>

<script>
    export default {
        name: "ForgetPass",
        data() {
            return {
                marginTop: "",
                clientHeight: "",
                mode: 0,
                email:'',
                code:'',
                newPass: ''
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
            emailCode(){
                if(this.email === ''|| this.email === null){
                    this.$toast.fail('邮箱不能为空！')
                }else {
                    this.$api.post('/user/email_code', {
                        email:this.email
                    }, response => {
                        this.$toast.success("已发送")
                    }, err => {
                        console.log('err');
                    })
                }
                
            },
            upPass(){
                if(this.email === ''|| this.email === null){
                    this.$toast.fail('邮箱不能为空！')
                    return
                }
                if(this.code === ''|| this.code === null){
                    this.$toast.fail('验证码不能为空！')
                    return
                }
                if(this.newPass === ''|| this.newPass === null){
                    this.$toast.fail('新密码不能为空！')
                    return
                }
                this.$api.post('/user/update_pass', {
                    'email':this.email,
                    'code':this.code,
                    'password':this.newPass
                }, response => {
                    if(response.data === 100){
                        this.$toast.fail("验证码错误")
                    }else{
                        this.$toast.success("修改成功")
                        this.$router.push('/login')
                    }
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
    .btn {
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 40%;
    }

    button {
        width: 38%;
        height: 40px;
        border: none;
        border-radius: 5px;

    }
    .register{
        position: absolute;
        left: 10%;
        background: #82a2cd;
        color: white;
    }
    .login{
        position: absolute;
        color: #8eaee7;
        right: 10%;
    }
    .content {
        position: absolute;
        width: 300px;
        height: 400px;
        left: 50%;
        top: 50%;
        transform: translate(-150px, -200px);
        /*background: aquamarine;*/
    }

    .box {
        position: relative;
        z-index: 1;
        margin-bottom: 30px;
    }

    .content button {
        width: 100%;
        height: 40px;
        color: #4fc5aa;
        font-size: 18px;
        border: none;
        background: white;
        border-radius: 30px;
        margin-bottom: 20px;
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