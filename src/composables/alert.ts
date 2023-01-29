import { useFieldsStore } from '@/stores/fieldsStore';
import { alertController } from '@ionic/vue';

export async function useResetFieldsAlert() {
  const fieldsStore = useFieldsStore();
  const alert = await alertController.create({
    header: 'Reset Fields',
    message:
      'This will delete all your added and edited fields.\n\n Are you sure?',
    buttons: [
      { text: 'OK', role: 'confirm' },
      { text: 'Cancel', role: 'cancel' },
    ],
  });

  await alert.present();

  const { role } = await alert.onWillDismiss();
  console.log(role);

  if (role === 'confirm') {
    return await fieldsStore.reset();
  }
  return null;
}
