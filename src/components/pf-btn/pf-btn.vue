<template>
  <wd-button @click="handleClick" v-bind="$attrs" :custom-class="customClass">
    <slot></slot>
    <slot name="icon"></slot>
  </wd-button>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  customClass: String,
})
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event) // 触发父组件的 `click` 事件
}
const customClass = computed(() => props.customClass)
const attrs = useAttrs()
</script>
