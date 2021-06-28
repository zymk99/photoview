<template>
  <div class="homemain">
    <fence :photo="photolist"></fence>
  </div>
</template>

<script>
import fence from '../components/fence'
import {photolist} from '../javascript/photolist'
export default {
  name: "home",
  components:{
    fence
  },
  data(){
    return{
      photolist:photolist
    }
  }
}
</script>

<style scoped>

</style>
