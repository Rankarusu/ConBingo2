<template>
  <PageWrapper title="Convention Bingo">
    <ion-content :fullscreen="true">
      <ion-grid class="ion-no-margin ion-no-padding">
        <ion-row class="expand">
          <BingoSheet
            v-if="fields"
            :fields="fields"
            :editable="editModeEnabled"
          ></BingoSheet>
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
  </PageWrapper>
</template>

<script setup lang="ts">
import BingoSheet from '@/components/BingoSheet.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import PlayButtonBox from '@/components/PlayButtonBox.vue';
import {
  TOGGLE_CHECKED_IN_DB_INJECTION_KEY,
  useInitializeSheet,
  useSaveSheet,
  useSetCurrentSheet,
} from '@/composables/bingo';
import { useInjectDb } from '@/composables/database';
import { useOpenEditCurrentModal } from '@/composables/modal';
import { useToast } from '@/composables/toast';
import { DbBingoField } from '@/models/DbBingoField';
import { IonContent, IonGrid, IonRow } from '@ionic/vue';
import { onBeforeMount, provide, ref } from 'vue';

const db = useInjectDb();

async function toggleCheckedInDb(position: number, checked: boolean) {
  await db.currentSheet.setChecked(position, checked);
}
provide(TOGGLE_CHECKED_IN_DB_INJECTION_KEY, toggleCheckedInDb);

async function syncFieldsWithDb() {
  //since we use the db as our store we need to refetch data once it has changed, but only if it has.
  const dbFields = await db.currentSheet.findAll();
  fields.value = dbFields;
}

async function onEditBingoField(id: number) {
  console.log('onEditBingoField has been caught', id);
  const changes = await useOpenEditCurrentModal(db, id);
  if (changes) {
    useToast('Field edited!', 'bottom');
    await syncFieldsWithDb();
  }
}

provide('onEditBingoField', onEditBingoField);

async function onEdit() {
  console.log('edit event caught');
  await syncFieldsWithDb();
  editModeEnabled.value = !editModeEnabled.value;
}

function onSave() {
  console.log('save event caught');
  useSaveSheet(db);
  useToast('Sheet saved!', 'bottom');
}

async function onReroll() {
  console.log('reroll event caught');
  const newSheet = await useInitializeSheet(db);
  await useSetCurrentSheet(db, newSheet);
  fields.value = newSheet;
}

const fields = ref<DbBingoField[] | null>(null);
const editModeEnabled = ref<boolean>(false);

onBeforeMount(async () => {
  const currentSheet = await db.currentSheet.findAll();

  console.log(currentSheet.length);
  if (currentSheet.length < 25) {
    const newSheet = await useInitializeSheet(db);
    await useSetCurrentSheet(db, newSheet);
    fields.value = newSheet;

    const currentSheet = await db.currentSheet.findAll();
    console.log(currentSheet);
  } else {
    fields.value = currentSheet;
  }
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
</style>
