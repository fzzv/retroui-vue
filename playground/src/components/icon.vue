<script setup lang="ts">
import { ref } from 'vue'

// 常用图标列表
const commonIcons = [
  'material-symbols:home-outline-rounded',
  'material-symbols:search-rounded',
  'material-symbols:settings-outline-rounded',
  'material-symbols:person-outline-rounded',
  'material-symbols:favorite-outline-rounded',
  'material-symbols:star-outline-rounded',
  'material-symbols:download-rounded',
  'material-symbols:upload-rounded',
  'material-symbols:edit-outline-rounded',
  'material-symbols:delete-outline-rounded',
  'material-symbols:add-rounded',
  'material-symbols:remove-rounded',
  'material-symbols:check-rounded',
  'material-symbols:close-rounded',
  'material-symbols:arrow-back-rounded',
  'material-symbols:arrow-forward-rounded',
  'material-symbols:arrow-upward-rounded',
  'material-symbols:arrow-downward-rounded',
  'material-symbols:menu-rounded',
  'material-symbols:info-outline-rounded',
  'material-symbols:warning-outline-rounded',
  'material-symbols:error-outline-rounded',
  'material-symbols:check-circle-outline-rounded',
]

// 不同尺寸
const sizes = [
  { name: '小', class: 'text-sm' },
  { name: '中', class: 'text-base' },
  { name: '大', class: 'text-lg' },
  { name: '特大', class: 'text-2xl' },
  { name: '超大', class: 'text-4xl' },
]

// 不同颜色
const colors = [
  { name: '默认', class: 'text-foreground' },
  { name: '主色', class: 'text-primary' },
  { name: '成功', class: 'text-green-500' },
  { name: '警告', class: 'text-yellow-500' },
  { name: '错误', class: 'text-red-500' },
  { name: '信息', class: 'text-blue-500' },
]

const selectedIcon = ref('material-symbols:star-outline-rounded')
</script>

<template>
  <div class="max-w-6xl mx-auto p-8 space-y-12">
    <!-- 页面标题 -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-foreground">
        RIcon 组件
      </h1>
      <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
        RetroUI Vue 图标组件，基于 Iconify 提供丰富的图标库支持
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-foreground">
          基础用法
        </h2>
        <p class="text-muted-foreground">
          使用 name 属性指定要显示的图标
        </p>
      </div>
      <div class="p-8 bg-card rounded-xl border border-border">
        <div class="flex flex-wrap items-center gap-6">
          <RIcon name="material-symbols:star-outline-rounded" class="text-2xl" />
          <RIcon name="material-symbols:favorite-outline-rounded" class="text-2xl" />
          <RIcon name="material-symbols:home-outline-rounded" class="text-2xl" />
          <RIcon name="material-symbols:settings-outline-rounded" class="text-2xl" />
        </div>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-foreground">
          不同尺寸
        </h2>
        <p class="text-muted-foreground">
          通过 CSS 类控制图标大小
        </p>
      </div>
      <div class="p-8 bg-card rounded-xl border border-border">
        <div class="flex flex-wrap items-center gap-8">
          <div v-for="size in sizes" :key="size.name" class="flex flex-col items-center gap-3">
            <RIcon name="material-symbols:star-outline-rounded" :class="size.class" />
            <span class="text-sm text-muted-foreground font-medium">{{ size.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 不同颜色 -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-foreground">
        不同颜色
      </h2>
      <div class="flex flex-wrap items-center gap-4">
        <div v-for="color in colors" :key="color.name" class="flex flex-col items-center gap-2">
          <RIcon name="material-symbols:favorite-outline-rounded" :class="color.class" />
          <span class="text-sm text-muted-foreground">{{ color.name }}</span>
        </div>
      </div>
      <div class="bg-card p-4 rounded-lg">
        <pre><code>&lt;RIcon name="material-symbols:favorite-outline-rounded" class="text-primary" /&gt;
&lt;RIcon name="material-symbols:favorite-outline-rounded" class="text-red-500" /&gt;</code></pre>
      </div>
    </section>

    <!-- 常用图标展示 -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-foreground">
        常用图标
      </h2>
      <div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
        <div
          v-for="icon in commonIcons"
          :key="icon"
          class="flex flex-col items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          @click="selectedIcon = icon"
        >
          <RIcon :name="icon" class="text-xl" />
          <span class="text-xs text-muted-foreground text-center">
            {{ icon.split(':')[1]?.replace(/-/g, ' ') }}
          </span>
        </div>
      </div>
    </section>

    <!-- 选中图标详情 -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-foreground">
        选中图标详情
      </h2>
      <div class="border rounded-lg p-6">
        <div class="flex items-center gap-4 mb-4">
          <RIcon :name="selectedIcon" class="text-4xl" />
          <div>
            <h3 class="text-lg font-semibold">
              {{ selectedIcon }}
            </h3>
            <p class="text-sm text-muted-foreground">
              点击上方常用图标可以切换
            </p>
          </div>
        </div>
        <div class="bg-card p-4 rounded-lg">
          <pre><code>&lt;RIcon name="{{ selectedIcon }}" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 在按钮中使用 -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-foreground">
        在按钮中使用
      </h2>
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
          <RIcon name="material-symbols:edit-outline-rounded" class="mr-2" />
          编辑
        </RButton>
        <RButton size="icon">
          <RIcon name="material-symbols:favorite-outline-rounded" width="18" height="18" />
        </RButton>
      </div>
      <div class="bg-card p-4 rounded-lg">
        <pre><code>&lt;RButton&gt;
  &lt;RIcon name="material-symbols:download-rounded" class="mr-2" /&gt;
  下载
&lt;/RButton&gt;</code></pre>
      </div>
    </section>
  </div>
</template>
