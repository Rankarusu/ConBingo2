import { createApp, provide } from 'vue';
import App from './App.vue';
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* SQLite imports */
import {
  defineCustomElements as jeepSqlite,
  applyPolyfills,
} from 'jeep-sqlite/loader';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { useState } from '@/composables/state';
import {
  createTables,
  importFields,
  selectAllFields,
} from './utils/utils-db-no-encryption';
import { defaultFields, schema } from './utils/dbJSONimport';
import {
  useCreateTables,
  useImportFields,
  useSelectAllFields,
} from './composables/database';

applyPolyfills().then(() => {
  jeepSqlite(window);
});

window.addEventListener('DOMContentLoaded', async () => {
  const platform = Capacitor.getPlatform();
  const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);

  const app = createApp(App).use(IonicVue).use(router);

  /* SQLite Global Variables*/

  // Only if you want to use the onProgressImport/Export events
  const [jsonListeners, setJsonListeners] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState('');
  app.config.globalProperties.$isModalOpen = {
    isModal: isModal,
    setIsModal: setIsModal,
  };
  app.config.globalProperties.$isJsonListeners = {
    jsonListeners: jsonListeners,
    setJsonListeners: setJsonListeners,
  };
  app.config.globalProperties.$messageContent = {
    message: message,
    setMessage: setMessage,
  };

  //  Existing Connections Store
  const [existConn, setExistConn] = useState(false);
  app.config.globalProperties.$existingConn = {
    existConn: existConn,
    setExistConn: setExistConn,
  };

  try {
    if (platform === 'web') {
      // Create the 'jeep-sqlite' Stencil component
      const jeepSqlite = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqlite);
      await customElements.whenDefined('jeep-sqlite');
      // Initialize the Web store
      await sqlite.initWebStore();
    }
    // here you can initialize some database schema if required

    // example: database creation with standard SQLite statements
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection('db', false)).result;
    let db: SQLiteDBConnection;
    if (ret.result && isConn) {
      db = await sqlite.retrieveConnection('db', false);
    } else {
      db = await sqlite.createConnection(
        'db',
        false,
        'no-encryption',
        2,
        false
      );
    }

    await db.open();
    const res = await useCreateTables(db);
    console.log(res);
    //handle fucked JSON here
    // const a = await sqlite.isJsonValid(JSON.stringify(schema));
    // const res = await sqlite.importFromJson(JSON.stringify(schema));
    if (res.changes && res.changes.changes && res.changes.changes < 0) {
      throw new Error(`Error: execute failed`);
    }

    const fields = await useSelectAllFields(db);
    console.log(fields);
    //fill the db with our predefined fields if there are none.
    if (!fields.values?.length) {
      await useImportFields(db);
    }

    await sqlite.closeConnection('db', false);

    router.isReady().then(() => {
      app.mount('#app');
    });

    // document.addEventListener('pause', onPause, false);
  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error(`Error: ${err}`);
  }

  // async function onPause() {
  //   console.log('onPause emitted');
  //   await sqlite.closeConnection('db', false);
  // }
});
