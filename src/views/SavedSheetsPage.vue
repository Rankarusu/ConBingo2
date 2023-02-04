<template>
  <ion-page>
    <PageHeader title="Saved Sheets" />
    <ion-content :fullscreen="true" overflow-scroll="true">
      <ion-grid class="ion-no-margin ion-no-padding">
        <ion-row class="expand">
          <SavedSheetSlider
            v-if="showSlider"
            :sheets="sheets"
          ></SavedSheetSlider>
          <ion-spinner v-else name="crescent" color="primary"></ion-spinner>
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
  </ion-page>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import SavedSheetsButtonBox from '@/components/SavedSheetsButtonBox.vue';
import SavedSheetSlider from '@/components/SavedSheetSlider.vue';
import { useToast } from '@/composables/toast';
import { useSavedSheetsStore } from '@/stores/savedSheetsStore';
import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonSpinner,
  onIonViewDidEnter,
} from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useSavedSheetsStore();
const { sheets, activeSlide } = storeToRefs(store);

const showSlider = ref<boolean>(false);

function onLoad() {
  console.log('load event caught');
}
async function onDelete() {
  const currentIndex = activeSlide.value;
  console.log('delete event caught' + currentIndex);
  const changes = await store.deleteOneById(currentIndex);
  if (changes) {
    useToast('Sheet deleted!', 'top');
  }
}
function onImport() {
  console.log('import event caught');
}
function onExport() {
  console.log('export event caught');
}

onIonViewDidEnter(() => {
  setTimeout(() => {
    showSlider.value = true;
  }, sheets.value.length * 50);
});
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

ion-spinner {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
