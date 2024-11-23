<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
    <div class="__color-switch">
        <UPopover :popper="{ placement: 'bottom-end' }">
            <UButton variant="outline">
                <UIcon
                    name="line-md:sun-rising-filled-loop"
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <UIcon
                    name="line-md:moon-rising-filled-loop"
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Смешать тему</span>
            </UButton>
            <template #panel>
                <UButtonGroup orientation="vertical">
                    <UButton
                        @click="colorMode.preference = 'light'"
                        :variant="
                            colorMode.preference === 'light'
                                ? 'solid'
                                : 'outline'
                        "
                    >
                        Светлая
                    </UButton>
                    <UButton
                        @click="colorMode.preference = 'dark'"
                        :variant="
                            colorMode.preference === 'dark'
                                ? 'solid'
                                : 'outline'
                        "
                    >
                        Тёмная
                    </UButton>
                    <UButton
                        @click="colorMode.preference = 'system'"
                        :variant="
                            colorMode.preference === 'system'
                                ? 'solid'
                                : 'outline'
                        "
                    >
                        Системная
                    </UButton>
                </UButtonGroup>
            </template>
        </UPopover>
    </div>
</template>
