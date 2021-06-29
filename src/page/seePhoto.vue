<template>
  <div>
    <img :src="photo"/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "seePhoto",
  data(){
    return {
      photo:'../../static/p/3ce1ff500f5f651fd4fd2bef9484305e0515b2f7102eb-h889NG_fw1200.jpg',
      lock: false,
      currPageNum:1,
      maxPageNum:30,
      dirid:null
    }
  },
  mounted() {
    let t=this.$route.query.title;
    let that=this;
    document.onkeydown=this.bindHotKey;
    //获取页面参数
    let q=this.$route.query;
    this.$data.currPageNum= q.curr==null? 1 :q.curr;
    this.$data.dirid= q.dirid==null? null :q.dirid;
    let par={}
    par.dirid=this.$data.dirid
    par.curr=this.$data.currPageNum
    axios.post('',par).then(e=>{

    })
  },
  methods:{
    //页面键盘事件
    bindHotKey:function(e){
      if(this.$data.lock){
        return
      }
      let max=this.$data.maxPageNum;
      let curr=this.$data.currPageNum;
      //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
      //左
      if (e && e.keyCode == 37) {
        curr = curr>1? curr-1:1;
      } else if (e && e.keyCode == 39) {
        curr = curr<max? curr+1:max;
      }else{return;}
      if(curr == this.$data.currPageNum){
        return;
      }
      this.$data.currPageNum=curr;
    }
  }

}
</script>

<style scoped>

</style>
