<!-- 波形显示组件 -->
<template>
  <div class="wrap">
    <div>wave:</div>
    <div v-for="(item, index) in correctWave" :key="index" class="container">{{item}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      correctWave: [],
      studentWave: [],
      axis: [],
      signalName: ""
    };
  },
  props: {
    corWave: {
      type: Array,
      default() {
        return [];
      }
    },
    stuWave: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  watch: {
    corWave() {
      var arr = [...this.corWave];
      var name = arr.shift();
      const index = name.indexOf(" ");
      this.signalName = name.substr(0, index);
      this.correctWave = arr.map(item => {
        const index = item.indexOf(" ");
        return item.substr(index + 1);
      });
      this.axis = arr.map(item => {
        const index = item.indexOf(" ");
        return item.substr(0, index);
      });
      // console.log(this.correctWave);
    },
    stuWave() {
      // this.correctWave = this.corWave;
      console.log("watch jjjjjjjjjjjjjjj");
      // console.log(this.correctWave);
    }
  },

  mounted() {
    console.log("wave mounted");
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
.wrap {
  font-size: 11pt;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  // width: 600px;
  background-color: #f4f8ff;
  padding: 1ex 1em;
  border: 1px #999 solid;
  margin: 10px 0px 10px 0px;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 0;
  overflow: scroll;
  .container {
    font-size: 8pt;
    margin: 0 12px;
    width: 50px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    position: relative;
    border-top: 1px solid #00f;
    border-bottom: 1px solid #00f;
    display: inline-block;
  }
  .container:before {
    content: "";
    position: absolute;
    top: 3px;
    left: -9px;
    width: 18px;
    border-top: 1px solid #00f;
    height: 18px;
    border-right: 1px solid #00f;
    transform: rotate(-135deg);
  }
  .container:after {
    content: "";
    position: absolute;
    top: 3px;
    right: -9px;
    width: 18px;
    border-top: 1px solid #00f;
    height: 18px;
    border-right: 1px solid #00f;
    transform: rotate(45deg);
  }
}
</style>
