<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <ion-button expand="block" @click="$emit('rerollEvent')">
          <ion-icon slot="start" :icon="reload"></ion-icon>
          Reroll
        </ion-button>
      </ion-col>

      <ion-col>
        <ion-button expand="block" @click="$emit('saveEvent')">
          <ion-icon slot="start" :icon="save"></ion-icon>
          Save
        </ion-button>
      </ion-col>

      <ion-col>
        <ion-button expand="block" @click="$emit('editEvent')">
          <ion-icon slot="start" :icon="create"></ion-icon>
          Edit
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/vue';
import { create, reload, save } from 'ionicons/icons';

defineEmits(['rerollEvent', 'saveEvent', 'editEvent']);
</script>

<style scoped>
ion-col {
  padding: 0;
}
</style>
