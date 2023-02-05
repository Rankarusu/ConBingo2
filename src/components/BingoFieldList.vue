<template>
  <DynamicScroller
    :items="filteredFields"
    :min-item-size="48"
    class="ion-content-scroll-host scroller"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        :key="item.id"
        :item="item"
        :active="active"
        :size-dependencies="[item.text]"
        :data-index="index"
      >
        <BingoFieldListItem :id="item.id!" :key="item.id" :text="item.text">
        </BingoFieldListItem>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>

<script lang="ts" setup>
import { useFieldsStore } from '@/stores/fieldsStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import BingoFieldListItem from './BingoFieldListItem.vue';

interface BingoFieldListProps {
  filter: string;
}
const props = defineProps<BingoFieldListProps>();

const store = useFieldsStore();
const { sortedFields } = storeToRefs(store);

const filteredFields = computed(() =>
  sortedFields.value.filter(
    (item) => item.text.toLowerCase().indexOf(props.filter) > -1
  )
);
</script>

<style scoped>
ion-button {
  margin: 20px;
}

.scroller {
  height: 100%;
}
</style>
