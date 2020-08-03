<!-- 输入输出 -->
<template>
  <div class="io">
    <div id="input">
      输入：
      <div v-for="(item, index) in input" :key="index">
        <span>input</span>
        <span v-if="!(item.width-1 === 0)">[{{item.width -1 }} : 0]</span>
        <span class="portname">{{item.name}}</span>
      </div>
    </div>
    <div id="output" style="padding-top: 10px">
      输出：
      <div v-for="(item, index) in output" :key="index">
        <span>output reg</span>
        <span v-if="!(item.width-1 === 0)">[{{item.width -1 }} : 0]</span>
        <span class="portname">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showWidth: true
    };
  },
  props: {
    input: {
      type: Array,
      default() {
        return [];
      }
    },
    output: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  components: {},

  computed: {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.io {
  font-size: 11pt;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  // width: 600px;
  background-color: #f4f8ff;
  padding: 1ex 1em;
  border: 1px #999 solid;
  margin: 10px 0px 10px 0px;
}
.portname {
  color: cadetblue;
}
</style>
