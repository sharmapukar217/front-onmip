<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import type { HTMLAttributes } from "vue";

import { clsx } from "@/utilities/clsx";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <input
    v-model="modelValue"
    :class="
      clsx(
        'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm font-medium shadow-sm transition-colors',
        'file:border-0 file:bg-transparent file:text-sm placeholder:text-muted-foreground',
        'focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    " />
</template>
