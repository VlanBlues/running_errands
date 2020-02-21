<template>
    <div class="per">
        <van-nav-bar title="个人资料"
                     left-arrow
                     @click-left="onClickLeft"/>
        <div>
            
            <van-cell-group>
                <van-field
                        v-model="personal.username"
                        label="昵称"
                        placeholder="请输入昵称"
                        input-align="right"
                />
                
                <van-field
                        disabled
                        v-model="personal.sex"
                        label="性别"
                        placeholder="请输入昵称"
                        input-align="right"
                />
                <van-field
                        v-model="personal.tel"
                        label="电话"
                        placeholder="请输入电话"
                        input-align="right"
                />
                <van-field
                        v-model="personal.email"
                        label="邮箱"
                        placeholder="请输入邮箱"
                        input-align="right"
                />
                <van-field
                        v-model="personal.autograph"
                        rows="4"
                        autosize
                        label="个性签名"
                        type="textarea"
                        placeholder="请输入留言"
                />
            </van-cell-group>
            <button @click="save" class="sign_out">保存</button>
        </div>
        <div class="bottom"></div>
    </div>
    
</template>

<script>
    export default {
        name: "Personal",
        data() {
            return {
                show: false,
                personal:{
                    username:'1213132',
                    sex: '男',
                    tel:'13735906695',
                    email:'794758167@qq.com',
                    autograph:'啦啦啦啦'
                },
                
            };
        },
        activated(){
            console.log('test');
            this.$api.get('/user/get_by_id', {
                'id': this.$store.state.user.id
            }, response => {
                this.personal = response.data
            }, err => {
                console.log('err');
            });
        },
        methods:{
            onClickLeft(){
                this.$router.back()
            },
            test(){
                // console.log('input111'+this.password);
            },
            save(){
                this.$api.get('/user/update_user',{
                    'username':this.personal.username,
                    'tel':this.personal.tel,
                    'email':this.personal.email,
                    'autograph':this.personal.autograph,
                    'id':this.$store.state.user.id
                },response =>{
                    if(response.data === 1){
                        
                        this.$toast.success('保存成功');
                    }else {
                        this.$toast.fail('保存失败')
                    }
                    console.log(response.data);
                },err =>{
                    console.log('err');
                })
            }
        }
    }
</script>

<style scoped>
.bottom{
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    background: #f5f5f5;
    z-index: 9;
}
.sign_out{
    position: relative;
    padding: 4% 0;
    width: 95%;
    font-size: 15px;
    color: white;
    border: none;
    background: #45baff;
    border-radius: 5px;
    margin-top: 10%;
    left: 50%;
    transform: translate(-50%,0);

}
</style>