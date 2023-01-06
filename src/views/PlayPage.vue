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
import { getCurrentInstance, onMounted, ref } from 'vue';
import { selectAllFields } from '@/utils/utils-db-no-encryption';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DbBingoField } from '@/models/DbBingoField';

function onEdit() {
  console.log('edit event caught');
}
function onSave() {
  console.log('save event caught');
}
function onReload() {
  console.log('reload event caught');
}

async function initializeSheet() {
  const app = getCurrentInstance();
  const sqlite = app?.appContext.config.globalProperties.$sqlite;
  const db: SQLiteDBConnection = await sqlite.createConnection(
    'db',
    false,
    'no-encryption',
    2,
    false
  );
  await db.open();
  const dbFields = await db.query(selectAllFields);
  console.log(dbFields);
  await sqlite.closeConnection('db');

  if (!dbFields.values) {
    throw new Error('dbFields are not there');
  }

  const fieldLength = dbFields.values.length;

  const indices = new Set<number>();

  while (indices.size < 24) {
    const randomNumber = Math.floor(Math.random() * fieldLength);
    indices.add(randomNumber);
  }
  console.log(indices);

  const fieldTexts: DbBingoField[] = Array.from(indices).map(
    (index) => dbFields.values[index]
  );
  fieldTexts.splice(12, 0, { id: undefined, text: 'FREE SPACE' });
  console.log(fieldTexts);
  return fieldTexts;
}

const fields = ref<DbBingoField[] | null>(null);
onMounted(async () => {
  fields.value = await initializeSheet();
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
