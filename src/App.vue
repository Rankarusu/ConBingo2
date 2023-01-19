<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Convention Bingo</ion-list-header>

            <ion-menu-toggle
              v-for="(p, i) in appPages"
              :key="i"
              :auto-hide="false"
            >
              <ion-item
                router-direction="root"
                :router-link="p.url"
                lines="none"
                :detail="false"
                class="hydrated"
                :class="{ selected: selectedIndex === i }"
                @click="selectedIndex = i"
              >
                <ion-icon
                  slot="start"
                  :ios="p.iosIcon"
                  :md="p.mdIcon"
                ></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';
import {
  createOutline,
  createSharp,
  documentsOutline,
  documentsSharp,
  informationCircleOutline,
  informationCircleSharp,
  playOutline,
  playSharp,
} from 'ionicons/icons';
import { getCurrentInstance, provide, ref } from 'vue';
import { DbConnectionWrapper, DB_INJECTION_KEY } from './composables/database';

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Play',
    url: '/play',
    iosIcon: playOutline,
    mdIcon: playSharp,
  },
  {
    title: 'Edit Fields',
    url: '/edit',
    iosIcon: createOutline,
    mdIcon: createSharp,
  },
  {
    title: 'Saved Sheets',
    url: '/saved-sheets',
    iosIcon: documentsOutline,
    mdIcon: documentsSharp,
  },
  {
    title: 'About',
    url: '/about',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp,
  },
];
const path = window.location.pathname.split('/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex(
    (page) => page.url.toLowerCase().replace('/', '') === path.toLowerCase()
  );
}

const app = getCurrentInstance();
if (app != null) {
  const db: DbConnectionWrapper = app?.appContext.config.globalProperties.$db;
  provide(DB_INJECTION_KEY, db);
}
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-list-header {
  padding-left: 10px;
  margin-bottom: 30px;
}

ion-menu.md ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list-header {
  padding-left: 16px;
  padding-right: 16px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
