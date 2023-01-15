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
import { useInjectDb } from '@/composables/database';
import { useOpenModal } from '@/composables/modal';
import { DbBingoField } from '@/models/DbBingoField';
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
import { computed, onBeforeMount, provide, ref } from 'vue';

const db = useInjectDb();

function onEditField(id: number) {
  console.log('onEditField has been caught', id);
}

function onDeleteField(id: number) {
  console.log('onEditField has been caught', id);
}

async function onAddField() {
  console.log('onAddField has been caught');
  await useOpenModal(db.value);
  //refetch data from db
  const dbFields = await db.value.selectAllFieldsAlphabetical();
  fields.value = dbFields;
}

//provide functions for grandchildren to use
provide('onEditField', onEditField);
provide('onDeleteField', onDeleteField);

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

onBeforeMount(async () => {
  const dbFields = await db.value.selectAllFieldsAlphabetical();
  fields.value = dbFields;
});

defineEmits(['addNewFieldEvent']);
</script>

<style scoped></style>
