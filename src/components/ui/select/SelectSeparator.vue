<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { SelectSeparator, type SelectSeparatorProps } from "radix-vue";
import { clsx } from "@/utilities/clsx";

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <SelectSeparator
    v-bind="delegatedProps"
    :class="clsx('-mx-1 my-1 h-px bg-muted', props.class)" />
</template>
