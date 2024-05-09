<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { useFormField } from "./useFormField";
import { clsx } from "@/utilities/clsx";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { formDescriptionId } = useFormField();
</script>

<template>
  <p :id="formDescriptionId" :class="clsx('text-sm text-muted-foreground', props.class)">
    <slot />
  </p>
</template>
