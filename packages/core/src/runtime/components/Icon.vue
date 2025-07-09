<script lang="ts">
export interface IconProps {
  name: string
}
</script>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'

const props = defineProps<IconProps>()
</script>

<template>
  <IconifyIcon :icon="name.replace(/^i-/, '')" v-bind="props" />
</template>
