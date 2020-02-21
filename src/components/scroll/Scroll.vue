<template>
    <div class="bscroll" ref="bscroll">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        props:{
            probeType:{
                type: Number,
                default: 0
            }
        },
        data(){
            return{
                scroll: null
            }
        },
        methods:{
            backTo(x,y,time=500){
                this.scroll.scrollTo(x,y,time)
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.bscroll,{
                    click: true,
                    probeType: this.probeType
                    // pullUpLoad: true
                });
                //监听滚动位置
                this.scroll.on('scroll',(position)=>{
                    // console.log(position);
                    //把值传出去
                    this.$emit('scroll',position)
                });
                /*this.scroll.on('pullingUp',()=>{
                    console.log('上拉加载更多');
                })*/
            })
        },
    }
</script>

<style scoped>

</style>