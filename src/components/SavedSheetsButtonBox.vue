<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <ion-button expand="block" @click="$emit('loadEvent')">
          <ion-icon slot="start" :icon="open"></ion-icon>
          Load
        </ion-button>
      </ion-col>

      <ion-col>
        <ion-button expand="block" @click="$emit('deleteEvent')">
          <ion-icon slot="start" :icon="trash"></ion-icon>
          Delete
        </ion-button>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col>
        <ion-button expand="block" @click="$emit('importEvent')">
          <ion-icon slot="start" :icon="download"></ion-icon>
          Import
        </ion-button>
      </ion-col>

      <ion-col>
        <ion-button expand="block" @click="$emit('exportEvent')">
          <ion-icon slot="start" :icon="share"></ion-icon>
          Export
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/vue';
import { download, open, share, trash } from 'ionicons/icons';

defineEmits(['loadEvent', 'deleteEvent', 'importEvent', 'exportEvent']);
</script>

<style scoped>
ion-col {
  padding: 0;
}
</style>
