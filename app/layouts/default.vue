<script lang="ts" setup>
import type { Task } from "~/types/Task";

const tasks = useState<Task[]>("tasks", () => []);

const route = useRoute();
</script>

<template>
    <div class="__default space-y-4">
        <header>
            <UCard class="w-full">
                <div class="flex justify-between items-center">
                    <div class="flex gap-4 items-center">
                        <NuxtImg src="/logo.svg" width="36" />
                        <h1 class="text-2xl font-bold">Cashbacker</h1>
                    </div>
                    <ColorSwitch />
                </div>
            </UCard>
        </header>
        <div class="flex flex-col sm:flex-row">
            <nav class="flex sm:flex-col gap-4 flex-shrink-0">
                <UButton
                    icon="mdi:plus"
                    class="flex justify-center"
                    size="lg"
                    to="/"
                    :variant="route.path === `/` ? 'solid' : 'outline'"
                />
                <div
                    class="divide-neutral-600 overflow-auto rounded-md flex gap-1 sm:flex-col"
                >
                    <UButton
                        v-for="task in tasks"
                        :to="`/task/${task.id}`"
                        :variant="
                            route.path === `/task/${task.id}`
                                ? 'solid'
                                : 'outline'
                        "
                        :icon="
                            task.is_completed
                                ? undefined
                                : 'svg-spinners:ring-resize'
                        "
                    >
                        {{ task.brand_id }}
                        -
                        {{ task.cb_percent }}%
                    </UButton>
                </div>
            </nav>
            <main class="sm:px-4 py-4 sm:py-0 w-full">
                <slot />
            </main>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
