import { ComponentInternalInstance, inject, Ref } from 'vue';
import { SQLiteHook } from 'vue-sqlite-hook';
import { DbBingoField } from '@/models/DbBingoField';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { InjectionKey } from 'vue';

export const DB_INJECTION_KEY: InjectionKey<Ref<SQLiteDBConnection>> =
  Symbol('DB');

export async function useConnectDatabase(
  app: ComponentInternalInstance,
  db: Ref<SQLiteDBConnection | undefined>
) {
  const sqlite: SQLiteHook = app?.appContext.config.globalProperties.$sqlite;
  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection('db', false)).result;
  console.log(isConn);
  if (ret.result && isConn) {
    db.value = await sqlite.retrieveConnection('db', false);
  } else {
    db.value = await sqlite.createConnection(
      'db',
      false,
      'no-encryption',
      2,
      false
    );
  }
}

export async function useCreateTables(db: SQLiteDBConnection) {
  const result = await db.execute(`
  CREATE TABLE IF NOT EXISTS fields (
    id INTEGER PRIMARY KEY NOT NULL,
    text TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sheets (
    id INTEGER PRIMARY KEY NOT NULL,
    content TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS currentSheet (
    id INTEGER PRIMARY KEY NOT NULL,
    text TEXT NOT NULL,
    checked INTEGER DEFAULT 0
  );
`);
  return result;
}

export async function useImportFields(db: SQLiteDBConnection) {
  const result = await db.execute(`
  INSERT INTO fields (text) VALUES
  ("Someone fixing their cosplay on the course"),
  ("Meme cosplayer"),
  ("Ahegao hoodie/shirt"),
  ("Bear cosplaying girl"),
  ("Dressed normally but cat ears/tail"),
  ("Dangerously low amount of clothing"),
  ("Dat ass"),
  ("Cosplayer with prop obviously not peace bonded"),
  ("Really shitty wig"),
  ("Someone using a selfie stick"),
  ("Button enthusiast"),
  ("Person carrying a lot of merch of one character"),
  ("Circle of people sitting on the floor playing Switch"),
  ("Idol cosplay group"),
  ("Girl group cosplaying guys from the same show (e.g Haikyuu)"),
  ("""Free Hugs"""),
  ("Someone wearing just a Naruto headband"),
  ("""I think I'm getting a cold..."""),
  ("Body type of cosplayer and and cosplayed character do not match"),
  ("Non-anime related cosplay"),
  ("Someone doing something inappropriate"),
  ("Someone shouting an old meme"),
  ("Buff guy dressed as girl"),
  ("Fur suit"),
  ("Overpriced food/water"),
  ("Smelly people"),
  ("People with weapons fighting"),
  ("Obligatory Genshin cosplayers"),
  ("Ramune"),
  ("MIKU"),
  ("Shingeki no Kyojin cosplay group"),
  ("Boku no Hero Academia cosplay group"),
  ("Someone carrying a body pillow"),
  ("Deadpool"),
  ("JoJo cosplayer (Pose with them!)"),
  ("Maid outfits"),
  ("Gender swap cosplay"),
  ("Cosplay couple"),
  ("Eeeveelution cosplay"),
  ("It rains"),
  ("Program gets changed/delayed"),
  ("Guy cosplaying Astolfo"),
  ("""My butt/legs/feet hurt"""),
  ("People playing TCG (Yu-Gi-Oh!, MTG, etc.)"),
  ("Lost parents"),
  ("Person that is probably sweating to death in his full body cosplay."),
  ("20 (or more) meter queue")
`);
  return result;
}

export async function useSelectAllFields(db: SQLiteDBConnection) {
  const fields = await db.query(`SELECT * FROM fields`);
  return fields;
}

export async function useSelectAllCurrentSheet(db: SQLiteDBConnection) {
  const fields = await db.query(`SELECT * FROM currentSheet`);
  return fields;
}

export async function useDeleteCurrentSheet(db: SQLiteDBConnection) {
  const result = await db.execute(`DELETE FROM currentSheet;`);
  return result;
}

export async function useInsertIntoCurrentSheet(
  db: SQLiteDBConnection,
  field: DbBingoField
) {
  const result = await db.run(
    `INSERT INTO currentSheet (id,text,checked) VALUES (?,?,?);`,
    [field.id, field.text, field.checked || false]
  );
  return result;
}

export async function useInjectDb() {
  const db = inject(DB_INJECTION_KEY, null);
  if (!db) {
    throw new Error('Could not inject DB connection');
  }
  return db;
}
