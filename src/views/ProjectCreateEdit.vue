<script setup lang="ts">
import DateInput from "@/components/form/DateInput.vue";
import FileInput from "@/components/form/FileInput.vue";
import TextField from "@/components/form/TextField.vue";
import Button from "@/components/ui/Button.vue";
import { computed, reactive, ref, watch } from "vue";

const projectName = ref("");
const clientName = ref("");
const startDate = ref(""); 
const endDate = ref("");
const coverUrl = ref<string | null>(null);

const errors = reactive<Record<"name" | "client" | "start" | "end", string>>({
  name: "",
  client: "",
  start: "",
  end: "",
});

const ERROR_TEXT = {
  name: "Por favor, digite ao menos duas palavras",
  client: "Por favor, digite ao menos uma palavra",
  start: "Selecione uma data válida",
  end: "Selecione uma data válida",
} as const;

const hasTwoWords = (v: string) => /^\s*\S+(?:\s+\S+)+\s*$/.test(v);
const minTwoChars = (v: string) => v.trim().length >= 2;

function enforceDateOrderConstraint() {
  if (!endDate.value) {
    errors.end = errors.end || "";
    return;
  }
  if (startDate.value && new Date(endDate.value) < new Date(startDate.value)) {
    errors.end = "A data final deve ser posterior à data de início";
  } else if (errors.end === "A data final deve ser posterior à data de início") {
    errors.end = "";
  }
}

watch([startDate, endDate], enforceDateOrderConstraint);

function validateFieldOnBlur(e: Event) {
  const input = e.target as HTMLInputElement;
  const id = input.id as keyof typeof errors;
  errors[id] = "";

  if (id === "name" && !hasTwoWords(projectName.value)) {
    errors.name = ERROR_TEXT.name;
    return;
  }
  if (id === "client" && !minTwoChars(clientName.value)) {
    errors.client = ERROR_TEXT.client;
    return;
  }
  if (id === "start" && !startDate.value) {
    errors.start = ERROR_TEXT.start;
    return;
  }
  if (id === "end") {
    if (!endDate.value) {
      errors.end = ERROR_TEXT.end;
      return;
    }
    if (startDate.value && new Date(endDate.value) < new Date(startDate.value)) {
      errors.end = "A data final deve ser posterior à data de início";
      return;
    }
  }
}

function clearFieldErrorOnInput(e: Event) {
  const input = e.target as HTMLInputElement;
  const id = input.id as keyof typeof errors;
  if (errors[id]) errors[id] = "";
  if (id === "start" || id === "end") enforceDateOrderConstraint();
}

const isFormValid = computed(() => {
  const rulesOk =
    hasTwoWords(projectName.value) &&
    minTwoChars(clientName.value) &&
    !!startDate.value &&
    !!endDate.value &&
    (!startDate.value ||
      !endDate.value ||
      new Date(endDate.value) >= new Date(startDate.value));

  const noErrors =
    !errors.name && !errors.client && !errors.start && !errors.end;

  return rulesOk && noErrors;
});

function submitForm(e: Event) {
  e.preventDefault();

  errors.name = hasTwoWords(projectName.value) ? "" : ERROR_TEXT.name;
  errors.client = minTwoChars(clientName.value) ? "" : ERROR_TEXT.client;
  errors.start = startDate.value ? "" : ERROR_TEXT.start;
  if (!endDate.value) errors.end = ERROR_TEXT.end;
  enforceDateOrderConstraint();

  if (!isFormValid.value) return;
}
</script>

<template>
  <section class="max-w-screen-xl mx-auto px-6 py-10">
    <h1 class="text-heading text-xl font-semibold leading-100p mb-6">
      Novo projeto
    </h1>

    <form @submit="submitForm" class="space-y-6" novalidate>
      <TextField
        id="name"
        label="Nome do projeto"
        required
        v-model="projectName"
        :error="errors.name"
        @blur="validateFieldOnBlur"
        @input="clearFieldErrorOnInput"
      />

      <TextField
        id="client"
        label="Cliente"
        required
        v-model="clientName"
        :error="errors.client"
        @blur="validateFieldOnBlur"
        @input="clearFieldErrorOnInput"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DateInput
          id="start"
          label="Data de Início"
          required
          v-model="startDate"
          :error="errors.start"
          @blur="validateFieldOnBlur"
          @input="clearFieldErrorOnInput"
        />
        <DateInput
          id="end"
          label="Data Final"
          required
          v-model="endDate"
          :min="startDate || undefined"
          :error="errors.end"
          @blur="validateFieldOnBlur"
          @input="clearFieldErrorOnInput"
        />
      </div>

      <FileInput label="Capa do projeto" v-model="coverUrl" />

      <div class="pt-2">
        <Button
          type="submit"
          :disabled="!isFormValid"
          class="w-full text-md leading-tight"
        >
          Salvar projeto
        </Button>
      </div>
    </form>
  </section>
</template>
