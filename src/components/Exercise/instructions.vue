<!-- 初始化 -->
<template>
  <div class="instructions">
    <span>题目描述：</span>
    <span v-if="instructions">{{instructions}}</span>
    <span v-else>无</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    instructions: {
      type: String,
      default: ""
    }
  },

  components: {},

  computed: {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.instructions {
  font-size: 11pt;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  // width: 600px;
  background-color: #f4f8ff;
  padding: 1ex 1em;
  border: 1px #999 solid;
  margin: 10px 0px 10px 0px;
}
</style>
