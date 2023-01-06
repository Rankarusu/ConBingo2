<template>
  <ion-list>
    <BingoFieldListItem
      v-for="item in props.fields"
      :id="item.id!"
      :key="item.id"
      :text="item.text"
    >
    </BingoFieldListItem>
  </ion-list>
  <ion-item-divider />

  <ion-item lines="none">
    <ion-label class="ion-text-center">
      {{ props.fields?.length }} Fields
    </ion-label>
  </ion-item>

  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button>
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
  <!-- <ion-infinite-scroll @ion-infinite="ionInfinite">
    <ion-infinite-scroll-content
      loading-spinner="bubbles"
    ></ion-infinite-scroll-content>
  </ion-infinite-scroll> -->
</template>

<script setup lang="ts">
import BingoFieldListItem from './BingoFieldListItem.vue';
import { IonList } from '@ionic/vue';
import { add } from 'ionicons/icons';

import { DbBingoField } from '@/models/DbBingoField';

//an infinite scroller really is overkill
// function generateItems() {
//   if (!props.fields) {
//     throw new Error('no fields found');
//   }

//   const count = items.length;
//   for (let i = 0; i < 20; i++) {
//     if (count + i === props.fields?.length) {
//       break;
//     }
//     const item = props.fields[count + i];
//     items.push(item);
//   }
// }

// const ionInfinite = (ev: any) => {
//   generateItems();
//   setTimeout(() => ev.target.complete(), 500);
// };

interface BingoFieldListProps {
  fields?: DbBingoField[];
}

const props = defineProps<BingoFieldListProps>();
</script>

<style scoped>
ion-footer {
  height: 5rem;
}
</style>
