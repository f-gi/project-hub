<script setup lang="ts">
withDefaults(
  defineProps<{
    outline?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    ariaLabel?: string;
  }>(),
  {
    outline: false,
    disabled: false,
    type: "button",
    ariaLabel: undefined,
  }
);
defineEmits<{ (e: "click", ev: MouseEvent): void }>();
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    class="inline-flex items-center justify-center gap-2 font-medium px-5 py-[15px] rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:cursor-not-allowed"
    :class="[
      outline ? 'bg-white border text-primary' : 'bg-primary text-white',
      !disabled &&
        (outline ? 'border-primary hover:bg-primary/5' : 'hover:bg-primary/90'),
      disabled &&
        (outline
          ? 'border-primaryDisabled text-primaryDisabled'
          : 'bg-primaryDisabled'),
    ]"
    @click="$emit('click', $event)"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>
