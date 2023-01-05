<template>
  <PageWrapper title="Edit Fields">
    <ion-header slot="start">
      <ion-toolbar>
        <ion-searchbar
          :animated="true"
          placeholder="Search for bingo fields"
          show-clear-button="always"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <BingoFieldList></BingoFieldList>
    </ion-content>
  </PageWrapper>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonSearchbar, IonContent } from '@ionic/vue';
import BingoFieldList from '@/components/BingoFieldList.vue';
import PageWrapper from '@/components/PageWrapper.vue';
</script>

<style scoped></style>
