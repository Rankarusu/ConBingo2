import { toastController } from '@ionic/vue';

export async function useToast(
  message: string,
  position: 'top' | 'middle' | 'bottom'
) {
  const toast = await toastController.create({
    message: message,
    duration: 2000,
    position: position,
    cssClass: ToastCssClasses[position],
    buttons: [
      {
        text: 'Dismiss',
        role: 'cancel',
      },
    ],
  });

  await toast.present();
}

enum ToastCssClasses {
  top = 'custom-toast--top',
  bottom = 'custom-toast--bottom',
  middle = '',
}
