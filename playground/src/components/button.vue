<script setup lang="ts">
import { ref } from 'vue'

// 响应式数据
const counter = ref(0)
const loading = ref(false)
const loading2 = ref(false)

// 事件处理函数
function handleClick() {

}

function showAlert() {

}

function incrementCounter() {
  counter.value++
}

async function simulateLoading() {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  loading.value = false
}

async function simulateLoading2() {
  loading2.value = true
  await new Promise(resolve => setTimeout(resolve, 3000))
  loading2.value = false
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-8 space-y-12">
    <!-- 页面标题 -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-foreground">
        RButton 组件
      </h1>
      <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
        RetroUI Vue 按钮组件提供多种样式变体和尺寸，支持图标、加载状态等功能
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-foreground">
          基础用法
        </h2>
        <p class="text-muted-foreground">
          最基本的按钮用法，包括默认状态和禁用状态
        </p>
      </div>
      <div class="p-8 bg-card rounded-xl border border-border">
        <div class="flex flex-wrap gap-4">
          <RButton>默认按钮</RButton>
          <RButton disabled>
            禁用按钮
          </RButton>
        </div>
      </div>
    </section>

    <!-- 按钮变体 -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-foreground">
          按钮变体
        </h2>
        <p class="text-muted-foreground">
          不同的视觉样式，适用于不同的使用场景
        </p>
      </div>
      <div class="p-8 bg-card rounded-xl border border-border">
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
        </div>
      </div>
    </section>

    <!-- 按钮尺寸 -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-foreground">
          按钮尺寸
        </h2>
        <p class="text-muted-foreground">
          提供多种尺寸选择，包括图标按钮
        </p>
      </div>
      <div class="p-8 bg-card rounded-xl border border-border">
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
          <RButton size="icon">
            <RIcon name="material-symbols:favorite-outline-rounded" />
          </RButton>
        </div>
      </div>
    </section>

    <!-- 带图标的按钮 -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-foreground">
          带图标的按钮
        </h2>
        <p class="text-muted-foreground">
          在按钮中添加图标，提升用户体验
        </p>
      </div>
      <div class="p-8 bg-card rounded-xl border border-border">
        <div class="flex flex-wrap gap-4">
          <RButton>
            <RIcon name="material-symbols:download-rounded" class="mr-2" />
            下载
          </RButton>
          <RButton variant="outline">
            <RIcon name="material-symbols:share" class="mr-2" />
            分享
          </RButton>
          <RButton variant="secondary">
            删除
            <RIcon name="material-symbols:delete-outline-rounded" class="ml-2" />
          </RButton>
        </div>
      </div>
    </section>

    <!-- 事件处理 -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-foreground">
          事件处理
        </h2>
        <p class="text-muted-foreground">
          按钮的点击事件和交互功能
        </p>
      </div>
      <div class="p-8 bg-card rounded-xl border border-border">
        <div class="flex flex-wrap gap-4">
          <RButton @click="handleClick">
            点击我
          </RButton>
          <RButton @click="showAlert">
            显示提示
          </RButton>
          <RButton @click="incrementCounter">
            计数器: {{ counter }}
          </RButton>
        </div>
      </div>
    </section>

    <!-- 加载状态 -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-foreground">
          加载状态
        </h2>
        <p class="text-muted-foreground">
          按钮的加载和禁用状态
        </p>
      </div>
      <div class="p-8 bg-card rounded-xl border border-border">
        <div class="flex flex-wrap gap-4">
          <RButton :disabled="loading" @click="simulateLoading">
            {{ loading ? '加载中...' : '开始加载' }}
          </RButton>
          <RButton variant="outline" :disabled="loading2" @click="simulateLoading2">
            <RIcon v-if="loading2" name="material-symbols:refresh-rounded" class="mr-2 animate-spin" />
            {{ loading2 ? '处理中' : '处理数据' }}
          </RButton>
        </div>
      </div>
    </section>

    <!-- 按钮组合 -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-foreground">
          按钮组合
        </h2>
        <p class="text-muted-foreground">
          多个按钮的组合使用
        </p>
      </div>
      <div class="p-8 bg-card rounded-xl border border-border">
        <div class="flex flex-wrap gap-6">
          <!-- 按钮组 -->
          <div class="flex">
            <RButton variant="secondary" class="rounded-r-none border-r-0">
              左侧
            </RButton>
            <RButton variant="secondary" class="rounded-none border-r-0">
              中间
            </RButton>
            <RButton variant="secondary" class="rounded-l-none">
              右侧
            </RButton>
          </div>

          <!-- 操作按钮组 -->
          <div class="flex gap-2">
            <RButton size="sm" variant="outline">
              <RIcon name="material-symbols:edit-outline-rounded" class="mr-1" />
              编辑
            </RButton>
            <RButton size="sm" variant="outline">
              <RIcon name="material-symbols:content-copy-outline-rounded" class="mr-1" />
              复制
            </RButton>
            <RButton size="sm" variant="outline">
              <RIcon name="material-symbols:delete-outline-rounded" class="mr-1" />
              删除
            </RButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
