import { alertController } from '@ionic/vue';
import { DbConnectionWrapper } from './database';

export async function useResetFieldsAlert(db: DbConnectionWrapper) {
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
    await db.deleteAllFields();
    return await db.importFields();
  }
  return null;
}
