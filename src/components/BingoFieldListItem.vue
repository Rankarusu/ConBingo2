<template>
  <ion-item>
    <ion-label>{{ props.text }}</ion-label>
    <ion-button slot="end" fill="clear" color="medium">
      <ion-icon slot="icon-only" :icon="create"></ion-icon>
    </ion-button>
    <ion-button slot="end" fill="clear" color="medium">
      <ion-icon slot="icon-only" :icon="trash"></ion-icon>
    </ion-button>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonIcon, IonButton, IonLabel } from '@ionic/vue';
import { create, trash } from 'ionicons/icons';

const props = defineProps({
  text: { type: String, required: true },
});
</script>

<style scoped>
ion-button.button {
  margin-left: 0.125rem;
}
</style>
