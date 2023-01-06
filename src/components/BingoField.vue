<template>
  <ion-card
    :class="{ checked: checked }"
    class="ion-activatable"
    @click="toggleChecked"
  >
    <ion-card-content>{{ props.text }}</ion-card-content>
    <ion-ripple-effect v-if="!props.readonly"></ion-ripple-effect>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonRippleEffect } from '@ionic/vue';
import { ref } from 'vue';

interface BingoFieldProps {
  text: string;
  readonly?: boolean;
  checked?: boolean;
  position: number;
}

function toggleChecked() {
  if (!props.readonly) {
    checked.value = !checked.value;
  }
}

const props = withDefaults(defineProps<BingoFieldProps>(), {
  readonly: false,
  checked: false,
});

const checked = ref<boolean>(props.checked);
</script>

<style scoped>
ion-card {
  margin: 0;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: inset 0px 0px 0px 0.125rem transparent,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

ion-card.checked {
  box-shadow: inset 0px 0px 0px 0.125rem var(--ion-color-primary),
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;

  background-color: rgba(var(--ion-color-primary-rgb), 0.2);
  transition: 0.3s;
}

ion-card-content {
  width: 100%;
  max-height: 100%;
  padding: 0.25rem;
  text-align: center;
  word-wrap: break-word;
  word-break: normal;
  hyphens: auto;
  cursor: default;
  line-height: 1;
}

@media (max-width: 576px) {
  ion-card-content {
    font-size: 10px;
  }
}
</style>
