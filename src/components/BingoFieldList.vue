<template>
  <ion-list>
    <TransitionGroup name="list">
      <BingoFieldListItem
        v-for="item in sortedFields"
        v-show="filterField(item.text)"
        :id="item.id!"
        :key="item.id"
        :text="item.text"
      >
      </BingoFieldListItem>
    </TransitionGroup>
  </ion-list>
  <ion-button expand="block" color="danger" @click="$emit('resetFieldsEvent')">
    Reset Fields
  </ion-button>
</template>

<script lang="ts" setup>
import { useFieldsStore } from '@/stores/fieldsStore';
import { IonButton, IonList } from '@ionic/vue';
import { storeToRefs } from 'pinia';
//false positive
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransitionGroup } from 'vue';
import BingoFieldListItem from './BingoFieldListItem.vue';

defineEmits(['resetFieldsEvent']);

const store = useFieldsStore();
const { sortedFields } = storeToRefs(store);

interface BingoFieldListProps {
  filter: string;
}
const props = defineProps<BingoFieldListProps>();

function filterField(fieldText: string) {
  return fieldText.toLowerCase().indexOf(props.filter) > -1;
}
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
