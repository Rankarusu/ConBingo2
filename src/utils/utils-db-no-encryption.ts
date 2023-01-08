import { capSQLiteSet } from '@capacitor-community/sqlite';
export const createTables = `
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
`;
export const importFields = `
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
`;
export const selectAllFields = `
  SELECT * FROM fields
`;

export const selectAllFieldsAlphabetical = `
  SELECT * FROM fields
  ORDER BY text ASC
`;

export const importThreeMessages = `
    DELETE FROM messages;
    INSERT INTO messages (userid,title,body) VALUES (1,"test post 1","content test post 1");
    INSERT INTO messages (userid,title,body) VALUES (2,"test post 2","content test post 2");
    INSERT INTO messages (userid,title,body) VALUES (1,"test post 3","content test post 3");
`;
export const dropTablesTablesNoEncryption = `
    PRAGMA foreign_keys = OFF;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS messages;
    PRAGMA foreign_keys = ON;
`;
export const setUsers: Array<capSQLiteSet> = [
  {
    statement: 'INSERT INTO users (name,email,age) VALUES (?,?,?);',
    values: ['Jackson', 'Jackson@example.com', 18],
  },
  {
    statement: 'INSERT INTO users (name,email,age) VALUES (?,?,?);',
    values: ['Kennedy', 'Kennedy@example.com', 25],
  },
  {
    statement: 'INSERT INTO users (name,email,age) VALUES (?,?,?);',
    values: ['Bush', 'Bush@example.com', 42],
  },
];
export const createSchemaIssue230 = `
CREATE TABLE IF NOT EXISTS DemoTable (
  name TEXT,
  score INTEGER
);
`;
