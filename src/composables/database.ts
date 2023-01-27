import { DbBingoField } from '@/models/DbBingoField';
import { BingoSheet } from '@/models/BingoSheet';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { inject, InjectionKey } from 'vue';

export const DB_INJECTION_KEY: InjectionKey<DbConnectionWrapper> = Symbol('DB');

export function useInjectDb() {
  const db = inject(DB_INJECTION_KEY, null);
  if (!db) {
    throw new Error('Could not inject DB connection');
  }
  return db;
}
abstract class DbConnected {
  public db: SQLiteDBConnection;

  protected sqlite: SQLiteConnection;

  protected platform: string;

  constructor(db: SQLiteDBConnection, sqlite: SQLiteConnection) {
    this.db = db;
    this.sqlite = sqlite;
    this.platform = Capacitor.getPlatform();
  }
}
export class DbConnectionWrapper extends DbConnected {
  public static DB_NAME = 'db';

  private static instance: DbConnectionWrapper;

  public currentSheet: CurrentSheetRepository;

  public fields: FieldsRepository;

  public savedSheets: SavedSheetsRepository;

  // public static async getInstance() {
  //   if (!DbConnectionWrapper.instance) {
  //     DbConnectionWrapper.instance = await this.create();
  //     console.log('instance created');
  //   }
  //   console.log('instance returned');
  //   return DbConnectionWrapper.instance;
  // }

  public static async create() {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (
      await sqlite.isConnection(DbConnectionWrapper.DB_NAME, false)
    ).result;
    let db: SQLiteDBConnection;
    if (ret.result && isConn) {
      db = await sqlite.retrieveConnection(DbConnectionWrapper.DB_NAME, false);
    } else {
      db = await sqlite.createConnection(
        DbConnectionWrapper.DB_NAME,
        false,
        'no-encryption',
        2,
        false
      );
    }
    return new this(db, sqlite);
  }

  private constructor(db: SQLiteDBConnection, sqlite: SQLiteConnection) {
    super(db, sqlite);

    this.currentSheet = new CurrentSheetRepository(db, sqlite);
    this.fields = new FieldsRepository(db, sqlite);
    this.savedSheets = new SavedSheetsRepository(db, sqlite);
  }

  public async open() {
    await this.db.open();
  }

  public async close() {
    await this.sqlite.closeConnection(DbConnectionWrapper.DB_NAME, false);
  }

  public async commit() {
    if (this.platform === 'web') {
      await this.sqlite.saveToStore(DbConnectionWrapper.DB_NAME);
    }
  }

  public async createTables() {
    const result = await this.db.execute(`
    CREATE TABLE IF NOT EXISTS fields (
      id INTEGER PRIMARY KEY NOT NULL,
      text TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS savedSheets (
      id INTEGER PRIMARY KEY NOT NULL,
      content TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS currentSheet (
      id INTEGER PRIMARY KEY NOT NULL,
      text TEXT NOT NULL,
      checked INTEGER DEFAULT 0
    );
  `);
    await this.commit();
    return result;
  }
}

abstract class BaseRepository extends DbConnected {
  protected async commit() {
    if (this.platform === 'web') {
      await this.sqlite.saveToStore(DbConnectionWrapper.DB_NAME);
    }
  }
}

export class FieldsRepository extends BaseRepository {
  constructor(db: SQLiteDBConnection, sqlite: SQLiteConnection) {
    super(db, sqlite);
  }

  public async findAll() {
    const fields = await this.db.query(`SELECT * FROM fields`);
    if (!fields.values) {
      throw new Error('values not defined');
    }
    //SQLite saves booleans as integers, so we cast them to a bool here.
    fields.values.map(
      (field: DbBingoField) => (field.checked = !!field.checked)
    );
    return fields.values as DbBingoField[];
  }

  public async findAllAlphabetical() {
    const fields = await this.db.query(`SELECT * FROM fields ORDER BY text`);
    if (!fields.values) {
      throw new Error('values not defined');
    }
    fields.values.map(
      (field: DbBingoField) => (field.checked = !!field.checked)
    );
    return fields.values as DbBingoField[];
  }

  public async findOneById(id: number) {
    const result = await this.db.query(`SELECT * FROM fields WHERE id = (?)`, [
      id,
    ]);
    if (!result.values) {
      throw new Error('values not defined');
    }
    return result.values[0] as { id: number; text: string };
  }

  public async updateOneById(id: number, text: string) {
    const result = await this.db.run(
      `UPDATE fields SET text = (?) WHERE id = (?)`,
      [text, id]
    );
    this.commit();
    return result;
  }

  public async deleteAll() {
    const result = await this.db.execute(`DELETE FROM fields`);
    this.commit();
    return result;
  }

  public async deleteById(id: number) {
    const result = await this.db.run(`DELETE FROM fields WHERE id = (?)`, [id]);
    await this.commit();
    return result;
  }

  public async create(text: string) {
    const result = await this.db.run(`INSERT INTO fields (text) VALUES (?)`, [
      text,
    ]);
    this.commit();
    return result;
  }

  public async reset() {
    const result = await this.db.execute(`
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
    await this.commit();
    return result;
  }
}

export class CurrentSheetRepository extends BaseRepository {
  constructor(db: SQLiteDBConnection, sqlite: SQLiteConnection) {
    super(db, sqlite);
  }
  public async findAll() {
    const fields = await this.db.query(`SELECT * FROM currentSheet`);
    if (!fields.values) {
      throw new Error('values not defined');
    }
    fields.values.map(
      (field: DbBingoField) => (field.checked = !!field.checked)
    );

    return fields.values as DbBingoField[];
  }
  public async findOneById(id: number) {
    const result = await this.db.query(
      `SELECT * FROM currentSheet WHERE id = (?)`,
      [id]
    );
    if (!result.values) {
      throw new Error('values not defined');
    }
    return result.values[0] as { id: number; text: string };
  }
  public async updateOneById(id: number, text: string) {
    const result = await this.db.run(
      `UPDATE currentSheet SET text = (?) WHERE id = (?)`,
      [text, id]
    );
    this.commit();
    return result;
  }
  public async findAllChecked() {
    const ids = await this.db.query(
      `SELECT id FROM currentSheet WHERE checked = 1`
    );
    if (!ids.values) {
      throw new Error('values not defined');
    }
    const result = ids.values.map((row: { id: number }) => row.id);

    return result;
  }
  public async deleteAll() {
    const result = await this.db.execute(`DELETE FROM currentSheet;`);
    await this.commit();
    return result;
  }
  public async create(field: DbBingoField) {
    const result = await this.db.run(
      `INSERT INTO currentSheet (id,text,checked) VALUES (?,?,?);`,
      [field.id, field.text, field.checked || false]
    );
    //commit when everything is done. not here.
    return result;
  }
  public async setChecked(position: number, checked: boolean) {
    const result = await this.db.run(
      `UPDATE currentSheet SET checked = ? WHERE id = ?;`,
      [checked, position]
    );
    await this.commit();
    return result;
  }
}

export class SavedSheetsRepository extends BaseRepository {
  public async findAll() {
    const result = await this.db.query(`SELECT * FROM savedSheets`);
    if (!result.values) {
      throw new Error('values not defined');
    }

    const bingoSheets = result.values.map((sheet) => {
      const obj = {
        id: sheet.id,
        content: JSON.parse(sheet.content),
      } as BingoSheet;
      return obj;
    });
    return bingoSheets;
  }

  public async create(fields: string) {
    const result = await this.db.run(
      `INSERT INTO savedSHeets (content) VALUES (?);`,
      [fields]
    );
    this.commit();

    return result;
  }
}
