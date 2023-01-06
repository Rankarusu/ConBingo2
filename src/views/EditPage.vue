<template>
  <PageWrapper title="Edit Fields">
    <ion-header slot="start">
      <ion-toolbar>
        <ion-searchbar
          :animated="true"
          placeholder="Search for bingo fields"
          show-clear-button="always"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <BingoFieldList v-if="fields" :fields="fields"></BingoFieldList>
    </ion-content>
  </PageWrapper>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonSearchbar, IonContent } from '@ionic/vue';
import BingoFieldList from '@/components/BingoFieldList.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import { getCurrentInstance, onMounted, ref } from 'vue';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { selectAllFieldsAlphabetical } from '@/utils/utils-db-no-encryption';
import { DbBingoField } from '@/models/DbBingoField';

async function initializeFields() {
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
  const dbFields = await db.query(selectAllFieldsAlphabetical);
  console.log(dbFields);
  await sqlite.closeConnection('db');

  if (!dbFields.values) {
    throw new Error('dbFields are not there');
  }

  return dbFields.values;
}

const fields = ref<DbBingoField[]>();

onMounted(async () => {
  fields.value = await initializeFields();
});
</script>

<style scoped></style>
