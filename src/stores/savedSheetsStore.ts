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

  async function create(content: string) {
    const result = await repository.value?.create({ content });
    await update();
    console.log(sheets.value);
    return result;
  }

  async function update() {
    if (!repository.value) {
      throw new Error('savedSheets Repository is not defined');
    }
    const dbSheets = await repository.value.findAll();
    const bingoSheets = dbSheets.map((sheet) => {
      const obj = {
        id: sheet.id,
        content: JSON.parse(sheet.content),
      } as BingoSheet;
      return obj;
    });

    sheets.value = bingoSheets;
  }

  async function findOneById(id: number) {
    const dbSheet = await repository.value?.findOneById(id);
    if (!dbSheet) {
      throw new Error(`Could not find a sheet with id ${id} in the db.`);
    }
    const sheet = {
      id: dbSheet?.id,
      content: JSON.parse(dbSheet?.content),
    } as BingoSheet;
    return sheet;
  }

  async function deleteOneById(id: number) {
    const result = await repository.value?.deleteOneById(id);
    await update();
    return result;
  }

  const activeSlide = ref<number>(0);

  return { sheets, init, create, deleteOneById, findOneById, activeSlide };
});
