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
      {{ props.fields?.length }} Field{{
        props.fields!.length !== 1 ? 's' : ''
      }}
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import BingoFieldListItem from './BingoFieldListItem.vue';
import { IonList, IonItem, IonLabel, IonItemDivider } from '@ionic/vue';

import { DbBingoField } from '@/models/DbBingoField';

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
