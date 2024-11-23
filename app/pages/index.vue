<script setup lang="ts">
import { object, string, number, date, type InferType } from "yup";
import { ru } from "date-fns/locale";
import type { FormSubmitEvent } from "#ui/types";
import { format } from "date-fns";

const schema = object({
    brand_id: string().required("ID бренда обязателен"),
    clientsFileKey: string().required("Ссылка на файл с клиентами обязательна"),
    open_date: date(),
    cb_percent: number()
        .typeError("Процент кешбека должен быть числом")
        .min(1, "Процент кешбека должен быть от 1%")
        .max(20, "Процент кешбека не должен превышать 20%")
        .required("Процент кешбека обязателен"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
    brand_id: "",
    clientsFileKey: "",
    open_date: new Date(),
    cb_percent: 5,
});

const overrideWithFile = ref();
const overrideWithFileSize = ref();

const pickFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.click();
    input.addEventListener("change", async () => {
        const file = input.files?.[0];
        if (file) {
            const fileContent = await file.text();
            overrideWithFile.value = fileContent;
            overrideWithFileSize.value = file.size;
            state.clientsFileKey = fileContent;
        }
    });
};

const {
    public: { api_url },
} = useRuntimeConfig();

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        const createdTask = await $fetch(`${api_url}/budget-calculation`, {
            method: "POST",
            body: {
                ...event.data,
                open_date: event.data.open_date?.toISOString().slice(0, 10),
            },
        });
        const { id } = createdTask;
        navigateTo(`/task/${id}`);
    } catch (error) {
        toast.add({
            title: "Ошибка",
            description: (error as Error).message,
            color: "rose",
            icon: "i-heroicons-exclamation-circle-20-solid",
            timeout: 5000,
        });
    }
}
</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="ID бренда" name="brand_id">
            <UInput v-model="state.brand_id" placeholder="olegtinkoff" />
        </UFormGroup>

        <UFormGroup label="Список клиентов" name="clientsFileKey">
            <div class="flex gap-2 items-center">
                <UButtonGroup v-if="overrideWithFile">
                    <UBadge
                        variant="subtle"
                        :label="`Файл загружен - ${useFormattedFileSize(
                            overrideWithFileSize
                        )}`"
                        class="min-w-64"
                    />
                    <UButton
                        color="rose"
                        icon="i-heroicons-trash-20-solid"
                        variant="outline"
                        @click="
                            () => {
                                overrideWithFile = null;
                                state.clientsFileKey = '';
                            }
                        "
                    />
                </UButtonGroup>
                <UButtonGroup class="w-full" v-else>
                    <UInput
                        v-model="state.clientsFileKey"
                        class="min-w-64"
                        placeholder="https://tinkoff.pro/vasia-pupkin.csv"
                    />
                    <UButton icon="mdi:upload" @click="pickFile" />
                </UButtonGroup>
            </div>
        </UFormGroup>

        <UFormGroup label="Старт акции" name="open_date">
            <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton
                    icon="i-heroicons-calendar-days-20-solid"
                    :label="
                        format(state.open_date, 'd MMM yyyy', {
                            locale: ru,
                        })
                    "
                />

                <template #panel="{ close }">
                    <DatePicker
                        v-model="state.open_date"
                        is-required
                        @close="close"
                    />
                </template>
            </UPopover>
        </UFormGroup>

        <UFormGroup label="Процент кэшбэка" name="cb_percent">
            <UInput v-model="state.cb_percent">
                <template #trailing>%</template>
            </UInput>
        </UFormGroup>

        <UButton type="submit"> Создать прогноз </UButton>
    </UForm>
</template>
