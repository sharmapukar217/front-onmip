<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Label, type LabelProps } from "radix-vue";

import { clsx } from "@/utilities/clsx";
import { useFormField } from "./useFormField";

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const { error, formItemId } = useFormField();
</script>

<template>
  <Label
    v-bind="delegatedProps"
    :class="
      clsx(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        error && 'text-destructive',
        props.class,
      )
    "
    :for="formItemId">
    <slot />
  </Label>
</template>
