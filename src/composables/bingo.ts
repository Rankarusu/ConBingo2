import { DbBingoField } from '@/models/DbBingoField';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

import {
  useDeleteCurrentSheet,
  useInsertIntoCurrentSheet,
  useSelectAllCurrentSheet,
  useSelectAllFields,
} from './database';

export async function useInitializeSheet(db: SQLiteDBConnection) {
  const fields = await useSelectAllFields(db);
  const concreteFields = fields.values;
  if (!concreteFields) {
    throw new Error('dbFields are not there');
  }
  const fieldAmount = concreteFields.length;

  const indices = generateUniqueRandomNumbers(24, fieldAmount);
  const textFields = indices.map((index) => concreteFields[index]);
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
  db: SQLiteDBConnection,
  fields: DbBingoField[]
) {
  const currentSheet = await useSelectAllCurrentSheet(db);
  const concreteSheet = currentSheet.values;
  if (!concreteSheet) {
    throw new Error('dbFields are not there');
  }

  if (concreteSheet.length < 25) {
    await useDeleteCurrentSheet(db);
    for (let i = 0; i < fields.length; i++) {
      await useInsertIntoCurrentSheet(db, {
        id: i,
        text: fields[i].text,
        checked: fields[i].checked,
      } as DbBingoField);
    }
  }
}
