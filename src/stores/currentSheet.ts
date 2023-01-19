import { DbConnectionWrapper } from '@/composables/database';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// export const useCurrentSheetStore = defineStore('counter', async () => {

//   const fields = computed(async () => await db.currentSheet.findAll);
//   const count = ref(0);
//   const name = ref('Eduardo');
//   const doubleCount = computed(() => count.value * 2);
//   function increment() {
//     count.value++;
//   }

//   return { count, name, doubleCount, increment };
// });
