<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>{{ props.title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button :disabled="!canDismiss" @click="confirm"
          >Confirm</ion-button
        >
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item ref="item" :counter="true">
      <ion-label position="floating">Field Content</ion-label>
      <ion-textarea
        v-model="input"
        :autofocus="true"
        :clear-input="true"
        placeholder="Enter text..."
        :minlength="1"
        :maxlength="64"
        :rows="4"
        @ion-input="validate"
        @ion-blur="markTouched"
      ></ion-textarea>
      <ion-note slot="error">Input too short</ion-note>
    </ion-item>
  </ion-content>
</template>

<script setup lang="ts">
import { IonTextareaCustomEvent } from '@ionic/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonNote,
  IonLabel,
  IonTextarea,
  IonTitle,
  IonToolbar,
  modalController,
} from '@ionic/vue';
import { ref } from 'vue';

interface ModalProps {
  title: string;
  fieldText?: string;
}

const props = withDefaults(defineProps<ModalProps>(), {
  fieldText: '',
});

const input = ref<string>(props.fieldText);
const item = ref<typeof IonItem | null>(null);

const canDismiss = ref<boolean>(false);
function validate(ev: IonTextareaCustomEvent<InputEvent | FocusEvent>) {
  const len = ev.target.value?.length;
  if (len && len > 1) {
    item.value?.$el.classList.remove('ion-invalid');
    item.value?.$el.classList.add('ion-valid');
    canDismiss.value = true;
  } else {
    item.value?.$el.classList.add('ion-invalid');
    item.value?.$el.classList.remove('ion-valid');
    canDismiss.value = false;
  }
}

function markTouched(ev: IonTextareaCustomEvent<FocusEvent>) {
  item.value?.$el.classList.add('ion-touched');
  validate(ev);
}

function cancel() {
  return modalController.dismiss(null, 'cancel');
}

async function confirm() {
  if (canDismiss.value) {
    return modalController.dismiss(input.value, 'confirm');
  }
}
</script>

<style scoped></style>
