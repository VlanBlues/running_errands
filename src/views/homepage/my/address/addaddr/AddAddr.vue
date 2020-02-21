<template>
    <div>
        <van-nav-bar title="添加地址"left-arrow
                     @click-left="onClickLeft"/>
        <van-address-edit
                :area-list="areaList"
                :address-info="addressInfo"
                show-delete
                show-set-default
                show-search-result
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
                v-show="isShow"
        />
        <van-address-edit
                :area-list="areaList"
                show-delete
                show-set-default
                show-search-result
                @save="onSave"
                @change-detail="onChangeDetail"
                v-show="!isShow"
        />
        <div style="z-index: 10; width: 100%;height: 50px;position: fixed;bottom: 0;left: 0;right: 0;background: #f5f5f5">
            
        </div>
    </div>
</template>

<script>
    import areaList from "@/assets/js/area.js";
    export default {
        name: "AddAddr",
        data() {
            return {
                areaList,
                isShow:true,
                addressInfo:{
                    areaCode:'330203'
                }
            }
        },
        created(){
            if(this.$route.params.item === 'null'){
                this.isShow = false
            }else {
                this.addressInfo = this.$route.params.item
                this.addressInfo.areaCode = this.addressInfo.areaCode+''
            }
            console.log(this.addressInfo);
        },
        methods: {
            onClickLeft(){
                this.$router.back()
            },
            onSave(content) {
                this.$api.post('/address/add', {
                    'name':content.name,
                    'tel':content.tel,
                    'isDefault':content.isDefault,
                    'addressDetail':content.addressDetail,
                    'areaCode':content.areaCode,
                    'address':content.province+content.city+content.county+content.addressDetail,
                    'uid':this.$store.state.user.id
                }, response => {
                    if(response.data=== 1){
                        this.$toast.success('保存成功');
                    }else {
                        this.$toast.fail('保存失败')
                    }
                }, err => {
                    console.log('err');
                })

            },
            onDelete() {
                this.$toast('delete')
                this.$api.post('/address/del_by_id?id='+this.addressInfo.id, {
                    
                }, response => {
                    if(response.data=== 1){
                        this.$toast.success('删除成功');
                        this.$router.back()
                    }else {
                        this.$toast.fail('删除失败')
                    }
                }, err => {
                    console.log('err');
                })
                
            },
            onChangeDetail(val) {
                
            }
        }
    }
</script>

<style scoped>
    
</style>