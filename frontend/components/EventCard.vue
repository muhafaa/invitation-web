<template>
  <div class="wedding-card overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
    <div class="p-6 md:p-8">
      <div class="flex items-center gap-3 mb-6">
        <div class="p-3 bg-navy-100 rounded-full">
          <Icon :name="icon" class="w-6 h-6 text-navy-600" />
        </div>
        <h3 class="text-2xl font-serif text-navy-800">{{ title }}</h3>
      </div>

      <div class="space-y-4">
        <!-- Date & Time -->
        <div class="flex items-start gap-3">
          <Icon name="lucide:calendar" class="w-5 h-5 text-navy-500 mt-1" />
          <div>
            <p class="font-semibold text-navy-800">{{ event?.date }}</p>
            <div class="flex items-center gap-2 mt-1">
              <Icon name="lucide:clock" class="w-4 h-4 text-navy-500" />
              <p class="text-navy-600">{{ event?.time }}</p>
            </div>
          </div>
        </div>

        <!-- Venue -->
        <div class="flex items-start gap-3">
          <Icon name="lucide:map-pin" class="w-5 h-5 text-navy-500 mt-1" />
          <div class="flex-1">
            <p class="font-semibold text-navy-800 mb-1">{{ event?.venue }}</p>
            <p class="text-navy-600 text-sm leading-relaxed">{{ event?.address }}</p>
          </div>
        </div>

        <!-- Google Maps Button -->
        <button
          @click="openGoogleMaps"
          class="w-full bg-navy-600 hover:bg-navy-700 text-white mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105"
        >
          <Icon name="lucide:navigation" class="w-4 h-4" />
          Lihat di Google Maps
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  event: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

const openGoogleMaps = () => {
  if (props.event?.coordinates) {
    const url = `https://www.google.com/maps/search/?api=1&query=${props.event.coordinates.lat},${props.event.coordinates.lng}`
    window.open(url, '_blank')
  }
}
</script>