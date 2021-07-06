<template>
  <div>
    <img :src="photo" @click="nextP()"/>
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
      maxPageNum:1,
      index:null
    }
  },
  mounted() {
    document.onkeydown=this.bindHotKey;
    //获取页面参数
    let q=this.$route.query;
    this.$data.currPageNum= q.currPageNum==null? 1 :q.currPageNum;
    this.$data.index= q.index==null? null :q.index;
    this.getPhoto()
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
      if (e && e.keyCode == 37) {
        if(this.$data.currPageNum<=1){
          return
        }
        this.$data.currPageNum=parseInt(this.$data.currPageNum)-1
        this.changeURLArg("currPageNum",this.$data.currPageNum)
      } else if (e && e.keyCode == 39) {
        this.nextP()
      }else{return;}
      if(curr == this.$data.currPageNum){
        return;
      }
      this.$data.currPageNum=curr;
    },
    //获取图片
    getPhoto:function(){
      let that=this
      let par={}
      par.index=this.$data.index
      par._page=this.$data.currPageNum
      axios.post('http://localhost/photoserver/photo/getPhotoByIndex',par).then(e=>{
        if(e){
          let v=e.data[0]
          that.$data.maxPageNum= v.lastPage
          let base64=v.url
          let bytes = window.atob(base64);
          let ab = new ArrayBuffer(bytes.length);
          let ia = new Uint8Array(ab);
          for (let j = 0; j < bytes.length; j++) {
            ia[j] = bytes.charCodeAt(j);
          }
          that.$data.photo=URL.createObjectURL(new Blob([ab]))
        }
      })
    },
    //修改地址栏参数
    changeURLArg:function(arg,arg_val){
      let U=window.location.href;
      let pattern=arg+'=([^&]*)';
      let replaceText=arg+'='+arg_val;
      let val=""
      if(U.match(pattern)){
        let tmp='/('+ arg+'=)([^&]*)/gi';
        tmp=U.replace(eval(tmp),replaceText);
        val= tmp;
      }else{
        if(U.match('[\?]')){
          val= U+'&'+replaceText;
        }else{
          val= U+'?'+replaceText;
        }
      }
      window.location.href=val
    },
    //下一张图
    nextP:function(){
      if(this.$data.currPageNum>=this.$data.maxPageNum){
        return
      }
      this.$data.currPageNum= parseInt(this.$data.currPageNum)+1
      this.changeURLArg("currPageNum",this.$data.currPageNum)
    }
  }

}
</script>

<style scoped>

</style>
