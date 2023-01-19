<template>
  <PageWrapper title="Convention Bingo">
    <ion-content :fullscreen="true">
      <ion-grid class="ion-no-margin ion-no-padding">
        <ion-row class="expand">
          <BingoSheet v-if="fields" :fields="fields"></BingoSheet>
        </ion-row>
        <ion-row>
          <PlayButtonBox
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
import { useToast } from '@/composables/toast';
import { DbBingoField } from '@/models/DbBingoField';

import { IonContent, IonGrid, IonRow } from '@ionic/vue';
import { onBeforeMount, provide, ref } from 'vue';

// const confetti = require('canvas-confetti');

const db = useInjectDb();

async function toggleCheckedInDb(position: number, checked: boolean) {
  await db.value.setCheckedState(position, checked);
}

provide(TOGGLE_CHECKED_IN_DB_INJECTION_KEY, toggleCheckedInDb);

function onEdit() {
  console.log('edit event caught');
}
function onSave() {
  console.log('save event caught');
  useSaveSheet(db.value);
  useToast('Sheet saved!', 'bottom');
}
async function onReroll() {
  console.log('reroll event caught');
  const newSheet = await useInitializeSheet(db.value);
  await useSetCurrentSheet(db.value, newSheet);
  fields.value = newSheet;
}

const fields = ref<DbBingoField[] | null>(null);

onBeforeMount(async () => {
  const currentSheet = await db.value.selectAllCurrentSheet();

  console.log(currentSheet.length);
  if (currentSheet.length < 25) {
    const newSheet = await useInitializeSheet(db.value);
    await useSetCurrentSheet(db.value, newSheet);
    fields.value = newSheet;

    const currentSheet = await db.value.selectAllCurrentSheet();
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
