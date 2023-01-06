<template>
  <div class="wrapper">
    <ion-grid>
      <ion-row v-for="x in 5" :key="x">
        <ion-col v-for="y in 5" :key="y" size="1">
          <BingoField
            :position="gridIndex(x, y)"
            :text="props.fields[gridIndex(x, y)].text"
            :read-only="props.readonly"
            :checked="props.fields[gridIndex(x, y)].checked"
          ></BingoField>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import { IonGrid, IonCol, IonRow } from '@ionic/vue';
import BingoField from './BingoField.vue';
import { DbBingoField } from '@/models/DbBingoField';

interface BingoSheetProps {
  fields: DbBingoField[];
  readonly?: boolean;
}

const props = withDefaults(defineProps<BingoSheetProps>(), {
  readonly: false,
});

function gridIndex(x: number, y: number) {
  return (x - 1) * 5 + (y - 1);
}
</script>

<style scoped>
ion-grid {
  --ion-grid-columns: 5;
}

.wrapper {
  display: flex;
  flex-grow: 1;
  align-items: center;
  width: 100%;
}

ion-col {
  padding: 0.0625rem;
}
</style>
