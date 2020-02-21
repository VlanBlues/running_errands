<template>
    <div class="back-top">
        <img src="../../assets/img/back/backtop2.png" height="200" width="200"/>
    </div>
</template>

<script>
    export default {
        name: "BackTop"
    }
</script>

<style scoped>
    .back-top{
        position: fixed;
        z-index: 10;
        right: 20px;
        bottom: 60px;
    }
    .back-top img{
        width: 40px;
        height: 40px;
    }
</style>