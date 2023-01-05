<template>
  <PageWrapper title="Saved Sheets">
    <ion-content :fullscreen="true">
      <ion-grid class="ion-no-margin ion-no-padding">
        <ion-row class="expand">
          <SavedSheetSlider></SavedSheetSlider>
        </ion-row>
        <ion-row>
          <SavedSheetsButtonBox
            @load-event="onLoad"
            @delete-event="onDelete"
            @export-event="onExport"
            @import-event="onImport"
          ></SavedSheetsButtonBox>
        </ion-row>
      </ion-grid>
    </ion-content>
  </PageWrapper>
</template>

<script setup lang="ts">
import { IonGrid, IonRow, IonContent } from '@ionic/vue';

import PageWrapper from '@/components/PageWrapper.vue';
import SavedSheetSlider from '@/components/SavedSheetSlider.vue';
import SavedSheetsButtonBox from '@/components/SavedSheetsButtonBox.vue';

function onLoad() {
  console.log('load event caught');
}
function onDelete() {
  console.log('delete event caught');
}
function onImport() {
  console.log('import event caught');
}
function onExport() {
  console.log('export event caught');
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
