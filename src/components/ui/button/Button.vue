<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

import { clsx } from "@/utilities/clsx";
import { type ButtonVariants, buttonVariants } from ".";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
  ring?: ButtonVariants["ring"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});

</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="clsx(buttonVariants({ variant, size, ring }), props.class)">
    <slot />
  </Primitive>
</template>
