<!-- eslint-disable vue/valid-v-for -->
<!-- vue tries to bind the checked state to the keys. Using uuids to circumvent that -->
<template>
  <div class="wrapper">
    <div class="bingo-grid">
      <TransitionGroup appear name="fade">
        <BingoField
          v-for="(item, index) in fields"
          :key="index"
          :position="index"
          :text="item.text"
          :readonly="props.readonly"
          :checked="item.checked"
          :editable="editable"
          @field-checked-event="onFieldCheckedEvent(index)"
        ></BingoField>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/toast';
import { useCurrentSheetStore } from '@/stores/currentSheetStore';
import confetti from 'canvas-confetti';
import { storeToRefs } from 'pinia';
import { toRef } from 'vue';
import BingoField from './BingoField.vue';

const winningRows = [
  // horizontal
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  //vertical
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  //diagonal
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

interface BingoSheetProps {
  readonly?: boolean;
  editable?: boolean;
}

const store = useCurrentSheetStore();
const { fields } = storeToRefs(store);

const props = withDefaults(defineProps<BingoSheetProps>(), {
  readonly: false,
  editable: false,
});

const editable = toRef(props, 'editable');

async function onFieldCheckedEvent(position: number) {
  console.log('onFieldCheckedEvent caught.', position);
  const userWon = await checkWin(position);
  if (userWon) {
    win();
  }
}

function win() {
  confetti({
    particleCount: 100,
    startVelocity: 30,
    spread: 360,
    gravity: 0.8,
  });
  useToast('Winner Winner Chicken Dinner!', 'top', 'primary');
}

async function checkWin(id: number) {
  const checkedIds = store.checkedIds;

  const result = winningRows
    .filter((row) => row.every((entry) => checkedIds?.includes(entry)))
    .find((arr) => arr.includes(id)); // see if the newly selected field is in the winning row
  return result;
}
</script>

<style scoped>
.bingo-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 0.125rem;

  padding-inline-start: var(
    --ion-grid-padding-xs,
    var(--ion-grid-padding, 5px)
  );
  padding-inline-end: var(--ion-grid-padding-xs, var(--ion-grid-padding, 5px));
}

.wrapper {
  display: flex;
  flex-grow: 1;
  align-items: center;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;

  /* transform: translateX(30px); */
}
</style>
