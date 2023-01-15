import { toastController } from '@ionic/vue';

export async function useToastBottom(message: string) {
  const toast = await toastController.create({
    message: message,
    duration: 2000,
    position: 'bottom',
    cssClass: 'custom-toast--bottom',
    buttons: [
      {
        text: 'Dismiss',
        role: 'cancel',
      },
    ],
  });

  await toast.present();
}

export async function useToastTop(message: string) {
  const toast = await toastController.create({
    message: message,
    duration: 2000,
    position: 'top',
    cssClass: 'custom-toast--top',
    buttons: [
      {
        text: 'Dismiss',
        role: 'cancel',
      },
    ],
  });

  await toast.present();
}
