import { DbBingoField } from '@/models/DbBingoField';
import { inject, InjectionKey } from 'vue';
import { DbConnectionWrapper } from './database';

const fieldsJsonRegex =
  /^\[(({"id":\d+,"text":"(.*?)","checked":(true|false)},){24}({"id":\d+,"text":"(.*?)","checked":(true|false)}))\]$/;

export const TOGGLE_CHECKED_IN_DB_INJECTION_KEY: InjectionKey<
  (position: number, checked: boolean) => Promise<void>
> = Symbol('toggleCheckedInDb');

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

export async function useInitializeSheet(db: DbConnectionWrapper) {
  const fields = await db.fields.findAll();

  const indices = generateUniqueRandomNumbers(24, fields.length);
  const textFields = indices.map((index) => fields[index]);
  //insert free space in the middle
  textFields.splice(12, 0, {
    id: undefined,
    text: 'FREE SPACE',
    checked: true,
  });

  return textFields;
}

function generateUniqueRandomNumbers(limit: number, range: number) {
  const numbers = new Set<number>();
  while (numbers.size < limit) {
    const randomNumber = Math.floor(Math.random() * range);
    numbers.add(randomNumber);
  }
  return Array.from(numbers);
}

export async function useSetCurrentSheet(
  db: DbConnectionWrapper,
  fields: DbBingoField[]
) {
  await db.currentSheet.deleteAll();
  for (let i = 0; i < fields.length; i++) {
    await db.currentSheet.create({
      id: i,
      text: fields[i].text,
      checked: fields[i].checked,
    } as DbBingoField);
  }
  await db.commit();
}

export async function useSaveSheet(db: DbConnectionWrapper) {
  const fields = await db.currentSheet.findAll();
  const fieldsString = JSON.stringify(fields);
  if (!fieldsString.match(fieldsJsonRegex)) {
    throw new Error('malformed JSON input. cannot save sheet');
  }
  console.log(JSON.stringify(fields));
  await db.savedSheets.create(JSON.stringify(fields));
}
