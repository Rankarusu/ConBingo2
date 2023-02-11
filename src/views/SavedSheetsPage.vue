<template>
  <ion-page>
    <PageHeader title="Saved Sheets" />
    <ion-content :fullscreen="true" overflow-scroll="true">
      <ion-grid class="ion-no-margin ion-no-padding">
        <ion-row class="expand">
          <SavedSheetSlider
            v-if="renderSlider"
            v-show="showSlider"
            :sheets="sheets"
          ></SavedSheetSlider>
          <ion-spinner
            v-show="!showSlider"
            name="crescent"
            color="primary"
          ></ion-spinner>
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
import { useCurrentSheetStore } from '@/stores/currentSheetStore';
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

const currentSheetStore = useCurrentSheetStore();

const showSlider = ref<boolean>(false);
const renderSlider = ref<boolean>(false);

async function onLoad() {
  const activeSlideId = activeSlide.value;
  console.log(activeSlideId);
  const sheet = await store.findOneById(activeSlideId);
  if (sheet) {
    await currentSheetStore.reset(sheet.content);
    useToast('Sheet loaded!', 'top');
  }
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
  renderSlider.value = true;

  setTimeout(() => {
    showSlider.value = true;
  }, sheets.value.length * 30);
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
