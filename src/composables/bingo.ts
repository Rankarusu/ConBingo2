import { DbBingoField } from '@/models/DbBingoField';
import { Db } from './database';

export async function useInitializeSheet(db: Db) {
  const fields = await db.selectAllFields();

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

export async function useSetCurrentSheet(db: Db, fields: DbBingoField[]) {
  await db.deleteCurrentSheet();
  for (let i = 0; i < fields.length; i++) {
    await db.insertIntoCurrentSheet({
      id: i,
      text: fields[i].text,
      checked: fields[i].checked,
    } as DbBingoField);
  }
  db.commit();
}
