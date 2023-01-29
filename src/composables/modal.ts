import FieldEditModal from '@/components/FieldEditModal.vue';
import { useCurrentSheetStore } from '@/stores/currentSheetStore';
import { useFieldsStore } from '@/stores/fieldsStore';
import { modalController } from '@ionic/vue';

export async function useOpenAddModal() {
  const fieldsStore = useFieldsStore();
  const modal = await modalController.create({
    component: FieldEditModal,
    componentProps: { title: 'Add Field' },
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  console.log(data, role);
  if (role === 'confirm') {
    return await fieldsStore.create(data);
  }
  return null;
}

export async function useOpenEditModal(id: number) {
  const fieldsStore = useFieldsStore();

  const field = await fieldsStore.findOneById(id);
  const modal = await modalController.create({
    component: FieldEditModal,
    componentProps: { title: 'Edit Field', fieldText: field?.text },
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  console.log(data, role);
  if (role === 'confirm') {
    return await fieldsStore.updateOneById(id, data);
  }
  return null;
}

export async function useOpenEditCurrentModal(id: number) {
  const currentSheetStore = useCurrentSheetStore();

  const field = await currentSheetStore.findOneById(id);
  const modal = await modalController.create({
    component: FieldEditModal,
    componentProps: { title: 'Edit Field', fieldText: field?.text },
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  console.log(data, role);
  if (role === 'confirm') {
    return await currentSheetStore.updateOneById(id, data);
  }
  return null;
}
