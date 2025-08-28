<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { IconTrash, IconUpload } from "@tabler/icons-vue";
import { onBeforeUnmount, ref } from "vue";

type Emits = {
  (e: "update:modelValue", value: string | null): void;
};

withDefaults(
  defineProps<{
    label: string;
    modelValue: string | null;
    accept?: string;
    error?: string;
  }>(),
  {
    accept: ".jpg,.jpeg,.png",
    error: "",
  }
);

const emit = defineEmits<Emits>();

const inputEl = ref<HTMLInputElement | null>(null);
let lastObjectUrl: string | null = null;

function openDialog() {
  inputEl.value?.click();
}

function onChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file || !/^image\/(png|jpe?g)$/i.test(file.type)) return;

  if (lastObjectUrl) URL.revokeObjectURL(lastObjectUrl);
  lastObjectUrl = URL.createObjectURL(file);
  emit("update:modelValue", lastObjectUrl);
}

function removeFile() {
  if (lastObjectUrl) URL.revokeObjectURL(lastObjectUrl);
  lastObjectUrl = null;
  emit("update:modelValue", null);
}

onBeforeUnmount(() => {
  if (lastObjectUrl) URL.revokeObjectURL(lastObjectUrl);
});
</script>

<template>
  <div>
    <h2 class="text-primary font-medium text-base leading-tight mb-2">
      {{ label }}
    </h2>

    <div
      v-if="!modelValue"
      class="border-2 border-dashed border-slate-300 rounded-lg bg-background p-8 text-center"
    >
      <IconUpload
        class="mx-auto mb-4 w-6 h-6 text-slate-400"
        aria-hidden="true"
      />
      <p class="text-text text-sm mb-4">
        Escolha uma imagem .jpg ou .png no seu dispositivo
      </p>

      <Button outline type="button" @click="openDialog">Selecionar</Button>
      <input
        ref="inputEl"
        type="file"
        :accept="accept"
        class="sr-only"
        @change="onChange"
      />
    </div>

    <div v-else class="relative">
      <img
        :src="modelValue!"
        alt="Capa do projeto selecionada"
        class="w-full aspect-[16/9] object-cover rounded-lg"
      />
      <button
        type="button"
        @click="removeFile"
        class="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow grid place-items-center text-primary hover:bg-white/90"
        aria-label="Remover capa do projeto"
      >
        <IconTrash class="w-5 h-5" aria-hidden="true" />
      </button>
    </div>

    <p v-if="error" class="mt-1 text-xs text-error">{{ error }}</p>
  </div>
</template>
