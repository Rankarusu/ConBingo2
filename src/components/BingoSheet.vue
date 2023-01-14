<!-- eslint-disable vue/valid-v-for -->
<!-- vue tries to bind the checked state to the keys. Using uuids to circumvent that -->
<template>
  <div class="wrapper">
    <div class="bingo-grid">
      <BingoField
        v-for="(item, index) in props.fields"
        :key="uuidv4()"
        :position="index"
        :text="item.text"
        :read-only="props.readonly"
        :checked="item.checked"
      ></BingoField>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DbBingoField } from '@/models/DbBingoField';
import { v4 as uuidv4 } from 'uuid';
import BingoField from './BingoField.vue';

interface BingoSheetProps {
  fields: DbBingoField[];
  readonly?: boolean;
}

const props = withDefaults(defineProps<BingoSheetProps>(), {
  readonly: false,
});
</script>

<style scoped>
.bingo-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 0.125rem;

  padding-inline-start: var(
    --ion-grid-padding-xs,
    var(--ion-grid-padding, 5px)
  );
  padding-inline-end: var(--ion-grid-padding-xs, var(--ion-grid-padding, 5px));
}

.wrapper {
  display: flex;
  flex-grow: 1;
  align-items: center;
  width: 100%;
}
</style>
