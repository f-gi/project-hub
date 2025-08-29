<script setup lang="ts">
import { IconCalendar } from "@tabler/icons-vue";
import { ref } from "vue";

type Emits = {
  (e: "update:modelValue", value: string): void;
  (e: "blur", ev: Event): void;
};

withDefaults(
  defineProps<{
    id: string;
    label: string;
    modelValue: string;
    required?: boolean;
    min?: string;
    error?: string;
  }>(),
  {
    required: false,
    min: undefined,
    error: "",
  }
);

const emit = defineEmits<Emits>();
const inputEl = ref<HTMLInputElement | null>(null);

function handleInput(event: Event) {
  const el = event.target as HTMLInputElement | null;
  if (!el) return;
  emit("update:modelValue", el.value);
}

function handleBlur(event: Event) {
  emit("blur", event);
}

function openPicker() {
  if (inputEl.value?.showPicker) inputEl.value.showPicker();
  else inputEl.value?.focus();
}
</script>

<template>
  <div>
    <label
      :for="id"
      class="block font-medium text-base leading-tight"
      :class="error ? 'text-errorHeading' : 'text-primary'"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-xs leading-tight font-normal"
        :class="error ? 'text-error' : 'text-text'"
      >
        (Obrigatório)
      </span>
    </label>

    <div class="relative mt-2" @click="openPicker">
      <input
        ref="inputEl"
        :id="id"
        type="date"
        :value="modelValue"
        :required="required"
        :min="min"
        :aria-required="required || undefined"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-err` : undefined"
        class="w-full rounded-sm border bg-white px-4 py-3 pr-10 outline-none border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary"
        :class="
          error ? '!border-error focus:!border-error focus:!ring-error' : ''
        "
        @input="handleInput"
        @blur="handleBlur"
      />
      <IconCalendar
        class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
        :class="error ? 'text-error' : 'text-slate-400'"
        aria-hidden="true"
      />
    </div>

    <p v-if="error" :id="`${id}-err`" class="mt-1 text-xs text-error">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  display: none;
  -webkit-appearance: none;
}
input[type="date"]::-moz-calendar-picker-indicator {
  display: none;
}
</style>
