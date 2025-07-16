<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

const components = ['button', 'icon']

const items = components.map(component => ({ label: component, to: `/components/${component}` }))

// 获取组件对应的图标
function getIconName(componentName: string) {
  const iconMap: Record<string, string> = {
    button: 'material-symbols:smart-button',
    icon: 'material-symbols:star-outline-rounded',
  }
  return iconMap[componentName] || 'material-symbols:extension-outline-rounded'
}
</script>

<template>
  <RApp>
    <div class="h-screen w-screen overflow-hidden flex min-h-0 bg-background text-foreground">
      <!-- 侧边栏导航 -->
      <div class="w-72 bg-card border-x-2 flex flex-col shadow-sm">
        <!-- 头部 -->
        <div class="p-6 border-y-2 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <RIcon name="material-symbols:widgets-outline-rounded" class="text-primary-foreground text-lg" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-foreground">
                RetroUI Vue
              </h1>
              <p class="text-xs text-muted-foreground">
                组件库示例
              </p>
            </div>
          </div>
        </div>

        <!-- 导航菜单 -->
        <nav class="flex-1 p-4 overflow-y-auto">
          <div class="space-y-1">
            <div class="px-3 py-2 mb-4">
              <h2 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                组件展示
              </h2>
            </div>
            <router-link
              v-for="item in items"
              :key="item.to"
              :to="item.to"
              class="group flex items-center gap-3 px-3 py-3 rounded-xl shadow-md border-2 border-black text-sm font-medium transition-all duration-200 hover:bg-accent/50 hover:text-accent-foreground hover:shadow-sm"
              active-class="bg-primary text-primary-foreground shadow-md text-black"
            >
              <div class="w-6 h-6 flex items-center justify-center rounded-md bg-background/50 group-[.router-link-exact-active]:bg-primary-foreground/20">
                <RIcon
                  :name="getIconName(item.label)"
                  class="text-sm"
                />
              </div>
              <span class="capitalize">{{ item.label }}</span>
              <RIcon
                name="material-symbols:chevron-right-rounded"
                class="ml-auto text-xs opacity-0 group-hover:opacity-100 group-[.router-link-exact-active]:opacity-100 transition-opacity"
                width="24"
                height="24"
              />
            </router-link>
          </div>
        </nav>

        <!-- 底部信息 -->
        <div class="p-4 border-y-2 bg-muted/30">
          <div class="flex items-center justify-between text-xs text-muted-foreground">
            <span>v0.0.1</span>
            <RButton
              variant="default"
              size="icon"
              class="h-8 w-8"
              @click="mode = mode === 'dark' ? 'light' : 'dark'"
            >
              <RIcon
                :name="mode === 'dark' ? 'material-symbols:light-mode-outline-rounded' : 'material-symbols:dark-mode-outline-rounded'"
                class="text-sm"
              />
            </RButton>
          </div>
        </div>
      </div>

      <!-- 主内容区域 -->
      <div class="flex-1 flex flex-col min-w-0 w-full">
        <!-- 顶部工具栏 -->
        <header class="h-16 border-y-2 border-r-2 bg-card/50 backdrop-blur-sm flex items-center justify-between px-8 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <h2 class="text-xl font-semibold text-foreground">
                {{ $route.name }} 组件
              </h2>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="text-xs text-muted-foreground hidden sm:block">
              {{ $route.path }}
            </div>
            <div class="w-px h-4 bg-border" />
            <RButton
              variant="outline"
              size="sm"
              class="gap-2"
              @click="mode = mode === 'dark' ? 'light' : 'dark'"
            >
              <RIcon
                :name="mode === 'dark' ? 'material-symbols:light-mode-outline-rounded' : 'material-symbols:dark-mode-outline-rounded'"
                class="text-sm"
              />
              <span class="hidden sm:inline">{{ mode === 'dark' ? '浅色' : '深色' }}</span>
            </RButton>
          </div>
        </header>

        <!-- 路由内容 -->
        <main class="flex-1 overflow-auto bg-background">
          <div class="min-h-full">
            <RouterView />
          </div>
        </main>
      </div>
    </div>
  </RApp>
</template>
