<script lang="ts" setup>
import type { Task } from "./types/Task";

const tasks = useState<Task[]>("tasks", () => []);

const {
    public: { api_url },
} = useRuntimeConfig();

const { data: fetchedTasks, refresh } = await useFetch<Task[]>(
    `${api_url}/budget-list`
);

watchEffect(() => {
    tasks.value = fetchedTasks.value ?? [];
});

onMounted(() => {
    setInterval(() => {
        refresh();
    }, 1000);
});

useHead({
    link: [
        {
            rel: "icon",
            type: "image/svg+xml",
            href: "/logo.svg",
        },
    ],
});
</script>

<template>
    <div class="__root">
        <UNotifications />
        <NuxtRouteAnnouncer />
        <NuxtLoadingIndicator color="rgb(var(--color-primary-DEFAULT))" />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<style lang="scss" scoped>
.__root {
    @apply w-full mx-auto max-w-[800px] p-4 md:p-8;
}
</style>
