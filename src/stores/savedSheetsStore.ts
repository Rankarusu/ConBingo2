import { SavedSheetsRepository } from '@/composables/database';
import { BingoSheet } from '@/models/BingoSheet';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSavedSheetsStore = defineStore('savedSheets', () => {
  const repository = ref<SavedSheetsRepository>();

  const sheets = ref<BingoSheet[]>([]);

  async function init(savedSheetsRepository: SavedSheetsRepository) {
    repository.value = savedSheetsRepository;
    await update();
  }

  async function create(fields: string) {
    repository.value?.create(fields);
    await update();
  }

  async function update() {
    if (!repository.value) {
      throw new Error('savedSheets Repository is not defined');
    }
    sheets.value = await repository.value.findAll();
  }

  const activeSlide = ref<number>(0);

  return { sheets, init, create, activeSlide };
});
