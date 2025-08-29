<script setup lang="ts">
import DateInput from "@/components/form/DateInput.vue";
import FileInput from "@/components/form/FileInput.vue";
import TextField from "@/components/form/TextField.vue";
import Button from "@/components/ui/Button.vue";
import { useProjectStore } from "@/stores/project";
import type { Project } from "@/types/project";
import { IconArrowLeft } from "@tabler/icons-vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useProjectStore();

const isEdit = computed(() => Boolean(route.params.id));
const editingId = computed(() => (route.params.id as string) || null);

const projectName = ref("");
const clientName = ref("");
const startDate = ref("");
const endDate = ref("");
const coverUrl = ref<string | null>(null);

onMounted(() => {
  if (isEdit.value && editingId.value) {
    const existing = store.getById(editingId.value);
    if (!existing) {
      router.replace({ name: "Home" });
      return;
    }
    projectName.value = existing.name;
    clientName.value = existing.client;
    startDate.value = existing.startDate;
    endDate.value = existing.endDate;
    coverUrl.value = existing.image ?? null;
  }
});

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
  } else if (
    errors.end === "A data final deve ser posterior à data de início"
  ) {
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
    if (
      startDate.value &&
      new Date(endDate.value) < new Date(startDate.value)
    ) {
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

  if (isEdit.value && editingId.value) {
    store.update(editingId.value, {
      name: projectName.value.trim(),
      client: clientName.value.trim(),
      startDate: startDate.value,
      endDate: endDate.value,
      image: coverUrl.value ?? undefined,
    });
  } else {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: projectName.value.trim(),
      client: clientName.value.trim(),
      startDate: startDate.value,
      endDate: endDate.value,
      favorite: false,
      image: coverUrl.value ?? undefined,
    };
    store.add(newProject);
  }

  router.push({ name: "Home" });
}
</script>

<template>
  <section class="px-16 py-20">
    <button
      type="button"
      class="inline-flex items-center gap-2 text-primary hover:underline mb-2"
      @click="router.back()"
    >
      <IconArrowLeft class="w-5 h-5" aria-hidden="true" />
      Voltar
    </button>

    <h1 class="text-heading text-xl font-semibold leading-100p mb-4">
      {{ isEdit ? "Editar projeto" : "Novo projeto" }}
    </h1>

    <div class="w-full rounded-lg border border-[#DCDCDC] p-6 md:p-8">
      <div class="max-w-[704px] mx-auto">
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
      </div>
    </div>
  </section>
</template>
