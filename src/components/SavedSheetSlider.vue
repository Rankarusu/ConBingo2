<template>
  <div class="wrapper">
    <SwiperComponent
      :modules="modules"
      navigation
      :pagination="{ clickable: true }"
      :slides-per-view="1"
      :space-between="20"
      @swiper="onSwiper"
    >
      <swiper-slide v-for="(sheet, index) in props.sheets" :key="index">
        <BingoSheet :fields="sheet.content" :readonly="true"></BingoSheet>
      </swiper-slide>
    </SwiperComponent>
  </div>
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import Swiper, { A11y, Navigation, Pagination } from 'swiper'; //need the type for type hints below
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import { BingoSheet as BingoSheetModel } from '@/models/BingoSheet';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { computed, ref } from 'vue';
import BingoSheet from './BingoSheet.vue';

const modules = [Navigation, Pagination, A11y];

// const activeSlide = ref<number>(0);
const swiperInstance = ref<Swiper | null>(null);

const activeSlide = computed(() => swiperInstance.value?.activeIndex);

function onSwiper(swiper: Swiper) {
  swiperInstance.value = swiper;
}

interface SavedSheetsProps {
  sheets: BingoSheetModel[];
}

const props = defineProps<SavedSheetsProps>();
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-grow: 1;
  align-items: center;
  width: 100%;
}
.swiper {
  padding: 20px 10px;
  --swiper-theme-color: var(--ion-color-primary);
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  --swiper-navigation-size: 1.875rem;
}

:deep(.swiper-button-next) {
  right: 5px;
}

:deep(.swiper-button-prev) {
  left: 5px;
}

:deep(.swiper-pagination) {
  bottom: 0;
}
</style>
