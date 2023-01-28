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
        :filter="searchTerm"
        @reset-fields-event="onResetFields"
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
import { useResetFieldsAlert } from '@/composables/alert';
import { useOpenAddModal, useOpenEditModal } from '@/composables/modal';
import { useToast } from '@/composables/toast';
import { BingoField } from '@/models/BingoField';
import { useFieldsStore } from '@/stores/fieldsStore';
import { IonSearchbarCustomEvent } from '@ionic/core';
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
  SearchbarChangeEventDetail,
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import { storeToRefs } from 'pinia';
import { computed, provide, ref } from 'vue';

async function onEditField(id: number) {
  console.log('onEditField has been caught', id);
  const changes = await useOpenEditModal(id);
  if (changes) {
    useToast('Field edited!', 'bottom');
  }
}

async function onDeleteField(id: number) {
  console.log('onEditField has been caught', id);
  const changes = await store.deleteOneById(id);
  if (changes) {
    useToast('Field deleted!', 'bottom');
  }
}

async function onAddField() {
  console.log('onAddField has been caught');
  const changes = await useOpenAddModal();
  if (changes) {
    useToast('Field added!', 'bottom');
  }
}

async function onResetFields() {
  console.log('reset fields event caught');
  const changes = await useResetFieldsAlert();
  if (changes) {
    useToast('Fields have been reset!', 'middle');
  }
}

//provide functions for grandchildren to use
provide('onEditField', onEditField);
provide('onDeleteField', onDeleteField);

const store = useFieldsStore();
const { fields } = storeToRefs(store);

const searchTerm = ref<string>('');

function updateSearchTerm(
  event: IonSearchbarCustomEvent<SearchbarChangeEventDetail>
) {
  searchTerm.value = event.target.value?.toLowerCase() || '';
}

const listSize = computed(() => {
  return fields.value?.filter(
    (field: BingoField) =>
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

defineEmits(['addNewFieldEvent']);
</script>

<style scoped></style>
