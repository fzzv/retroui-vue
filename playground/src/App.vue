<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
</script>

<template>
  <RApp>
    <div class="min-h-screen bg-background p-8">
      <div class="max-w-4xl mx-auto space-y-8">
        <h1 class="text-3xl font-bold text-foreground mb-8">
          RetroUI Vue Components
        </h1>

        <!-- Button Variants -->
        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-foreground">
            Button Variants
          </h2>
          <div class="flex flex-wrap gap-4">
            <RButton variant="default">
              Default
            </RButton>
            <RButton variant="secondary">
              Secondary
            </RButton>
            <RButton variant="outline">
              Outline
            </RButton>
            <RButton variant="link">
              Link
            </RButton>
            <RButton variant="success">
              Success
            </RButton>
            <RButton variant="warning">
              Warning
            </RButton>
            <RButton variant="error">
              Error
            </RButton>
          </div>
        </section>

        <!-- Button Sizes -->
        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-foreground">
            Button Sizes
          </h2>
          <div class="flex flex-wrap items-center gap-4">
            <RButton size="sm">
              Small
            </RButton>
            <RButton size="md">
              Medium
            </RButton>
            <RButton size="lg">
              Large
            </RButton>
            <RButton size="xl">
              Extra Large
            </RButton>
          </div>
        </section>

        <!-- Color Mode Toggle -->
        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-foreground">
            Color Mode
          </h2>
          <RButton
            variant="outline"
            @click="mode = mode === 'dark' ? 'light' : 'dark'"
          >
            {{ mode === 'dark' ? '🌙 Dark' : '☀️ Light' }} Mode
          </RButton>
          <p class="text-foreground-muted">
            Current mode: {{ mode }}
          </p>
        </section>
      </div>
    </div>
  </RApp>
</template>
