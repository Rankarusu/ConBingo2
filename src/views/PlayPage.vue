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
import { useInitializeSheet, useSetCurrentSheet } from '@/composables/bingo';
import { useInjectDb } from '@/composables/database';
import { DbBingoField } from '@/models/DbBingoField';

import { IonContent, IonGrid, IonRow } from '@ionic/vue';
import { onBeforeMount, ref } from 'vue';

const db = useInjectDb();

function onEdit() {
  console.log('edit event caught');
}
function onSave() {
  console.log('save event caught');
}
async function onReroll() {
  console.log('reroll event caught');
  fields.value = await useInitializeSheet(db.value);
  await useSetCurrentSheet(db.value, fields.value);
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
