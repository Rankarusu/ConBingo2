import { DbBingoField } from '@/models/DbBingoField';
import { DbConnectionWrapper } from './database';

const fieldsJsonRegex =
  /^\[(({"id":\d+,"text":"(.*?)","checked":(true|false)},){24}({"id":\d+,"text":"(.*?)","checked":(true|false)}))\]$/;

export async function useInitializeSheet(db: DbConnectionWrapper) {
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

export async function useSetCurrentSheet(
  db: DbConnectionWrapper,
  fields: DbBingoField[]
) {
  await db.deleteCurrentSheet();
  for (let i = 0; i < fields.length; i++) {
    await db.insertIntoCurrentSheet({
      id: i,
      text: fields[i].text,
      checked: fields[i].checked,
    } as DbBingoField);
  }
  await db.commit();
}

export async function useSaveSheet(db: DbConnectionWrapper) {
  const fields = await db.selectAllCurrentSheet();
  const fieldsString = JSON.stringify(fields);
  if (!fieldsString.match(fieldsJsonRegex)) {
    throw new Error('malformed JSON input. cannot save sheet');
  }
  console.log(JSON.stringify(fields));
  await db.insertIntoSavedSheets(JSON.stringify(fields));
}
