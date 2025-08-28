<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { RouterLink } from "vue-router";

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw;
    outline?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    ariaLabel?: string;
    variant?: "solid" | "outline" | "ghost";
    size?: "md" | "sm" | "icon";
  }>(),
  {
    outline: false,
    disabled: false,
    type: "button",
    ariaLabel: undefined,
    variant: "solid",
    size: "md",
  }
);

defineEmits<{ (e: "click", ev: MouseEvent): void }>();

const variantClass = props.outline
  ? "bg-white border border-primary text-primary hover:bg-primary/5 disabled:border-primaryDisabled disabled:text-primaryDisabled"
  : {
      solid:
        "bg-primary text-white hover:bg-primary/90 disabled:bg-primaryDisabled",
      outline:
        "bg-white border border-primary text-primary hover:bg-primary/5 disabled:border-primaryDisabled disabled:text-primaryDisabled",
      ghost:
        "bg-transparent text-primary hover:bg-primary/10 disabled:text-primaryDisabled",
    }[props.variant];

const sizeClass = {
  md: "px-5 py-[15px] rounded-xl",
  sm: "px-3 py-2 rounded-lg text-sm",
  icon: "px-2.5 py-2 rounded-full",
}[props.size];
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="!disabled ? to : undefined"
    :type="to ? undefined : type"
    :disabled="!to && disabled"
    :aria-label="ariaLabel"
    class="inline-flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:cursor-not-allowed"
    :class="[variantClass, sizeClass]"
    @click="!to && $emit('click', $event)"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>
