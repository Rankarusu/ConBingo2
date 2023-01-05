<template>
  <div class="wrapper">
    <SwiperComponent
      ref="swiper"
      :modules="modules"
      navigation
      :pagination="{ clickable: true }"
      :slides-per-view="1"
      :space-between="50"
      @active-index-change="idx"
    >
      <swiper-slide v-for="n in 10" :key="n">
        <BingoSheet :read-only="true"></BingoSheet>
      </swiper-slide>
    </SwiperComponent>
  </div>
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y } from 'swiper';
import Swiper from 'swiper'; //need the type for type hints below

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import BingoSheet from './BingoSheet.vue';

const modules = [Navigation, Pagination, A11y];

const idx = (swiper: Swiper) => {
  console.log(swiper.activeIndex);
  console.log(swiper.slides[swiper.activeIndex]);
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-grow: 1;
  align-items: center;
  width: 100%;
}
.swiper {
  padding: 10px;
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
