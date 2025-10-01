<template>
  <div class="space-y-8 transition-all duration-1000 opacity-100 translate-y-0">
    <!-- Header -->
    <div class="text-center space-y-4">
      <h2 class="text-3xl md:text-4xl font-serif text-navy-800">
        Galeri Momen Bahagia
      </h2>
      <div class="w-24 h-1 bg-navy-400 mx-auto"></div>
      <p class="text-navy-600 max-w-2xl mx-auto">
        Koleksi foto-foto indah yang mengabadikan perjalanan cinta kami
      </p>
    </div>

    <!-- Main Carousel -->
    <div class="wedding-card overflow-hidden bg-white/80 backdrop-blur-sm">
      <div class="relative aspect-[4/3] md:aspect-[16/9]">
        <!-- Main Image -->
        <div class="relative w-full h-full overflow-hidden">
          <img
            :src="photos?.[currentIndex] || ''"
            :alt="`Wedding photo ${currentIndex + 1}`"
            class="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            @error="handleImageError"
          />

          <!-- Gradient Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
          ></div>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="goToPrevious"
          class="absolute flex left-4 top-1/2 -translate-y-1/2 bg-navy-800 hover:bg-navy-600 backdrop-blur-sm text-white border border-white/20 p-2 rounded-full transition-all duration-300"
        >
          <Icon name="lucide:chevron-left" class="w-6 h-6" />
        </button>

        <button
          @click="goToNext"
          class="absolute flex right-4 top-1/2 -translate-y-1/2 bg-navy-800 hover:bg-navy-600 backdrop-blur-sm text-white border border-white/20 p-2 rounded-full transition-all duration-300"
        >
          <Icon name="lucide:chevron-right" class="w-6 h-6" />
        </button>

        <!-- Autoplay Control -->
        <button
          @click="toggleAutoplay"
          class="absolute flex top-4 right-4 bg-navy-800 hover:bg-navy-600 backdrop-blur-sm text-white border border-white/20 p-2 rounded-full transition-all duration-300"
        >
          <Icon v-if="isAutoplay" name="lucide:pause" class="w-4 h-4" />
          <Icon v-else name="lucide:play" class="w-4 h-4" />
        </button>

        <!-- Photo Counter -->
        <div
          class="absolute bottom-4 left-4 bg-navy-800 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
        >
          {{ currentIndex + 1 }} / {{ photos?.length || 0 }}
        </div>
      </div>
    </div>

    <!-- Thumbnail Strip -->
    <div class="flex justify-center">
      <div class="flex gap-2 overflow-x-auto pb-2 max-w-full">
        <button
          v-for="(photo, index) in photos"
          :key="index"
          @click="goToSlide(index)"
          class="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300"
          :class="{
            'border-navy-500 scale-110 shadow-lg': index === currentIndex,
            'border-transparent opacity-70 hover:opacity-100 hover:scale-105':
              index !== currentIndex,
          }"
        >
          <img
            :src="photo"
            :alt="`Thumbnail ${index + 1}`"
            class="w-full h-full object-cover"
            @error="handleThumbnailError"
          />
        </button>
      </div>
    </div>

    <!-- Dots Indicator -->
    <div class="flex justify-center gap-2">
      <button
        v-for="(_, index) in photos"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="{
          'bg-navy-600 scale-125': index === currentIndex,
          'bg-navy-300 hover:bg-navy-400': index !== currentIndex,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ photos?: string[] }>(), {
  photos: () => [],
})

const currentIndex = ref(0)
const isAutoplay = ref(true)
let autoplayInterval: number | null = null

watch(
  () => isAutoplay.value,
  (newVal) => {
    if (newVal) startAutoplay()
    else stopAutoplay()
  },
)

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})

function startAutoplay() {
  if (!isAutoplay.value || !props.photos?.length) return

  autoplayInterval = setInterval(() => {
    goToNext()
  }, 3000)
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

function goToPrevious() {
  if (!props.photos?.length) return
  currentIndex.value =
    (currentIndex.value - 1 + props.photos.length) % props.photos.length
}

function goToNext() {
  if (!props.photos?.length) return
  currentIndex.value = (currentIndex.value + 1) % props.photos.length
}

function goToSlide(index: number) {
  currentIndex.value = index
}

function toggleAutoplay() {
  isAutoplay.value = !isAutoplay.value
  if (isAutoplay.value) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
}

function handleImageError(e: Event) {
  const img = e.target as HTMLImageElement

  img.src =
    'https://via.placeholder.com/800x600/1e293b/ffffff?text=Wedding+Photo'
}

function handleThumbnailError(e: Event) {
  const img = e.target as HTMLImageElement

  img.src = 'https://via.placeholder.com/80x80/1e293b/ffffff?text=+'
}
</script>
