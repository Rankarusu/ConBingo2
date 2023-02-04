<template>
  <ion-list>
    <DynamicScroller :items="sortedFields" :min-item-size="47" class="scroller">
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :key="item.id"
          :item="item"
          :active="active"
          :size-dependencies="[item.text]"
          :data-index="index"
        >
          <BingoFieldListItem :id="item.id!" :key="item.id" :text="item.text">
          </BingoFieldListItem>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </ion-list>
  <ion-button expand="block" color="danger" @click="$emit('resetFieldsEvent')">
    Reset Fields
  </ion-button>
</template>

<script lang="ts" setup>
import { useFieldsStore } from '@/stores/fieldsStore';
import { IonButton, IonList, onIonViewDidEnter } from '@ionic/vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';

import { storeToRefs } from 'pinia';
//false positive
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransitionGroup } from 'vue';
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
