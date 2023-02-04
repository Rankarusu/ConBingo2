<template>
  <div class="wrapper">
    <SwiperComponent
      v-if="sheets.length > 0"
      :modules="modules"
      navigation
      :pagination="{ clickable: true }"
      :slides-per-view="1"
      :space-between="20"
      :lazy="true"
      :css-mode="true"
      :virtual="true"
      @swiper="onSwiper"
      @active-index-change="setActiveIndex"
      @slides-length-change="setActiveIndex"
    >
      <swiper-slide
        v-for="sheet in sheets"
        :id="sheet.id"
        :key="sheet.id"
        :virtual-index="sheet.id"
      >
        <BingoSheet :fields="sheet.content" :readonly="true"></BingoSheet>
      </swiper-slide>
    </SwiperComponent>
    <ion-text v-else color="medium" class="ion-text-center">
      <p>You have no saved sheets at the moment</p>
    </ion-text>
  </div>
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import Swiper, { Lazy, Virtual, Navigation, Pagination } from 'swiper'; //need the type for type hints below
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { BingoSheet as BingoSheetModel } from '@/models/BingoSheet';
import { useSavedSheetsStore } from '@/stores/savedSheetsStore';
import { IonText, IonSkeletonText } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { ref, toRef } from 'vue';
import BingoSheet from './BingoSheet.vue';

const store = useSavedSheetsStore();
const { activeSlide } = storeToRefs(store);
interface SavedSheetsSliderProps {
  sheets: BingoSheetModel[];
}
const props = defineProps<SavedSheetsSliderProps>();
const sheets = toRef(props, 'sheets');
const swiperInstance = ref<Swiper | null>(null);

const modules = [Navigation, Pagination, Virtual, Lazy];

function onSwiper(swiper: Swiper) {
  swiperInstance.value = swiper;
}

function setActiveIndex() {
  if (!swiperInstance.value) {
    return;
  }
  const activeIndex = swiperInstance.value?.activeIndex;
  const activeElementV = swiperInstance.value.virtual.slides[activeIndex];
  const activeElement = swiperInstance.value.slides[activeIndex];

  console.log(activeIndex, activeElementV, activeElement);
  console.log(activeElementV.props.id);
  activeSlide.value = parseInt(activeElementV.props.id);
}
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

ion-text {
  width: 100%;
}
ion-spinner {
  width: 100%;
}
</style>
