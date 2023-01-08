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
        v-if="fields"
        :fields="fields"
        :filter="searchTerm"
        @edit-field-event="onEditField"
        @delete-field-event="onDeleteField"
      ></BingoFieldList>
    </ion-content>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @click="onAddField">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-footer collapse="fade" :translucent="true">
      <ion-toolbar>
        <ion-label class="ion-text-center ion-padding-start">{{
          footerText
        }}</ion-label>
      </ion-toolbar>
    </ion-footer>
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
  IonFooter,
  IonHeader,
  IonIcon,
  IonLabel,
  IonSearchbar,
  IonToolbar,
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import { computed, getCurrentInstance, onMounted, provide, ref } from 'vue';

function onEditField(id: number) {
  console.log('onEditField has been caught', id);
}

function onDeleteField(id: number) {
  console.log('onEditField has been caught', id);
}

function onAddField() {
  console.log('onAddField has been caught');
}

//provide functions for grandchildren to use
provide('onEditField', onEditField);
provide('onDeleteField', onDeleteField);

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

const searchTerm = ref<string>('');

function updateSearchTerm(event: any) {
  searchTerm.value = event.target.value.toLowerCase();
}

const listSize = computed(() => {
  return fields.value?.filter(
    (field: DbBingoField) =>
      field.text.toLowerCase().indexOf(searchTerm.value) > -1
  ).length;
});

const footerText = computed(() => {
  let text;
  const maxSize = fields.value?.length;
  if (listSize.value === maxSize) {
    text = `Displaying ${maxSize} fields`;
  } else {
    text = `Displaying ${listSize.value} of ${maxSize} fields`;
  }
  return text;
});

onMounted(async () => {
  fields.value = await initializeFields();
});

defineEmits(['addNewFieldEvent']);
</script>

<style scoped></style>
