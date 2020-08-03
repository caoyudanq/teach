<!-- 波形显示组件 -->
<template>
  <div class="wapper">
    <wave :waveData="corWave" :title="corTitle" ref="corWave" v-if="corWave.length>0"></wave>
    <wave :waveData="stuAllWave" :title="stuTitle" ref="stuWave" :errorIndex="error_index"></wave>
  </div>
</template>

<script>
import Wave from "@/components/Signal/index.vue";
export default {
  data() {
    return {
      stuTitle: "你的波形",
      corTitle: "正确波形"
    };
  },
  components: {
    Wave
  },
  props: {
    corWave: {
      type: Array,
      default() {
        return [];
      }
    },
    stuAllWave: {
      type: Array,
      default() {
        return [];
      }
    },
    error_index: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    console.log("wave mounted");
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
.wapper {
  font-size: 11pt;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  background-color: #000000;
  border: 1px #999 solid;
  color: #bbc0c7;
  overflow: scroll;
  padding: 2ex 1em;
  height: 300px;
}
</style>
