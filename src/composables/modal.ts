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
    return await db.fields.create(data);
  }
  return null;
}

export async function useOpenEditModal(db: DbConnectionWrapper, id: number) {
  const field = await db.fields.findOneById(id);
  const modal = await modalController.create({
    component: FieldEditModal,
    componentProps: { title: 'Edit Field', fieldText: field.text },
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  console.log(data, role);
  if (role === 'confirm') {
    return await db.fields.updateOneById(id, data);
  }
  return null;
}

export async function useOpenEditCurrentModal(
  db: DbConnectionWrapper,
  id: number
) {
  const field = await db.currentSheet.findOneById(id);
  const modal = await modalController.create({
    component: FieldEditModal,
    componentProps: { title: 'Edit Field', fieldText: field.text },
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  console.log(data, role);
  if (role === 'confirm') {
    return await db.currentSheet.updateOneById(id, data);
  }
  return null;
}
