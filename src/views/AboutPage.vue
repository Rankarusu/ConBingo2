<template>
  <PageWrapper title="About">
    <ion-content :fullscreen="true">
      <ion-card>
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
  </PageWrapper>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonContent,
  IonIcon,
} from '@ionic/vue';

import PageWrapper from '@/components/PageWrapper.vue';
import { logoGithub } from 'ionicons/icons';
</script>

<style scoped>
/* iOS places the subtitle above the title */
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}
</style>
