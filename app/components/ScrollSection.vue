<template>
  <section
    :id="id"
    class="transition-all duration-1000 transform"
    :class="[
      className,
      {
        'opacity-100 translate-y-0': visibleSections.has(id),
        'opacity-0 translate-y-10': !visibleSections.has(id),
      },
    ]"
  >
    <slot />
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string
    className?: string
    visibleSections?: Set<any>
  }>(),
  {
    className: '',
    visibleSections: () => new Set(),
  },
)
</script>
