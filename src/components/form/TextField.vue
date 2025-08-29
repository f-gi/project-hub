<script setup lang="ts">
type Emits = {
  (e: "update:modelValue", value: string): void;
  (e: "blur", ev: Event): void;
  (e: "input", ev: Event): void;
};

withDefaults(
  defineProps<{
    id: string;
    label: string;
    modelValue: string;
    required?: boolean;
    placeholder?: string;
    error?: string;
  }>(),
  {
    required: false,
    placeholder: "",
    error: "",
  }
);

const emit = defineEmits<Emits>();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement | null;
  if (!target) return;
  emit("input", event);
  emit("update:modelValue", target.value);
}

function handleBlur(event: Event) {
  emit("blur", event);
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

    <input
      :id="id"
      type="text"
      :value="modelValue"
      :required="required"
      :placeholder="placeholder"
      :aria-required="required || undefined"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : undefined"
      class="mt-2 w-full rounded-sm border bg-white px-4 py-3 outline-none border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary"
      :class="
        error ? '!border-error focus:!border-error focus:!ring-error' : ''
      "
      @input="handleInput"
      @blur="handleBlur"
    />

    <p v-if="error" :id="`${id}-error`" class="mt-1 text-xs text-error">
      {{ error }}
    </p>
  </div>
</template>
