<script lang="ts" setup>
import type { BudgetCalculation, Task } from "~/types/Task";

const {
    params: { id },
} = useRoute();

const tasks = useState<Task[]>("tasks", () => []);

const thisTask = computed<Task | undefined>(() =>
    tasks.value.find((x) => x.id === Number(id))
);

const {
    public: { api_url },
} = useRuntimeConfig();

const { data, refresh } = await useFetch<BudgetCalculation>(
    `${api_url}/budget-calculation/${id}`,
    {
        ignoreResponseError: true,
    }
);

const interval = ref();

onMounted(() => {
    mounted.value = true;
    interval.value = setInterval(() => {
        if (!thisTask.value?.is_completed) {
            refresh();
        }
    }, 1000);
});

onBeforeUnmount(() => {
    clearInterval(interval.value);
});

const toast = useToast();

const askDeleteConfirmation = () => {
    toast.add({
        title: "Вы уверены?",
        description: "Это действие не может быть отменено",
        color: "rose",
        icon: "i-heroicons-trash-20-solid",
        actions: [
            {
                label: "Удалить",
                color: "rose",
                click: () => {
                    $fetch(`${api_url}/budget-calculation/${id}`, {
                        method: "DELETE",
                    });
                    navigateTo("/");
                },
            },
        ],
        timeout: 8000,
    });
};
</script>

<template>
    <div class="__task">
        <div v-if="thisTask?.is_completed && data" class="space-y-4">
            <div class="space-y-2">
                <div class="flex justify-between items-end">
                    <h2 class="text-2xl font-semibold">
                        {{ thisTask.brand_id }} - {{ thisTask.cb_percent }}%
                    </h2>
                    <p class="text-sm opacity-50">
                        {{
                            new Date(thisTask.open_date).toLocaleDateString(
                                "ru"
                            )
                        }}
                    </p>
                </div>
                <hr class="opacity-20 border-gray-900 dark:border-gray-100" />
            </div>

            <div class="space-y-2" data-aos="fade-left">
                <h3 class="text-xl font-semibold">
                    Общий объём оборота товаров
                </h3>
                <UBadge size="lg" variant="subtle">
                    {{ new Intl.NumberFormat().format(data.gmv) }} руб.</UBadge
                >
            </div>
            <div class="space-y-2" data-aos="fade-left" data-aos-delay="200">
                <h3 class="text-xl font-semibold">Количество покупок</h3>
                <UBadge size="lg" variant="subtle">
                    {{ data.purchaseCount }}
                    шт.
                </UBadge>
            </div>
            <div class="space-y-2" data-aos="fade-left" data-aos-delay="400">
                <h3 class="text-xl font-semibold">Сумма кэшбэка</h3>
                <UBadge size="lg" variant="subtle">
                    {{ new Intl.NumberFormat().format(data.totalCashback) }}
                    руб.
                </UBadge>
            </div>
            <div class="space-y-4" data-aos="fade-left" data-aos-delay="600">
                <hr class="opacity-20 border-gray-900 dark:border-gray-100" />
                <UButton
                    variant="outline"
                    color="rose"
                    @click="askDeleteConfirmation"
                    >Удалить подсчёт</UButton
                >
            </div>
        </div>
        <div v-else class="flex flex-col items-center">
            <UIcon name="svg-spinners:ring-resize" class="text-3xl" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
