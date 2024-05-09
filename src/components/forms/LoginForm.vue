<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useForm } from "vee-validate";
import { readMe } from "@directus/sdk";
import { toTypedSchema } from "@vee-validate/zod";
import { CapacitorCookies } from "@capacitor/core";
import { HiEye, HiEyeSlash } from "@kalimahapps/vue-icons/hi";
import { BsGoogle, BsApple } from "@kalimahapps/vue-icons/bs";

import {
  FormField,
  FormItem,
  FormLabel,
  FormInput,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useI18n } from "#i18n";
import { client } from "@/utilities/directus";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/utilities/zod-schema";

const { t } = useI18n();
const passwordShown = ref(false);

const { handleSubmit, isSubmitting, setErrors } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await client.login(values.emailAddress, values.password);
    if (response.access_token && response.refresh_token) {
      client.setToken(response.access_token);

      await CapacitorCookies.setCookie({
        key: "access_token",
        value: response.access_token,
      });

      await CapacitorCookies.setCookie({
        key: "refresh_token",
        value: response.refresh_token,
      });

      const currentUser = await client.request(readMe({ fields: ["first_name"] }));
      toast.success(t("account.login.successMessage", { name: currentUser.first_name }), {
        id: "login",
      });
      navigateTo("/");
    }
  } catch (err: any) {
    if (err.errors?.length) {
      setErrors({ emailAddress: err.errors[0].message });
    } else {
      toast.error(t("account.login.errorMessage"), { id: "login" });
    }
  }
});

const loginWithGoogle = async () => {};
</script>

<template>
  <div class="grid gap-6">
    <form class="space-y-6" @submit="onSubmit">
      <FormField name="emailAddress" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>{{ $t("form.label.emailAddress") }}</FormLabel>
          <FormControl>
            <FormInput
              required
              type="email"
              autoCorrect="off"
              v-bind="componentField"
              placeholder="eg: name@example.com" />
            <FormMessage />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="password" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>{{ $t("form.label.password") }}</FormLabel>
          <FormControl>
            <div class="relative">
              <FormInput
                required
                class="pe-8"
                autoCorrect="off"
                v-bind="componentField"
                placeholder="●●●●●●●●"
                :type="passwordShown ? 'text' : 'password'" />
              <button
                type="button"
                class="absolute top-0 right-0.5 h-full px-2"
                @click="() => (passwordShown = !passwordShown)">
                <HiEyeSlash v-if="passwordShown" />
                <HiEye v-else />
              </button>
            </div>

            <div class="text-right">
              <Button variant="link" class="ms-auto p-0">Forgot password?</Button>
            </div>

            <FormMessage />
          </FormControl>
        </FormItem>
      </FormField>

      <Button class="px-6" :disabled="isSubmitting">
        {{ $t("account.login.submitBtnTitle") }}
      </Button>
    </form>

    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-foreground/75 font-medium">
          {{ $t("orContinueWith") }}
        </span>
      </div>
    </div>

    <Button
      variant="outline"
      class="space-x-3"
      :disabled="isSubmitting"
      @click="loginWithGoogle">
      <BsGoogle class="text-red-500" />
      <span>Google</span>
    </Button>

    <Button variant="inverted" class="space-x-3" :ring="false" :disabled="isSubmitting">
      <BsApple />
      <span>Apple</span>
    </Button>
  </div>
</template>
