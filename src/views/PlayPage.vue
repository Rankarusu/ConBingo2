<template>
  <PageWrapper title="Convention Bingo">
    <ion-content :fullscreen="true">
      <ion-grid class="ion-no-margin ion-no-padding">
        <ion-row class="expand">
          <BingoSheet></BingoSheet>
        </ion-row>
        <ion-row>
          <PlayButtonBox
            @edit-event="onEdit"
            @save-event="onSave"
            @reload-event="onReload"
          ></PlayButtonBox>
        </ion-row>
      </ion-grid>
    </ion-content>
  </PageWrapper>
</template>

<script setup lang="ts">
import { IonGrid, IonRow, IonContent } from '@ionic/vue';
import BingoSheet from '@/components/BingoSheet.vue';
import PlayButtonBox from '@/components/PlayButtonBox.vue';
import PageWrapper from '@/components/PageWrapper.vue';

function onEdit() {
  console.log('edit event caught');
}
function onSave() {
  console.log('save event caught');
}
function onReload() {
  console.log('reload event caught');
}
</script>

<style scoped>
ion-grid {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.expand {
  flex-grow: 1;
}
</style>
