<template>
  <div class="wrapper">
    <ion-grid>
      <ion-row v-for="n in 5" :key="n">
        <ion-col v-for="m in 5" :key="m" size="1">
          <BingoField text="text" :read-only="props.readOnly"></BingoField>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import { IonGrid, IonCol, IonRow } from '@ionic/vue';
import BingoField from './BingoField.vue';

const props = defineProps({
  readOnly: { type: Boolean, default: false },
});
</script>

<style scoped>
ion-grid {
  --ion-grid-columns: 5;
}

.wrapper {
  display: flex;
  flex-grow: 1;
  align-items: center;
  width: 100%;
}

ion-col {
  padding: 0.0625rem;
}
</style>
