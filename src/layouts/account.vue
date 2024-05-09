<script lang="ts" setup>
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/account/profile",
  },
  {
    title: "Security",
    href: "/account/security",
  },
  {
    title: "Appearance",
    href: "/account/appearance",
  },
  {
    title: "Notifications",
    href: "/account/notifications",
  },
];
</script>

<template>
  <div class="block space-y-6 p-10 pb-16">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Settings</h2>

      <p class="text-muted-foreground font-medium lg:font-semibold">
        Manage your account settings and set e-mail preferences.
      </p>
    </div>

    <Separator class="my-6" />
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside class="-mx-4 lg:w-1/5">
        <nav class="flex gap-2">
          <NuxtLink
            v-for="item in sidebarNavItems"
            :key="item.title"
            :to="item.href"
            exactActiveClass="bg-muted hover:bg-muted"
            :class="
              buttonVariants({
                variant: 'ghost',
                class: 'w-full text-left justify-start focus:ring-0',
              })
            ">
            {{ item.title }}
          </NuxtLink>
        </nav>
      </aside>

      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
