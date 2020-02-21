<template>
    <div class="bg">
        <img src="../../assets/img/logo_white.png"/>
        <div class="school">跑腿校园</div>
        <div class="btn">
            <button class="register" @click="register">注册</button>
            <button class="login" @click="login">登录</button>
        </div>
        <div class="forget" @click="forget">忘记密码?</div>
    </div>
</template>

<script>
    export default {
        name: "FirstPage",
        methods:{
            register(){
                this.$router.push('/register')
            },
            login(){
                this.$router.push('/login')
            },
            forget(){
                this.$router.push('forget_pass')
            }
        }
    }
</script>

<style scoped>
    .bg {
        background: url("../../assets/img/bg1.jpg") no-repeat;
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%
    }

    .bg img {
        width: 100px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50px, -280%);
    }

    .school {
        position: absolute;
        color: aliceblue;
        font-size: 25px;
        left: 50%;
        top: 50%;
        transform: translate(-50px, -180px);
    }

    .btn {
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 15%;
    }

    button {
        width: 38%;
        height: 40px;
        border: none;
        border-radius: 5px;
       
    }
    .register{
        position: absolute;
        left: 8%;
        background: #82a2cd;
        color: white;
    }
    .login{
        position: absolute;
        color: #8eaee7;
        right: 8%;
    }
    .forget{
        position: fixed;
        left: 50%;
        bottom: 2%;
        color: white;
        font-size: 15px;
        margin: 0 auto;
        transform: translate(-50%);
        
    }
</style>