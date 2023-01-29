<template>
  <ion-page>
    <PageHeader title="About" />
    <ion-content :fullscreen="true">
      <ion-card class="ion-activatable">
        <ion-card-header>
          <ion-card-title>About this App</ion-card-title>
          <ion-card-subtitle>Version</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          Hi there!
          <br />
          <br />
          My name is Ranka and I'm a developer apprentice. Because me and my
          friends always play some kind of bullshit bingo at conventions I
          wanted to digitalize that process by creating some kind of app for it.
          This is already the second iteration of this application. While the
          first one used only vanilla JS and SCSS, I used this as an opportunity
          to learn about Vue and Ionic by creating a native-like app.
          <br />
          Should you have an idea to improve this app or come across any bugs,
          please let me know on the GitHub page below.
          <br />
          <br />
          Thanks for downloading!
        </ion-card-content>
        <ion-ripple-effect></ion-ripple-effect>

        <!--                                                                                                                                   
                  ████████                                  
                ██        ██                                
              ██▒▒▒▒        ██                              
            ██▒▒▒▒▒▒      ▒▒▒▒██                            
            ██▒▒▒▒▒▒      ▒▒▒▒██                            
          ██  ▒▒▒▒        ▒▒▒▒▒▒██                          
          ██                ▒▒▒▒██                          
        ██▒▒      ▒▒▒▒▒▒          ██                        
        ██      ▒▒▒▒▒▒▒▒▒▒        ██                        
        ██      ▒▒▒▒▒▒▒▒▒▒    ▒▒▒▒██                        
        ██▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒██                        
          ██▒▒▒▒  ▒▒▒▒▒▒    ▒▒▒▒██                          
          ██▒▒▒▒            ▒▒▒▒██                          
            ██▒▒              ██                            
              ████        ████                              
                  ████████                                  
                                 
        Congrats on finding the easter egg! -->
        <ion-button href="https://github.com/Rankarusu/ConBingo2" fill="clear">
          <ion-icon slot="start" :icon="logoGithub" />
          GitHub
        </ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
  IonRippleEffect,
} from '@ionic/vue';

import PageHeader from '@/components/PageHeader.vue';
import { logoGithub } from 'ionicons/icons';
</script>

<style scoped>
/* iOS places the subtitle above the title */
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}
</style>
