<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ props.title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <slot> </slot>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';

const props = defineProps({
  title: { type: String, required: true },
});
</script>
