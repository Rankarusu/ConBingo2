import { fieldsJsonRegex } from '@/composables/bingo';
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
    if (!fields.match(fieldsJsonRegex)) {
      throw new Error('malformed JSON input. cannot save sheet');
    }
    const result = await repository.value?.create(fields);
    await update();
    console.log(sheets.value);
    return result;
  }

  async function update() {
    if (!repository.value) {
      throw new Error('savedSheets Repository is not defined');
    }
    sheets.value = await repository.value.findAll();
  }

  async function findOneById(id: number) {
    const result = await repository.value?.findOneById(id);
    return result;
  }

  async function deleteOneById(id: number) {
    const result = await repository.value?.deleteOneById(id);
    await update();
    return result;
  }

  const activeSlide = ref<number>(0);

  return { sheets, init, create, deleteOneById, findOneById, activeSlide };
});
