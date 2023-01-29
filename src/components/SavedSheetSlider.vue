<template>
  <div v-show="showSwiper" class="wrapper">
    <SwiperComponent
      v-if="renderSwiper"
      :modules="modules"
      navigation
      :pagination="{ clickable: true }"
      :slides-per-view="1"
      :space-between="20"
      :lazy="true"
      :css-mode="true"
      @swiper="onSwiper"
      @active-index-change="setActiveIndex"
      @slides-length-change="setActiveIndex"
    >
      <swiper-slide v-for="sheet in sheets" :id="sheet.id" :key="sheet.id">
        <BingoSheet :fields="sheet.content" :readonly="true"></BingoSheet>
      </swiper-slide>
    </SwiperComponent>
  </div>
  <div v-show="!showSwiper" class="wrapper">
    <ion-spinner color="primary" name="crescent"></ion-spinner>
  </div>

  <!-- <ion-text v-else color="medium" class="ion-text-center">
      <p>You have no saved sheets at the moment</p>
    </ion-text> -->
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import Swiper, { Lazy, Navigation, Pagination } from 'swiper'; //need the type for type hints below
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { BingoSheet as BingoSheetModel } from '@/models/BingoSheet';
import { IonText, IonSpinner } from '@ionic/vue';
import { useSavedSheetsStore } from '@/stores/savedSheetsStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref, toRef } from 'vue';
import BingoSheet from './BingoSheet.vue';

const store = useSavedSheetsStore();
const { activeSlide } = storeToRefs(store);
interface SavedSheetsSliderProps {
  sheets: BingoSheetModel[];
}
const props = defineProps<SavedSheetsSliderProps>();
const sheets = toRef(props, 'sheets');
const swiperInstance = ref<Swiper | null>(null);

const renderSwiper = ref<boolean>(false);
const showSwiper = ref<boolean>(false);

const modules = [Navigation, Pagination, Lazy];

function onSwiper(swiper: Swiper) {
  swiperInstance.value = swiper;
}

function setActiveIndex() {
  if (!swiperInstance.value) {
    return;
  }
  const activeIndex = swiperInstance.value?.activeIndex;
  const activeElement = swiperInstance.value.slides[activeIndex];
  activeSlide.value = parseInt(activeElement.id);
  console.log(activeSlide.value);
}

onMounted(async () => {
  setTimeout(() => {
    showSwiper.value = true;
  }, 2000);

  setTimeout(() => {
    renderSwiper.value = true;
  }, 100);
});
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
