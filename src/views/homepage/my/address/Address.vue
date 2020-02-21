<template>
    <div>
        <van-nav-bar title="地址" 
                     left-arrow
                     @click-left="onClickLeft"/>
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                @add="onAdd"
                @edit="onEdit"
                @select="onSelect"
        />
    </div>
</template>

<script>
    export default {
        name: "Address",
        data() {
            return {
                chosenAddressId: '1',
                list: []
            }
        },
        activated(){
            this.$api.post('/address/get_addr_uid',{
                id:this.$store.state.user.id
            },response =>{
                this.list = response.data;
                for(let i in response.data){
                    if(response.data[i].isDefault === 'true'){
                        this.chosenAddressId = response.data[i].id
                        return
                    }
                }
            },err =>{
                console.log('err');
            })
        },
        methods: {
            onClickLeft(){
                this.$router.back()
            },
            onAdd() {
                this.$router.push({
                    name:'add',
                    params:{
                        item:'null'
                    }
                })
                
            },
            onEdit(item, index) {
                // this.$toast('新增地址'+index)
                this.$router.push({
                    name:'add',
                    params:{
                        item:this.list[index]
                    }
                })
            },
            onSelect(item, index){
                this.$api.post('/address/up_addr_default?id='+item.id+'&uid='+this.$store.state.user.id,{
                },response =>{
                    this.$store.commit('upAddress',response.data);
                },err =>{
                    console.log('err');
                })
                
            }
        }
    }
</script>

<style scoped>

</style>