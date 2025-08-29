<script setup lang="ts">
import { IconTrash } from "@tabler/icons-vue";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps<{
  modelValue: boolean;
  projectName?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const panel = ref<HTMLDivElement | null>(null);
const cancelBtn = ref<HTMLButtonElement | null>(null);

const close = () => {
  emit("update:modelValue", false);
  emit("cancel");
};
const confirm = () => {
  emit("confirm");
  emit("update:modelValue", false);
};

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}
function onClickOutside(e: MouseEvent) {
  if (panel.value && !panel.value.contains(e.target as Node)) close();
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) requestAnimationFrame(() => cancelBtn.value?.focus());
  }
);

onMounted(() => {
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("mousedown", onClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
  document.removeEventListener("mousedown", onClickOutside);
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[70] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        ref="panel"
        class="relative bg-white rounded-lg shadow-xl w-[min(90vw,582px)] p-6 sm:p-7"
      >
        <div
          class="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary shadow-md grid place-items-center"
          aria-hidden="true"
        >
          <IconTrash class="w-7 h-7 text-white" />
        </div>

        <h3
          id="confirm-title"
          class="mt-6 text-center text-[22px] leading-[32px] font-semibold text-heading"
        >
          Remover projeto
        </h3>

        <hr class="mt-4 mb-6 border-[#8C8B93]" />

        <p class="text-center text-[16px] leading-[22px] text-[#717171]">
          Essa ação removerá definitivamente o projeto:
        </p>
        <p
          class="mt-3 text-center text-[24px] leading-[32px] font-medium text-[#1C1930]"
        >
          {{ props.projectName || "" }}
        </p>

        <div
          class="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center sm:gap-6"
        >
          <button
            ref="cancelBtn"
            type="button"
            class="px-10 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary/5 transition-colors"
            @click="close"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="px-10 h-12 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
            @click="confirm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
