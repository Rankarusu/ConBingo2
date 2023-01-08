<template>
  <ion-list>
    <TransitionGroup name="list">
      <BingoFieldListItem
        v-for="item in props.fields"
        v-show="filterField(item.text)"
        :id="item.id!"
        :key="item.id"
        :text="item.text"
      >
      </BingoFieldListItem>
    </TransitionGroup>
  </ion-list>
</template>

<script lang="ts" setup>
import { IonList } from '@ionic/vue';
import BingoFieldListItem from './BingoFieldListItem.vue';
import { DbBingoField } from '@/models/DbBingoField';
import { defineComponent, TransitionGroup } from 'vue';

interface BingoFieldListProps {
  fields?: DbBingoField[];
  filter: string;
}
const props = defineProps<BingoFieldListProps>();

function filterField(fieldText: string) {
  return fieldText.toLowerCase().indexOf(props.filter) > -1;
}
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/*  */
.list-leave-active {
  position: absolute;
}
</style>
