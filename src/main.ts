import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/display.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';

/* Theme variables */
import './theme/variables.css';

/* Custom Global Styles */
import './theme/globals.css';

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

/* SQLite imports */
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import {
  applyPolyfills,
  defineCustomElements as jeepSqlite,
} from 'jeep-sqlite/loader';
import { DbConnectionWrapper } from './composables/database';

import { useGenerateSheet } from './composables/bingo';
import router from './router';
import { useCurrentSheetStore } from './stores/currentSheetStore';
import { useFieldsStore } from './stores/fieldsStore';
import { useSavedSheetsStore } from './stores/savedSheetsStore';
import VueVirtualScroller from 'vue-virtual-scroller';

applyPolyfills().then(() => {
  jeepSqlite(window);
});

window.addEventListener('DOMContentLoaded', async () => {
  const platform = Capacitor.getPlatform();
  const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  const pinia = createPinia();
  const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(pinia)
    .use(VueVirtualScroller);

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

    const db = await DbConnectionWrapper.create();
    await db.open();

    console.log('db opened in main.ts');
    //TODO: use JSON for importing and validate it here.
    const res = await db.createTables();

    if (res.changes && res.changes.changes && res.changes.changes < 0) {
      throw new Error(`Error: execute failed`);
    }

    let fields = await db.fields.findAll();
    //fill the db with our predefined fields if there are none.
    if (!fields.length) {
      await db.fields.reset();
      console.log('imported fields');
    }
    fields = await db.fields.findAll();
    console.log(fields);

    const currentSheet = await db.currentSheet.findAll();

    if (currentSheet.length < 25) {
      const newSheet = await useGenerateSheet(fields);
      await db.currentSheet.reset(newSheet);
    }

    console.log(currentSheet);

    const currentSheetStore = useCurrentSheetStore();
    currentSheetStore.init(db.currentSheet);

    const fieldsStore = useFieldsStore();
    fieldsStore.init(db.fields);

    const savedSheetsStore = useSavedSheetsStore();
    savedSheetsStore.init(db.savedSheets);

    console.log('Stores initialized');

    router.isReady().then(() => {
      app.mount('#app');
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error(`Error: ${err}`);
  }
});
