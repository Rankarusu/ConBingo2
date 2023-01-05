<template>
  <ion-list>
    <BingoFieldListItem
      v-for="item in items"
      :key="item"
      :text="item.toString()"
    >
    </BingoFieldListItem>
  </ion-list>
  <ion-infinite-scroll @ion-infinite="ionInfinite">
    <ion-infinite-scroll-content
      loading-spinner="bubbles"
    ></ion-infinite-scroll-content>
  </ion-infinite-scroll>
</template>

<script setup lang="ts">
import BingoFieldListItem from './BingoFieldListItem.vue';
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
} from '@ionic/vue';
import { reactive } from 'vue';

const items = reactive<string[]>([]);

function generateItems() {
  const count = items.length + 1;
  for (let i = 0; i < 50; i++) {
    items.push(`Item ${count + i}`);
  }
}

const ionInfinite = (ev: any) => {
  generateItems();
  setTimeout(() => ev.target.complete(), 500);
};

generateItems();
</script>

<style scoped></style>
