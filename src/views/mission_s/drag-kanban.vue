<template>
  <div class="components-container board">
    <Kanban :key="1" :list="list1" :group="group" class="kanban practice" header-text="练习" />
    <Kanban :key="2" :list="list2" :group="group" class="kanban homework" header-text="作业" />
    <Kanban :key="3" :list="list3" :group="group" class="kanban examination" header-text="考试" />
  </div>
</template>
<script>
import Kanban from "@/components/Kanban";

export default {
  name: "DragKanbanDemo",
  components: {
    Kanban
  },
  data() {
    return {
      group: "mission",
      list1: [
        { name: "Mission", id: 1 },
        { name: "Mission", id: 2 },
        { name: "Mission", id: 3 },
        { name: "Mission", id: 4 }
      ],
      list2: [
        { name: "Mission", id: 5 },
        { name: "Mission", id: 6 },
        { name: "Mission", id: 7 }
      ],
      list3: [
        { name: "Mission", id: 8 },
        { name: "Mission", id: 9 },
        { name: "Mission", id: 10 }
      ]
    };
  }
};
</script>
<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.practice {
    .board-column-header {
      background: #4a9ff9;
    }
  }
  &.homework {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.examination {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>

