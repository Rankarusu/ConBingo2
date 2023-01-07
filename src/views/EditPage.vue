<template>
  <PageWrapper title="Edit Fields">
    <ion-header slot="start">
      <ion-toolbar>
        <ion-searchbar
          :debounce="200"
          :animated="true"
          placeholder="Search for bingo fields"
          show-clear-button="always"
          @ion-change="updateSearchTerm($event)"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <BingoFieldList
        v-if="filteredFields"
        :fields="filteredFields"
      ></BingoFieldList>
    </ion-content>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @click="$emit('addNewFieldEvent')">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </PageWrapper>
</template>

<script setup lang="ts">
import BingoFieldList from '@/components/BingoFieldList.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import { DbBingoField } from '@/models/DbBingoField';
import { selectAllFieldsAlphabetical } from '@/utils/utils-db-no-encryption';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonSearchbar,
  IonToolbar,
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import { computed, getCurrentInstance, onMounted, ref } from 'vue';

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

const searchTerm = ref('');

const filteredFields = computed(() => {
  return fields.value?.filter(
    (field: DbBingoField) =>
      field.text.toLowerCase().indexOf(searchTerm.value) > -1
  );
});

function updateSearchTerm(event: any) {
  searchTerm.value = event.target.value.toLowerCase();
}

onMounted(async () => {
  fields.value = await initializeFields();
});

defineEmits(['addNewFieldEvent']);
</script>

<style scoped></style>
