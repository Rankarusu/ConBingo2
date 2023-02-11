import { CurrentSheetRepository } from '@/composables/database';
import { CheckableBingoField } from '@/models/CheckableBingoField';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCurrentSheetStore = defineStore('currentSheet', () => {
  const repository = ref<CurrentSheetRepository>();

  const fields = ref<CheckableBingoField[]>([]);

  const checkedIds = computed(() =>
    fields.value?.filter((field) => field.checked).map((field) => field.id)
  );

  async function init(fieldsRepository: CurrentSheetRepository) {
    repository.value = fieldsRepository;
    await update();
  }

  async function findOneById(id: number) {
    return await repository.value?.findOneById(id);
  }

  async function updateOneById(id: number, text: string) {
    await repository.value?.updateOneById(id, { text });
    await update();
  }

  async function setChecked(position: number, checked: boolean) {
    await repository.value?.setChecked(position, checked);
    await update();
  }

  async function reset(fields: CheckableBingoField[]) {
    await repository.value?.reset(fields);
    await update();
  }

  async function update() {
    if (!repository.value) {
      throw new Error('currentSheet Repository is not defined');
    }

    fields.value = await repository.value.findAll();
  }

  return {
    fields,
    checkedIds,
    init,
    findOneById,
    updateOneById,
    setChecked,
    reset,
  };
});
