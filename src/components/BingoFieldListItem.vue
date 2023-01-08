<template>
  <ion-item>
    <ion-label class="custom-label">{{ props.text }}</ion-label>
    <ion-button
      slot="end"
      fill="clear"
      color="medium"
      @click="onEditField(props.id)"
    >
      <ion-icon slot="icon-only" :icon="create"></ion-icon>
    </ion-button>
    <ion-button
      slot="end"
      fill="clear"
      color="medium"
      @click="onDeleteField(props.id)"
    >
      <ion-icon slot="icon-only" :icon="trash"></ion-icon>
    </ion-button>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonIcon, IonButton, IonLabel } from '@ionic/vue';
import { create, trash } from 'ionicons/icons';
import { inject } from 'vue';

interface BingoFieldListItemProps {
  text: string;
  id: number;
}

const props = defineProps<BingoFieldListItemProps>();

//inject methods from Page to avoid re-emitting events
const onEditField = inject<(id: number) => void>('onEditField');
const onDeleteField = inject<(id: number) => void>('onDeleteField');

if (!onEditField || !onDeleteField) {
  throw new Error('injected functions not defined');
}
</script>

<style scoped>
ion-button.button {
  margin-left: 0.125rem;
}

ion-label.custom-label {
  white-space: normal;
}
</style>
