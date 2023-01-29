import { BingoField } from '@/models/BingoField';
import { CheckableBingoField } from '@/models/CheckableBingoField';
import { useCurrentSheetStore } from '@/stores/currentSheetStore';
import { useFieldsStore } from '@/stores/fieldsStore';
import { useSavedSheetsStore } from '@/stores/savedSheetsStore';
import { inject, InjectionKey } from 'vue';
import { DbConnectionWrapper } from './database';

const fieldsJsonRegex =
  /^\[(({"id":\d+,"text":"(.*?)","checked":(true|false)},){24}({"id":\d+,"text":"(.*?)","checked":(true|false)}))\]$/;

export const TOGGLE_CHECKED_IN_DB_INJECTION_KEY: InjectionKey<
  (position: number, checked: boolean) => Promise<void>
> = Symbol('toggleCheckedInDb');

// const currentSheetStore = useCurrentSheetStore();
// const fieldsStore = useFieldsStore();
// const savedSheetsStore = useSavedSheetsStore();

export const winningRows = [
  // horizontal
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  //vertical
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  //diagonal
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

export function useInjectToggleCheckedInDb() {
  const toggleCheckedInDb = inject(TOGGLE_CHECKED_IN_DB_INJECTION_KEY, null);
  if (!toggleCheckedInDb) {
    throw new Error('injected function not defined');
  }
  return toggleCheckedInDb;
}

export const ON_EDIT_BINGO_FIELD_INJECTION_KEY: InjectionKey<
  (id: number) => Promise<void>
> = Symbol('onEditBingoField');

export function useInjectOnEditBingoField() {
  const onEditBingoField = inject(ON_EDIT_BINGO_FIELD_INJECTION_KEY, null);
  if (!onEditBingoField) {
    throw new Error('injected function not defined');
  }
  return onEditBingoField;
}

export async function useGenerateSheet(fields: BingoField[]) {
  // const fields = fieldsStore.fields;

  const indices = generateUniqueRandomNumbers(24, fields.length);
  const textFields = indices.map((index) => fields[index]);
  //insert free space in the middle
  textFields.splice(12, 0, {
    id: undefined,
    text: 'FREE SPACE',
    checked: true,
  } as CheckableBingoField);

  return textFields as CheckableBingoField[];
}

function generateUniqueRandomNumbers(limit: number, range: number) {
  if (range === 0) {
    throw new Error('range cannot be 0');
  }
  const numbers = new Set<number>();
  while (numbers.size < limit) {
    const randomNumber = Math.floor(Math.random() * range);
    numbers.add(randomNumber);
  }
  return Array.from(numbers);
}

export async function useSaveSheet() {
  // const fields = currentSheetStore.fields;
  // const fieldsString = JSON.stringify(fields);
  // if (!fieldsString.match(fieldsJsonRegex)) {
  //   throw new Error('malformed JSON input. cannot save sheet');
  // }
  // console.log(JSON.stringify(fields));
  // await savedSheetsStore.create(JSON.stringify(fields));
}
