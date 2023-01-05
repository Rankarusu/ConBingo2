<template>
  <ion-card
    :class="{ checked: checked }"
    class="ion-activatable"
    @click="toggleChecked"
  >
    <ion-card-content>{{ props.text }}</ion-card-content>
    <ion-ripple-effect v-if="!props.readOnly"></ion-ripple-effect>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonRippleEffect } from '@ionic/vue';
import { ref } from 'vue';

function toggleChecked() {
  if (!props.readOnly) {
    checked.value = !checked.value;
  }
}

const checked = ref<boolean>(false);

const props = defineProps({
  text: { type: String, required: true },
  readOnly: { type: Boolean, default: false },
});
</script>

<style scoped>
ion-card {
  margin: 0;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

ion-card.checked {
  border: solid 0.125rem var(--ion-color-primary);
  background-color: rgba(var(--ion-color-primary-rgb), 0.2);
  transition: 0.3s;
}

ion-card-content {
  padding: 0.0625rem;
  text-align: center;
  word-wrap: break-word;
  word-break: normal;
  cursor: default;
}
</style>
