<!-- 波形显示组件 -->
<template>
  <div class="wrap">
    <div class="waveType">[{{title}}]</div>
    <div class="outter" v-for="(item, index) in waveData" :key="index">
      <div class="title">{{item[0]}}:</div>
      <div v-for="(signal, index1) in item" :key="index1" class="inner">
        <span
          v-bind:class="[errorIndex.includes(index1)? 'containerLeftError': 'containerLeft']"
          v-if="index1!==0 && (index1!==1 && item[index1] === item[index1-1] && (index1 === item.length-1 || item[index1] !== item[index1+1]))"
        >{{signal}}</span>
        <span
          v-bind:class="[errorIndex.includes(index1)? 'containerRightError': 'containerRight']"
          v-if="index1!==0 && index1!==item.legth-1 && ((index1 === 1 && item[index1] === item[index1+1]) || (index1 !== 1 && item[index1] !== item[index1-1] && item[index1] === item[index1+1]))"
        >{{signal}}</span>
        <span
          v-bind:class="[errorIndex.includes(index1)? 'containerError': 'container']"
          v-if="index1!==0 && ((index1 === 1 && index1 !== item.length -1 && index1 !== item.length -2 && item[index1] !== item[index1+1]) || (index1 !== 1 && index1 === item.length -1 && index1 !== 2 && item[index1] !== item[index1-1]) || (index1 !== 1 && index1 !== item.length -1 && item[index1] !== item[index1-1] && item[index1] !== item[index1+1]))"
        >{{signal}}</span>
        <span
          v-bind:class="[errorIndex.includes(index1)? 'containerBothError': 'containerBoth']"
          v-if="index1!==0 && (index1!==1 &&index1!==item.length-1  && item[index1] === item[index1-1] && item[index1] === item[index1+1])"
        >{{signal}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      correctWave: [],
      studentWave: [],
      axis: [],
      signalName: "",
      datas: []
    };
  },
  props: {
    waveData: {
      type: Array,
      default() {
        return [];
      }
    },
    title: {
      type: String,
      default: ""
    },
    errorIndex: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  mounted() {
    console.log("wave mounted");
    console.log(this.waveData);
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
.wrap {
  font-size: 11pt;
  background: transparent;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  color: #bbc0c7;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  position: relative;
  .waveType {
    position: absolute;
    font-size: 8pt;
    line-height: 26px;
    height: 26px;
    line-height: 26px;
  }
  .outter {
    display: flex;
    flex-direction: row;
    .title {
      height: 26px;
      line-height: 26px;
      margin-top: 30px;
      width: 60px;
    }
    .inner {
      display: flex;
      flex-direction: row;
      .container {
        font-size: 8pt;
        margin: 0 12px;
        width: 50px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        position: relative;
        border-top: 1px solid #6fb14e;
        border-bottom: 1px solid #6fb14e;
        display: inline-block;
        margin-top: 30px;
      }
      .container:before {
        content: "";
        position: absolute;
        top: 3px;
        left: -9px;
        width: 18px;
        border-top: 1px solid #6fb14e;
        height: 18px;
        border-right: 1px solid #6fb14e;
        transform: rotate(-135deg);
      }
      .container:after {
        content: "";
        position: absolute;
        top: 3px;
        right: -9px;
        width: 18px;
        border-top: 1px solid #6fb14e;
        height: 18px;
        border-right: 1px solid #6fb14e;
        transform: rotate(45deg);
      }
      .containerRight {
        font-size: 8pt;
        margin: 0 12px;
        width: 50px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        position: relative;
        border-top: 1px solid #6fb14e;
        border-bottom: 1px solid #6fb14e;
        display: inline-block;
        margin-top: 30px;
      }
      .containerRight:before {
        content: "";
        position: absolute;
        top: 3px;
        left: -9px;
        width: 18px;
        border-top: 1px solid #6fb14e;
        height: 18px;
        border-right: 1px solid #6fb14e;
        transform: rotate(-135deg);
      }
      .containerRight:after {
        content: "";
        position: absolute;
        top: -1px;
        right: -12px;
        width: 12px;
        border-top: 1px solid #6fb14e;
        border-bottom: 1px solid #6fb14e;
        height: 26px;
      }
      .containerLeft {
        font-size: 8pt;
        margin: 0 12px;
        width: 50px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        position: relative;
        border-top: 1px solid #6fb14e;
        border-bottom: 1px solid #6fb14e;
        display: inline-block;
        margin-top: 30px;
      }
      .containerLeft:before {
        content: "";
        position: absolute;
        top: -1px;
        left: -12px;
        width: 12px;
        border-top: 1px solid #6fb14e;
        height: 26px;
        border-bottom: 1px solid #6fb14e;
      }
      .containerLeft:after {
        content: "";
        position: absolute;
        top: 3px;
        right: -9px;
        width: 18px;
        border-top: 1px solid #6fb14e;
        border-right: 1px solid #6fb14e;
        height: 18px;
        transform: rotate(45deg);
      }
      .containerBoth {
        font-size: 8pt;
        margin: 0 12px;
        width: 50px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        position: relative;
        border-top: 1px solid #6fb14e;
        border-bottom: 1px solid #6fb14e;
        display: inline-block;
        margin-top: 30px;
      }
      .containerBoth:before {
        content: "";
        position: absolute;
        top: -1px;
        left: -12px;
        width: 12px;
        border-top: 1px solid #6fb14e;
        height: 26px;
        border-bottom: 1px solid #6fb14e;
      }
      .containerBoth:after {
        content: "";
        position: absolute;
        top: -1px;
        right: -12px;
        width: 12px;
        border-top: 1px solid #6fb14e;
        border-bottom: 1px solid #6fb14e;
        height: 26px;
      }

      .containerError {
        font-size: 8pt;
        margin: 0 12px;
        width: 50px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        position: relative;
        border-top: 1px solid #920606;
        border-bottom: 1px solid #920606;
        display: inline-block;
        margin-top: 30px;
      }
      .containerError:before {
        content: "";
        position: absolute;
        top: 3px;
        left: -9px;
        width: 18px;
        border-top: 1px solid #920606;
        height: 18px;
        border-right: 1px solid #920606;
        transform: rotate(-135deg);
      }
      .containerError:after {
        content: "";
        position: absolute;
        top: 3px;
        right: -9px;
        width: 18px;
        border-top: 1px solid #920606;
        height: 18px;
        border-right: 1px solid #920606;
        transform: rotate(45deg);
      }
      .containerRightError {
        font-size: 8pt;
        margin: 0 12px;
        width: 50px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        position: relative;
        border-top: 1px solid #920606;
        border-bottom: 1px solid #920606;
        display: inline-block;
        margin-top: 30px;
      }
      .containerRightError:before {
        content: "";
        position: absolute;
        top: 3px;
        left: -9px;
        width: 18px;
        border-top: 1px solid #920606;
        height: 18px;
        border-right: 1px solid #920606;
        transform: rotate(-135deg);
      }
      .containerRightError:after {
        content: "";
        position: absolute;
        top: -1px;
        right: -12px;
        width: 12px;
        border-top: 1px solid #920606;
        border-bottom: 1px solid #920606;
        height: 26px;
      }
      .containerLeftError {
        font-size: 8pt;
        margin: 0 12px;
        width: 50px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        position: relative;
        border-top: 1px solid #920606;
        border-bottom: 1px solid #920606;
        display: inline-block;
        margin-top: 30px;
      }
      .containerLeftError:before {
        content: "";
        position: absolute;
        top: -1px;
        left: -12px;
        width: 12px;
        border-top: 1px solid #920606;
        height: 26px;
        border-bottom: 1px solid #920606;
      }
      .containerLeftError:after {
        content: "";
        position: absolute;
        top: 3px;
        right: -9px;
        width: 18px;
        border-top: 1px solid #920606;
        border-right: 1px solid #920606;
        height: 18px;
        transform: rotate(45deg);
      }
      .containerBothError {
        font-size: 8pt;
        margin: 0 12px;
        width: 50px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        position: relative;
        border-top: 1px solid #920606;
        border-bottom: 1px solid #920606;
        display: inline-block;
        margin-top: 30px;
      }
      .containerBothError:before {
        content: "";
        position: absolute;
        top: -1px;
        left: -12px;
        width: 12px;
        border-top: 1px solid #920606;
        height: 26px;
        border-bottom: 1px solid #920606;
      }
      .containerBothError:after {
        content: "";
        position: absolute;
        top: -1px;
        right: -12px;
        width: 12px;
        border-top: 1px solid #920606;
        border-bottom: 1px solid #920606;
        height: 26px;
      }
    }
  }
  .title {
    font-size: 8pt;
    line-height: 26px;
  }
}
</style>
