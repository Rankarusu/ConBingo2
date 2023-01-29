<template>
  <ion-list>
    <TransitionGroup name="list">
      <BingoFieldListItem
        v-for="item in reactiveFields"
        v-show="filterField(item.text)"
        :id="item.id!"
        :key="item.id"
        :text="item.text"
      >
      </BingoFieldListItem>
    </TransitionGroup>
    <ion-infinite-scroll @ion-infinite="ionInfinite">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </ion-list>
  <ion-button expand="block" color="danger" @click="$emit('resetFieldsEvent')">
    Reset Fields
  </ion-button>
</template>

<script lang="ts" setup>
import { BingoField } from '@/models/BingoField';
import { useFieldsStore } from '@/stores/fieldsStore';
import {
  IonButton,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/vue';

import { storeToRefs } from 'pinia';
//false positive
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onMounted, reactive, TransitionGroup } from 'vue';
import BingoFieldListItem from './BingoFieldListItem.vue';

interface BingoFieldListProps {
  filter: string;
}
const props = defineProps<BingoFieldListProps>();

const store = useFieldsStore();
const { sortedFields } = storeToRefs(store);

defineEmits(['resetFieldsEvent']);

function filterField(fieldText: string) {
  return fieldText.toLowerCase().indexOf(props.filter) > -1;
}

const reactiveFields = reactive<BingoField[]>([]);
function generateItems() {
  const start = reactiveFields.length;
  const end = sortedFields.value.length;
  console.log(start, end);
  for (let i = start; i < start + 15; i++) {
    if (i === end) {
      break;
    }
    reactiveFields.push(sortedFields.value[i]);
  }
}

const ionInfinite = (ev: any) => {
  generateItems();
  setTimeout(() => ev.target.complete(), 500);
};

onMounted(() => {
  generateItems();
});
</script>

<style scoped>
ion-button {
  margin: 20px;
}

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
.list-leave-active {
  position: absolute;
}
</style>
