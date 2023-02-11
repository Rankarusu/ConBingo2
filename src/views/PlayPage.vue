<template>
  <ion-page>
    <PageHeader title="Convention Bingo" />
    <ion-content :fullscreen="true">
      <ion-grid class="ion-no-margin ion-no-padding">
        <ion-row class="expand">
          <BingoSheet :fields="fields" :editable="editModeEnabled"></BingoSheet>
        </ion-row>
        <ion-row>
          <PlayButtonBox
            :edit-mode-enabled="editModeEnabled"
            @edit-event="onEdit"
            @save-event="onSave"
            @reroll-event="onReroll"
          ></PlayButtonBox>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import BingoSheet from '@/components/BingoSheet.vue';
import PageHeader from '@/components/PageHeader.vue';
import PlayButtonBox from '@/components/PlayButtonBox.vue';
import {
  ON_EDIT_BINGO_FIELD_INJECTION_KEY,
  TOGGLE_CHECKED_IN_DB_INJECTION_KEY,
  useGenerateSheet,
} from '@/composables/bingo';
import { useOpenEditCurrentModal } from '@/composables/modal';
import { useToast } from '@/composables/toast';
import { useCurrentSheetStore } from '@/stores/currentSheetStore';
import { useFieldsStore } from '@/stores/fieldsStore';
import { useSavedSheetsStore } from '@/stores/savedSheetsStore';
import { IonContent, IonGrid, IonPage, IonRow } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { provide, ref } from 'vue';

const currentSheetStore = useCurrentSheetStore();
const { fields } = storeToRefs(currentSheetStore);
const fieldsStore = useFieldsStore();
const savedSheetsStore = useSavedSheetsStore();
const editModeEnabled = ref<boolean>(false);

async function toggleCheckedInDb(position: number, checked: boolean) {
  await currentSheetStore.setChecked(position, checked);
}
provide(TOGGLE_CHECKED_IN_DB_INJECTION_KEY, toggleCheckedInDb);

async function onEditBingoField(id: number) {
  console.log('onEditBingoField has been caught', id);
  const changes = await useOpenEditCurrentModal(id);
  if (changes) {
    useToast('Field edited!', 'bottom');
  }
}
provide(ON_EDIT_BINGO_FIELD_INJECTION_KEY, onEditBingoField);

async function onEdit() {
  console.log('edit event caught');
  editModeEnabled.value = !editModeEnabled.value;
}

async function onSave() {
  console.log('save event caught');
  const json = JSON.stringify(fields.value);
  await savedSheetsStore.create(json);
  useToast('Sheet saved!', 'bottom');
}

async function onReroll() {
  console.log('reroll event caught');
  const newSheet = await useGenerateSheet(fieldsStore.fields);
  currentSheetStore.fields = []; //to force a rerender TODO: make this more graceful.
  //vue tries to be smart when it comes to rerendering of lists but it does give us some trouble in our use case

  await currentSheetStore.reset(newSheet);
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
