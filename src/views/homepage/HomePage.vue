<template>
    <div>
        <keep-alive exclude="AddAddr">
            <router-view />
        </keep-alive>
        <van-tabbar v-model="active" active-color="#1296db" router>
            <van-tabbar-item to="/home_page/run_page">
                <span>跑腿</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon.active[0] : icon.normal[0]"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/home_page/order">
                <span>订单</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon.active[1] : icon.normal[1]"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/home_page/my">
                <span>我的</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon.active[2] : icon.normal[2]"
                >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "HomePage",
        data() {
            return {
                active: 0,
                icon: {
                    normal: [
                        require('../../assets/img/tabbar/run_normal.png'),
                        require('../../assets/img/tabbar/order_normal.png'),
                        require('../../assets/img/tabbar/my_normal.png')
                    ],
                    active: [
                        require('../../assets/img/tabbar/run_avtive.png'),
                        require('../../assets/img/tabbar/order_active.png'),
                        require('../../assets/img/tabbar/my_active.png')
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>