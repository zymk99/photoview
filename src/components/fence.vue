<template>
  <div class="fencemain">
    <a class="canclick" href="" target="_blank"></a>
    <ul class="mainul">
      <li v-for="(item,index) in listvalue" v-bind:key="index" class="fencecell" @click="photoclick(item.index)">
        <img :src="item.src"/>
        <span>{{item.title}}</span>
      </li>
    </ul>
    <div class="pageButtom">
      <div class="pagefirst" :class="[currPage==1?'notclick':'canclick']" @click="currPage!=1 &&choosepage(1)">首</div>
      <ul class="pageul">
        <li v-for="(item,index) in pagelist" v-bind:key="index" :class="[pagelist[index]==currPage?'notclick':'canclick']" @click="pagelist[index]!=currPage &&choosepage(pagelist[index])">
          {{ item }}
        </li>
      </ul>

      <div class="pagelast" :class="[currPage==maxPage?'notclick':'canclick']"  @click="currPage!=maxPage &&choosepage(maxPage)">尾</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {photorestdata} from '../javascript/photorestdata'
export default {
  name: "fence",
  data(){
    return {
      listvalue : [],
      maxPage : 30,      //总页数
      currPage : 1,       //当前页数
      viewPage: 6,        //目录列表显示的数目
      onePageNum:15,    //单页显示数目
      pagelist:[] ,    //页数的列表
    }
  },
  props:{
    photo : Array
  },
  mounted(){
    //this.$data.listvalue.push( ... this.photo);
    this.choosepage(1);
  },
  methods:{
    //翻页-跟新页数
    updatePage:function(){
      let max=this.$data.viewPage;
      let v_max=this.$data.maxPage;
      let curr=this.$data.currPage;
      let num=[];
      let c=0;
      for(let i=curr;i>0 && c<parseInt(max/2);c++,i--){
        num.push(i);
      }
      for(let i=curr+1,n=0;n<max-c && i<=v_max;n++,i++){
        num.push(i);
      }
      num.sort((a,b)=>{
        return a-b;
      });
      this.$data.pagelist=num
    },
    //翻页跟新图片
    updatePagePhoto:function(){
      let par={};
      par.pageNum=this.$data.onePageNum;
      par.pageSize=this.$data.currPage;
      let that=this;
      axios.post("http://localhost/photoserver/photo/getPhotoList",par).then(arg=>{
        if(arg==null || arg.data==null || arg.data.length==0){
          that.$data.listvalue=that.photo;
          this.updatePage();
          return;
        }
        let tmp=arg.data[0]
        that.$data.maxPage=tmp.pageMax
        let plist=tmp.list;
        for(let i=0;i<plist.length;i++){
          let base64=plist[i].url
          let bytes = window.atob(base64);
          let ab = new ArrayBuffer(bytes.length);
          let ia = new Uint8Array(ab);
          for (let j = 0; j < bytes.length; j++) {
            ia[j] = bytes.charCodeAt(j);
          }
          plist[i].src=URL.createObjectURL(new Blob([ab]))
          plist[i].url=""
        }
        that.$data.listvalue=plist
        that.updatePage();
      })
    },
    //点击页数
    choosepage:function(index){
      this.$data.currPage=index;
      this.updatePagePhoto();
    },
    //点击图片
    photoclick:function(index){
      let taga=document.getElementsByClassName('canclick')[0];
      taga.setAttribute('href','/photo/see?currPageNum=1&index='+index);
      taga.click();
    }
  }
}
</script>

<style scoped>
  .canclick{
    display: none;
  }
  .fencemain{
    display: grid;
    place-items: center;
  }
  .fencecell{
    float: left;
    width: 18%;
    border: 1px #ccc solid;
    height: 350px;
    margin: 0 1% 20px 0;
    border-radius: 15px;
  }
  .fencecell img{
    padding: 2%;
    width: 90%;
    height: 85%;
    margin: 2% 3% 1%;
    border-radius: 10px;
  }
  .fencemain mainul{
    list-style: none;
    width: 75%;
  }
  .mainul li{
    overflow: hidden;
    place-items: center;
    background: #777;
  }
  .pageul li, .pagefirst, .pagelast{
    width: 40px;
    height: 40px;
    border: 1px #ccc solid;
    border-radius: 5px;
    display: grid;
    place-items: center;
    margin-right: 30px;
  }
  .pageul li{
    float: left;
  }
  .pageul{
    list-style: none;
    grid-column:2/8;
    margin: 0;
    padding: 0;
  }
  .pagefirst{
    grid-column:1/2;
  }
  .pagelast{
    grid-column:8/9;
  }
  .pageButtom{
    display: grid;
    margin-bottom: 30px;
  }
  .canclick:hover{
    cursor: pointer;
    color:rgb(57,118,233);
  }
  .notclick{
    color:#ccc;
  }
</style>
