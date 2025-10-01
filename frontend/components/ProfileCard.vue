<template>
  <div class="wedding-card overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
    <div class="relative">
      <!-- Photo -->
      <div class="aspect-[3/4] overflow-hidden">
        <img
          :src="person?.photo || ''"
          :alt="person?.name || ''"
          class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          @error="handleImageError"
        />
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>
      
      <!-- Profile Content -->
      <div class="p-6 space-y-4">
        <!-- Name -->
        <div class="text-center space-y-2">
          <div class="flex items-center justify-center gap-2">
            <Icon name="lucide:user" class="w-5 h-5 text-navy-600" />
            <h3 class="text-2xl font-serif text-navy-800">
              {{ person?.name }}
            </h3>
          </div>
          <p class="text-navy-600 font-medium">{{ person?.fullName }}</p>
          <div class="w-16 h-px bg-navy-300 mx-auto"></div>
        </div>

        <!-- Parents -->
        <div class="space-y-2">
          <p class="text-sm font-medium text-navy-600 text-center">
            {{ isGroom ? 'Putra dari:' : 'Putri dari:' }}
          </p>
          <div class="text-center space-y-1">
            <p class="text-navy-700 font-medium">{{ person?.father }}</p>
            <p class="text-navy-600">&</p>
            <p class="text-navy-700 font-medium">{{ person?.mother }}</p>
          </div>
        </div>

        <!-- Bio -->
        <div class="pt-4 border-t border-navy-100">
          <p class="text-sm text-navy-600 text-center leading-relaxed">
            {{ person?.bio }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  person: {
    type: Object,
    default: () => ({})
  },
  isGroom: {
    type: Boolean,
    default: false
  }
})

const handleImageError = (e) => {
  const name = e.target.alt || 'Person'
  e.target.src = `https://via.placeholder.com/400x600/1e293b/ffffff?text=${name.charAt(0)}`
}
</script>