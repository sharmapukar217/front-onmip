<script setup lang="ts">
import { siteConfig } from "@/config";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/forms/LoginForm.vue";
</script>

<template>
  <div
    class="container relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <!-- left side of page -->
    <div
      class="relative hidden h-full flex-col bg-muted p-10 text-background lg:flex border-r">
      <div class="absolute inset-0 bg-zinc-900"></div>

      <div class="relative z-20 flex items-center text-lg font-medium">
        <NuxtLink to="/">
          {{ siteConfig.title }}
        </NuxtLink>
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;A better way to find your freelancing job, finding jobs online was
            never so easy&rdquo;
          </p>
          <footer class="text-sm">Pukar Sharma</footer>
        </blockquote>
      </div>
    </div>

    <!-- right side of page ( actual login form ) -->
    <div class="flex flex-col lg:px-8 py-4 h-full">
      <!-- top side for logo and links -->
      <div class="w-full flex items-center pb-4">
        <NuxtLink
          to="/"
          class="lg:hidden inline-flex items-center justify-center dark:size-12 dark:saturate-200 dark:brightness-150">
          <img src="~/assets/images/icon.png" alt="" class="flex-shrink-0 w-12 h-12" />
        </NuxtLink>

        <Button asChild variant="ghost" class="ml-auto">
          <NuxtLink to="/auth/register">
            {{ $t("auth.login.registerLinkTitle") }}
          </NuxtLink>
        </Button>
      </div>

      <!-- main content here -->
      <div class="m-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            {{ $t("auth.login.formTitle") }}
          </h1>
          <p
            class="text-sm font-medium lg:font-semibold lg:text-base text-muted-foreground">
            {{ $t("auth.login.formSubtitle") }}
          </p>
        </div>

        <LoginForm />

        <div class="px-8 text-center text-sm text-muted-foreground">
          By clicking the above button, you agree to our
          <NuxtLink
            to="#"
            class="inline underline underline-offset-4 hover:text-primary font-medium">
            {{ $t("termsAndServices") }}
          </NuxtLink>
          and
          <NuxtLink
            to="#"
            class="inline underline underline-offset-4 hover:text-primary font-medium">
            {{ $t("privacyPolicy") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
