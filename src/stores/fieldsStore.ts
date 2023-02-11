import { FieldsRepository } from '@/composables/database';
import { BingoField } from '@/models/BingoField';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useFieldsStore = defineStore('fields', () => {
  const repository = ref<FieldsRepository>();

  const fields = ref<BingoField[]>([]);

  const sortedFields = computed(() =>
    fields.value?.sort((a, b) => a.text.localeCompare(b.text))
  );

  async function init(fieldsRepository: FieldsRepository) {
    repository.value = fieldsRepository;
    await update();
  }

  async function findOneById(id: number) {
    return await repository.value?.findOneById(id);
  }

  async function updateOneById(id: number, text: string) {
    const result = await repository.value?.updateOneById(id, { text });
    await update();
    return result;
  }

  async function deleteOneById(id: number) {
    const result = await repository.value?.deleteOneById(id);
    await update();
    return result;
  }

  async function create(text: string) {
    const result = await repository.value?.create({ text });
    await update();
    return result;
  }

  async function reset() {
    const result = await repository.value?.reset();
    await update();
    return result;
  }

  async function update() {
    if (!repository.value) {
      throw new Error('fields Repository is not defined');
    }
    fields.value = await repository.value.findAll();
  }

  return {
    fields,
    sortedFields,
    init,
    findOneById,
    updateOneById,
    deleteOneById,
    create,
    reset,
  };
});
