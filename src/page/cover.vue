<template>
  <div>
    <canvas id="mycanvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "cover",
  data(){
    let sum=new Image();
    let moon=new Image();
    let earth=new Image();
    sum.src='../../static/p/sum.png'
    moon.src='../../static/p/moon.png'
    earth.src='../../static/p/earth.png'
    return {
      sum:sum,
      moon:moon,
      earth:earth
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    init(){
      let reqAnimFrame = window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame     ||
        window.oRequestAnimationFrame
      ;
      reqAnimFrame(this.EarthMoonSystem);
    },
    EarthMoonSystem () {
      let w=window.innerWidth
      let h=window.innerHeight
      let r=100,mr=3
      var ctx = document.getElementById('mycanvas').getContext('2d');

      document.getElementById('mycanvas').width=w
      document.getElementById('mycanvas').height=h

      ctx.globalCompositeOperation = 'destination-over';
      ctx.clearRect(0,0,w,h); // clear canvas

      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.strokeStyle = 'rgba(0,153,255,0.4)';
      ctx.save();
      ctx.translate(w/2,h/2);

      //Earth
      var time = new Date();
      ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
      //ctx.translate(w/2-r,0);
      //ctx.fillRect(0,-12,50,24); // Shadow
      ctx.drawImage(this.$data.earth,(this.$data.sum.height-this.$data.earth.height)/2-r,(this.$data.sum.height-this.$data.earth.height)/2+r);

      // Moon
       ctx.save();
      ctx.translate((this.$data.sum.height-this.$data.earth.height)/2-r,(this.$data.sum.height-this.$data.earth.height)/2+r);
       ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
       //ctx.translate(0,mr);
       ctx.drawImage(this.$data.moon,this.$data.moon.height/2-mr,this.$data.moon.height/2);
       ctx.restore();

      ctx.restore();

      ctx.beginPath();
      ctx.arc(w/2,h/2,(this.$data.sum.height)/2+r,0,Math.PI*2,false); // Earth orbit
      ctx.stroke();

      ctx.drawImage(this.$data.sum,(w-this.$data.sum.width)/2,(h-this.$data.sum.height)/2);

      let reqAnimFrame = window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame     ||
        window.oRequestAnimationFrame
      ;
      reqAnimFrame(this.EarthMoonSystem);
    }
  }
}
</script>

<style scoped>

</style>
