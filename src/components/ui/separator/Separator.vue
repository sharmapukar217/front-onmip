<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { Separator, type SeparatorProps } from "radix-vue";
import { clsx } from "@/utilities/clsx";

const props = defineProps<SeparatorProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :class="
      clsx(
        'shrink-0 bg-border',
        props.orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full',
        props.class,
      )
    " />
</template>
