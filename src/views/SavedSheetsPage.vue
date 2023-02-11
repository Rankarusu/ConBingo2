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
import { fieldsJsonRegex } from '@/composables/bingo';
import { useToast } from '@/composables/toast';
import { useCurrentSheetStore } from '@/stores/currentSheetStore';
import { useSavedSheetsStore } from '@/stores/savedSheetsStore';
import { Share } from '@capacitor/share';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { FileSharer } from '@byteowls/capacitor-filesharer';

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
async function onImport(file: File) {
  console.log('import event caught');
  if (file.type !== 'application/json') {
    useToast('Invalid format', 'top', 'danger');
    return;
  }
  const content = await readFile(file);
  if (!content) {
    useToast('Error', 'top', 'danger');
    return;
  }
  if (!fieldsJsonRegex.test(content)) {
    useToast('File content malformed', 'top', 'danger');
    return;
  }
  const changes = await store.create(content);
  if (changes) {
    useToast('Sheet imported successfully!', 'top', 'success');
    return;
  }
}

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result as string);
    };
    fr.onerror = reject;
    fr.readAsText(file);
  });
}

async function onExport() {
  console.log('export event caught');
  const selectedSheet = await store.findOneById(activeSlide.value);
  const content = JSON.stringify(selectedSheet.content);

  await FileSharer.share({
    filename: 'bingo-sheet.json',
    contentType: 'application/json',
    base64Data: btoa(content),
  });
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
