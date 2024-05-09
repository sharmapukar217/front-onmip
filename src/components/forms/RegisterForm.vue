<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { createUser } from "@directus/sdk";
import { toTypedSchema } from "@vee-validate/zod";
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
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "@/components/ui/select";

import { useI18n } from "#i18n";
import { client } from "@/utilities/directus";
import { Button } from "@/components/ui/button";
import { toast } from "vue-sonner";
import { registerSchema } from "@/utilities/zod-schema";

const { t } = useI18n();
const passwordShown = ref(false);

const { handleSubmit, setErrors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(registerSchema),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await client.request(
      createUser({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.emailAddress,
        password: values.password,
        role: values.companyType,
      }),
    );

    console.log(response);
  } catch (err: any) {
    if (err.errors?.length) {
      console.log(err);
      const reason = err.errors[0].extensions.code;

      if (reason === "RECORD_NOT_UNIQUE") {
        setErrors({ emailAddress: t("zodI18n.errors.invalid_email_address_used") });
      } else if (reason === "INTERNAL_SERVER_ERROR") {
        toast.error(t("account.register.errorMessage"), { id: "register" });
      }
    }
  }
});

const registerWithGoogle = async () => {};
</script>

<template>
  <div class="grid gap-6">
    <form class="space-y-6" @submit="onSubmit">
      <div class="grid md:grid-cols-2 gap-4">
        <FormField name="firstName" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>
              {{ $t("form.label.firstName") }}
              <sup class="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <FormInput
                autoCorrect="off"
                v-bind="componentField"
                placeholder="eg: John" />
              <FormMessage />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="lastName" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>
              {{ $t("form.label.lastName") }}
              <sup class="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <FormInput
                autoCorrect="off"
                v-bind="componentField"
                placeholder="eg: Doe" />
              <FormMessage />
            </FormControl>
          </FormItem>
        </FormField>
      </div>

      <FormField name="emailAddress" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>
            {{ $t("form.label.emailAddress") }}
            <sup class="text-destructive">*</sup>
          </FormLabel>
          <FormControl>
            <FormInput
              autoCorrect="off"
              v-bind="componentField"
              placeholder="eg: johndoe@gmail.com" />
            <FormMessage />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="phoneNumber" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>{{ $t("form.label.phoneNumber") }}</FormLabel>
          <FormControl>
            <FormInput
              autoCorrect="off"
              v-bind="componentField"
              placeholder="eg: +33 1 09 75 83 51" />
            <FormMessage />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="password" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>
            {{ $t("form.label.password") }}
            <sup class="text-destructive">*</sup>
          </FormLabel>
          <FormControl>
            <div class="relative">
              <FormInput
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

            <FormMessage />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="companyType">
        <FormItem>
          <FormLabel>
            {{ $t("form.label.companyType") }}
            <sup class="text-destructive">*</sup>
          </FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger class="w-[280px]">
                <SelectValue placeholder="i.e: Freelancing" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="institute">Institute</SelectItem>
                  <SelectItem value="freelancing">Freelancing</SelectItem>
                </SelectGroup>
              </SelectContent>
            </FormControl>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button class="px-6" :disabled="isSubmitting">
        {{ $t("account.register.submitBtnTitle") }}
      </Button>
    </form>

    <!-- <div class="relative">
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
      @click="registerWithGoogle">
      <BsGoogle class="text-red-500" />
      <span>Google</span>
    </Button>

    <Button variant="inverted" class="space-x-3" :ring="false" :disabled="isSubmitting">
      <BsApple />
      <span>Apple</span>
    </Button>

  --></div>
</template>
