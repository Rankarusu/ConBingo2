import FieldEditModal from '@/components/FieldEditModal.vue';
import { modalController } from '@ionic/vue';
import { inject } from 'vue';
import { DbConnectionWrapper, DB_INJECTION_KEY } from './database';

export async function useOpenModal(db: DbConnectionWrapper) {
  const modal = await modalController.create({
    component: FieldEditModal,
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  console.log(data, role);
  if (role === 'confirm') {
    const bleh = await db.insertNewField(data);
    console.log(bleh);
  }
}
