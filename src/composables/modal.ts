import FieldEditModal from '@/components/FieldEditModal.vue';
import { modalController } from '@ionic/vue';
import { DbConnectionWrapper } from './database';

export async function useOpenAddModal(db: DbConnectionWrapper) {
  const modal = await modalController.create({
    component: FieldEditModal,
    componentProps: { title: 'Add Field' },
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  console.log(data, role);
  if (role === 'confirm') {
    return await db.insertNewField(data);
  }
  return null;
}

export async function useOpenEditModal(db: DbConnectionWrapper, id: number) {
  const field = await db.selectFieldById(id);
  const modal = await modalController.create({
    component: FieldEditModal,
    componentProps: { title: 'Edit Field', fieldText: field.text },
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  console.log(data, role);
  if (role === 'confirm') {
    return await db.updateFieldById(id, data);
  }
  return null;
}
