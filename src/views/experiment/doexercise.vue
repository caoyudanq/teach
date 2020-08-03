<template>
  <div class="dndList">
    <div :style="{ width: width1 }" class="dndList-list">
      <h3>{{ missionTitle }}</h3>
      <div class="dragArea">
        <div v-for="(element, index) in missionlist" :key="element.id" class="list-complete-item">
          <div class="list-complete-item-handle">{{ index}}：{{ element }}</div>
          <div style="position:absolute;right:0px;">
            <span
              style="float: right;margin-top: -20px;margin-right:5px;"
              @click="getExercise(element, index)"
            >
              <i style="color:#ff4949" class="el-icon-edit-outline" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div :style="{ width: width2 }" class="dndList-list">
      <div class="dragArea" style="padding-left:30px">
        <div class="showExercise" v-if="mainpage">
          <h2>MIPS汇编指令及程序设计</h2>Write a function named func that does nothing and simply returns. The
          problems in this collection require you to write functions, rather
          than a program that simply ends with an infinite loop, unlike some
          other assembly
        </div>
        <div class="showExercise" v-else>
          <h3>{{ exerciseTitle }}</h3>

          <div id="title">
            <!-- <h4>{{ title }}</h4> -->
          </div>
          <div id="instructions">
            <h4>题目描述：</h4>
            <instructions :info="info"></instructions>
          </div>
          <!-- <div id="init">
            <h4>初始化：</h4>
            <init :init="init"></init>
          </div>-->
          <div id="io">
            <h4>输入/输出：</h4>
            <io :input="input" :output="output"></io>
          </div>
          <div id="codewrapper">
            <h4>代码：</h4>
            <code-mirror :codeClear="clear" @submitCode="submitCode" :codeModel="codeModel"></code-mirror>
          </div>
          <div id="result" v-if="showResult">
            <h4>coding result</h4>
            <result :result="result" :compile_info="compile_info" :compare_error="compare_error"></result>
            <signalWave
              :corWave="corWave"
              :stuAllWave="stuAllWave"
              :error_index="error_index"
              v-if="compileSuccess && showResult"
            ></signalWave>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchExercise } from "@/api/exercise_s";
import { codemirror } from "vue-codemirror";
import "codemirror/theme/neat.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
require("codemirror/mode/verilog/verilog"); // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import CodeMirror from "@/components/Exercise/editor.vue";
import Result from "@/components/Exercise/result.vue";
import Io from "@/components/Exercise/io.vue";
import Init from "@/components/Exercise/init.vue";
import Instructions from "@/components/Exercise/instructions.vue";
import signalWave from "@/components/Exercise/signalWave.vue";

import { commitExercise } from "@/api/exercise_s";
export default {
  name: "DndList",
  props: {
    missionlist: {
      type: Array,
      default() {
        return [];
      }
    },
    missionTitle: {
      type: String,
      default: ""
    },
    width1: {
      type: String,
      default: "30%"
    },
    width2: {
      type: String,
      default: "65%"
    }
  },
  data() {
    return {
      exerciseTitle: "",
      filterText: "",
      mainpage: true,
      compileSuccess: false,
      show: false,
      init: "",
      input: [],
      output: [],
      result: "",
      clear: false,
      compile_info: [],
      compare_error: [],
      error_index: [],
      codeModel: "`timescale 1ns/100ps\nmodule ",
      corWave: [],
      stuWave: [],
      showResult: false,
      stuAllWave: [],
      corAllWave: []
    };
  },
  methods: {
    isNotInList1(v) {
      return this.unfinishedlist.every(k => v.id !== k.id);
    },
    isNotInList2(v) {
      return this.finishedlist.every(k => v.id !== k.id);
    },
    deleteEle(ele) {
      for (const item of this.unfinishedlist) {
        if (item.id === ele.id) {
          const index = this.unfinishedlist.indexOf(item);
          this.unfinishedlist.splice(index, 1);
          break;
        }
      }
      if (this.isNotInList2(ele)) {
        this.unfinishedlist.unshift(ele);
      }
    },
    pushEle(ele) {
      for (const item of this.finishedlist) {
        if (item.id === ele.id) {
          const index = this.finishedlist.indexOf(item);
          this.finishedlist.splice(index, 1);
          break;
        }
      }
      if (this.isNotInList1(ele)) {
        this.unfinishedlist.push(ele);
      }
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData("Text", "");
    },
    getExercise(ele, index) {
      this.info = "";
      // this.init = "";
      // this.input = "";
      // this.output = "";
      this.result = "";
      this.info = [];
      this.error = [];
      this.compare_error = [];
      this.compile_info = [];
      this.corWave = [];
      this.stuAllWave = [];
      this.error_index = [];
      this.mainpage = false;
      this.codeModel = "`timescale 1ns/100ps\nmodule ";
      this.show = true;
      this.exerciseTitle = ele.title;
      this.clear = !this.clear;
      this.showResult = false;
      fetchExercise({
        id: index + 1
      }).then(response => {
        this.info = response.data.info;
        var io = JSON.parse(response.data.input);
        var moduleName = response.data.module_name;
        console.log("moduleName:", moduleName);
        this.codeModel = this.codeModel + moduleName + "(\n";
        this.input = io.input;
        this.output = io.output;
        this.input.forEach(item => {
          // console.log("item", item);
          this.codeModel = this.codeModel + "\tinput ";
          // console.log(this.codeModel);
          if (item.width > 1) {
            this.codeModel +=
              "[" + (item.width - 1) + " : " + "0] " + item.name + ",\n";
          } else {
            this.codeModel += item.name + ",\n";
          }
        });
        this.output.forEach((item, index, array) => {
          this.codeModel = this.codeModel + "\toutput " + item.type + " ";
          if (item.width > 1) {
            if (index === array.length - 1) {
              this.codeModel +=
                "[" + (item.width - 1) + " : " + "0] " + item.name + "\n);";
            } else {
              this.codeModel +=
                "[" + (item.width - 1) + " : " + "0] " + item.name + ",\n";
            }
          } else {
            if (index === array.length - 1) {
              this.codeModel = this.codeModel + item.name + "\n);";
            } else {
              this.codeModel = this.codeModel + item.name + ",\n";
            }
          }
        });
        this.codeModel = this.codeModel + "\n\n\n\n\nendmodule";
        this.mainpage = false;
        // JSON.stringify({
        //   input: [
        //     {
        //       name: "in1",
        //       width: 32,
        //       type: "wire"
        //     },
        //     {
        //       name: "in2",
        //       width: 32,
        //       type: "wire"
        //     },
        //     {
        //       name: "ALUctr",
        //       width: 4,
        //       type: "wire"
        //     }
        //   ],
        //   output: [
        //     {
        //       name: "Res",
        //       width: 32,
        //       type: "reg"
        //     },
        //     {
        //       name: "zero",
        //       width: 1,
        //       type: "reg"
        //     }
        //   ]
        // });
      });
    },
    submitCode(code) {
      this.info = [];
      var content = code;
      // console.log(typeof content);
      var query = {
        questionId: "1",
        assignmentId: "1",
        studentId: "201972177",
        content: code.code
      };
      commitExercise(query).then(res => {
        this.compare_error = [];
        this.compile_info = [];
        this.corWave = [];
        this.stuAllWave = [];
        this.error_index = [];

        // console.log(res.data);
        this.result = true;
        const compile_info = res.data.compile_info; // 编译不通过报错
        const compare_error = res.data.errorData; // 编译通过，结果不正确报错
        const score = res.data.score; // 分数
        const status = res.data.commit_status; //提交结果
        this.showResult = true;
        if (status === 0) {
          // 提交失败
          if (compare_error === null) {
            // 编译不通过
            this.compileSuccess = false;
            this.result = "Compile failed!";
            const index = compile_info.indexOf("code.v");
            const arr_compile_info = compile_info
              .split("\n")
              .filter(i => i && i.trim())
              .map(item => {
                return item.substr(index);
              })
              .filter(i => i && i.trim());
            console.log("arr_compile_info:", arr_compile_info);
            this.compile_info = arr_compile_info;
            // this.$set(this.compile_info, 0, arr_compile_info);
          } else {
            // 编译通过，结果不正确
            this.compileSuccess = true;
            this.result = "Compile Success! Your answer is wrong!";
            this.compare_error = compare_error;
            this.error_index = compare_error.map(item => {
              const arr = item.split(",");
              return parseInt(arr[0]);
            });
          }
          const [corWave, stuWave] = res.data.waveData;
          const arr1 = corWave.map(item => {
            return item.split(" ");
          });
          const newArray = arr1[0].map(function(col, i) {
            return arr1.map(function(row) {
              return row[i];
            });
          });
          newArray.shift();
          this.corWave = newArray;

          const stuAllWave = res.data.stuWaveData;
          const arr = stuAllWave.map(item => {
            return item.split(" ");
          });
          const newArrayStu = arr[0].map(function(col, i) {
            return arr.map(function(row) {
              return row[i];
            });
          });
          newArrayStu.shift();
          this.stuAllWave = newArrayStu;
        } else {
          this.result = "Success";
          this.compileSuccess = true;
          const stuAllWave = res.data.stuWaveData;
          const arr2 = stuAllWave.map(item => {
            return item.split(" ");
          });
          const newArray2 = arr2[0].map(function(col, i) {
            return arr2.map(function(row) {
              return row[i];
            });
          });
          newArray2.shift();
          this.stuAllWave = newArray2;
        }
        console.log("提交成功");
      });
    }
  },
  components: {
    CodeMirror,
    Result,
    Io,
    Init,
    Instructions,
    signalWave
  }
};
</script>

<style lang="scss" scoped>
.CodeMirror {
  height: auto;
  font-family: "Roboto Mono", monospace;
  font-size: 81.25%;
}
.CodeMirror-scroll {
  min-height: 180px;
}
#code {
  background-color: #f4f8ff;
  padding: 1ex 1em;
  border: 1px #999 solid;
  margin: 10px 0px 10px 0px;
}
.dndList {
  background: #fff;
  padding-bottom: 40px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .dndList-list {
    float: left;
    padding-bottom: 30px;
    &:first-of-type {
      margin-right: 2%;
    }
    .dragArea {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;
    }
  }
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 5px 12px;
  margin-top: 4px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-item.sortable-chosen {
  background: #4ab7bd;
}

.list-complete-item.sortable-ghost {
  background: #30b08f;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
