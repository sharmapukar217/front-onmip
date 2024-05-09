<script setup>
import { useI18n } from "#i18n";
import { onBeforeMount } from "vue";
import { Toaster } from "vue-sonner";
import { CapacitorCookies } from "@capacitor/core";

const { setLocale } = useI18n();

onBeforeMount(() => {
  // set user locale
  CapacitorCookies.getCookies()
    .then(async (cookies) => {
      if (cookies.locale) await setLocale(cookies.locale);
    })
    .catch(() => {
      console.info("error occured while setting user `locale`");
    });
});
</script>

<template>
  <Toaster
    class="toaster group"
    :toast-options="{
      classes: {
        toast:
          'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
    }" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
