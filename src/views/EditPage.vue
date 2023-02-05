<template>
  <ion-page>
    <PageHeader title="Edit Fields">
      <ion-buttons slot="primary">
        <ion-button id="popover-button">
          <ion-icon
            slot="icon-only"
            :ios="ellipsisHorizontal"
            :md="ellipsisVertical"
          ></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-popover
        trigger="popover-button"
        :dismiss-on-select="true"
        alignment="end"
      >
        <ion-content>
          <ion-list>
            <ion-item
              class="danger-text"
              :button="true"
              :detail="false"
              @click="onResetFields"
              >Reset Fields</ion-item
            >
          </ion-list>
        </ion-content>
      </ion-popover>
    </PageHeader>

    <ion-header slot="start">
      <ion-toolbar>
        <ion-searchbar
          :disabled="!showList"
          :debounce="200"
          :animated="true"
          placeholder="Search for bingo fields"
          show-clear-button="always"
          @ion-change="updateSearchTerm($event)"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :scroll-y="false">
      <BingoFieldList :filter="searchTerm"></BingoFieldList>
    </ion-content>

    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button :disabled="!showList" @click="onAddField">
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
  </ion-page>
</template>

<script setup lang="ts">
import BingoFieldList from '@/components/BingoFieldList.vue';
import PageHeader from '@/components/PageHeader.vue';
import { useResetFieldsAlert } from '@/composables/alert';
import { useOpenAddModal, useOpenEditModal } from '@/composables/modal';
import { useToast } from '@/composables/toast';
import { BingoField } from '@/models/BingoField';
import { useFieldsStore } from '@/stores/fieldsStore';
import { IonSearchbarCustomEvent } from '@ionic/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonSearchbar,
  IonToolbar,
  SearchbarChangeEventDetail,
} from '@ionic/vue';
import { add, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { storeToRefs } from 'pinia';
import { computed, provide, ref } from 'vue';

const store = useFieldsStore();
const { fields } = storeToRefs(store);
const searchTerm = ref<string>('');
const showList = ref<boolean>(true);

defineEmits(['addNewFieldEvent']);

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
  const changes = await useResetFieldsAlert();
  if (changes) {
    useToast('Fields have been reset!', 'middle');
  }
}

//provide functions for grandchildren to use
provide('onEditField', onEditField);
provide('onDeleteField', onDeleteField);

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
  const maxSize = fields.value?.length;
  if (listSize.value === maxSize) {
    return `Displaying ${maxSize} fields`;
  }
  return `Displaying ${listSize.value} of ${maxSize} fields`;
});
</script>

<style scoped>
ion-popover {
  --width: 150px;
}
.danger-text {
  color: var(--ion-color-danger);
}
</style>
