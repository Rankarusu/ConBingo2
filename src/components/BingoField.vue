<template>
  <ion-card
    :class="{ checked: checked, editable: editable }"
    class="ion-activatable"
    @click="toggleChecked"
  >
    <ion-icon v-show="editable" :icon="create"></ion-icon>
    <ion-card-content>{{ props.text }}</ion-card-content>
    <ion-ripple-effect v-if="!props.readonly"></ion-ripple-effect>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonIcon, IonRippleEffect } from '@ionic/vue';
import { create } from 'ionicons/icons';
import { ref, toRef } from 'vue';
import {
  useInjectOnEditBingoField,
  useInjectToggleCheckedInDb,
} from '../composables/bingo';

interface BingoFieldProps {
  text: string;
  readonly?: boolean;
  editable?: boolean;
  checked?: boolean;
  position: number;
}
const props = withDefaults(defineProps<BingoFieldProps>(), {
  editable: false,
  readonly: false,
  checked: false,
});

const checked = ref<boolean>(props.checked);
const editable = toRef(props, 'editable');

const emit = defineEmits(['fieldCheckedEvent']);

let onEditBingoField: (id: number) => Promise<void>;
let toggleCheckedInDb: (position: number, checked: boolean) => Promise<void>;

if (!props.readonly) {
  //we inject these conditionally because our fields do not need functionality in the savedSheets page
  onEditBingoField = useInjectOnEditBingoField();
  toggleCheckedInDb = useInjectToggleCheckedInDb();
}

async function toggleChecked() {
  if (props.readonly) {
    return;
  }
  if (editable.value) {
    await onEditBingoField(props.position);
    return;
  }

  checked.value = !checked.value;
  await toggleCheckedInDb(props.position, checked.value);
  if (checked.value === true) {
    emit('fieldCheckedEvent', props.position);
  }
}
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

ion-card.editable {
  opacity: 0.7;
  box-shadow: inset 0px 0px 0px 0.125rem transparent,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

ion-icon {
  position: absolute;
  top: 2px;
  right: 2px;
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
