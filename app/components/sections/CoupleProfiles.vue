<template>
  <div class="space-y-8 transition-all duration-1000 opacity-100 translate-y-0">
    <!-- Header -->
    <div class="text-center space-y-4">
      <div class="flex items-center justify-center gap-3">
        <Icon name="lucide:users" class="w-8 h-8 text-navy-600" />
        <h2 class="text-3xl md:text-4xl font-serif text-navy-800">Mempelai</h2>
        <Icon name="lucide:users" class="w-8 h-8 text-navy-600" />
      </div>
      <div class="w-24 h-1 bg-navy-400 mx-auto"></div>
      <p class="text-navy-600 max-w-2xl mx-auto">
        Kedua mempelai yang akan dipersatukan dalam ikatan suci pernikahan
      </p>
    </div>

    <!-- Couple Profiles -->
    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
      <!-- Bride -->
      <div class="animate-slide-in-left">
        <SectionsComponentsProfileCard
          :person="couple!.bride"
          :is-groom="false"
        />
      </div>

      <!-- Heart Connector - Desktop Only -->
      <div
        class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div
          class="bg-white flex rounded-full p-4 shadow-lg border-4 border-navy-100"
        >
          <Icon name="lucide:heart" class="w-8 h-8 text-red-500" />
        </div>
      </div>

      <!-- Heart Connector - Mobile Only -->
      <div class="md:hidden flex justify-center -my-4 z-10 relative">
        <div
          class="bg-white flex rounded-full p-3 shadow-lg border-4 border-navy-100"
        >
          <Icon name="lucide:heart" class="w-6 h-6 text-red-500" />
        </div>
      </div>

      <!-- Groom -->
      <div class="animate-slide-in-right">
        <SectionsComponentsProfileCard
          :person="couple!.groom"
          :is-groom="true"
        />
      </div>
    </div>

    <!-- Love Story Section -->
    <div
      class="max-w-3xl mx-auto wedding-card bg-gradient-to-br from-navy-800 to-navy-900 text-white"
    >
      <div class="p-8 md:p-12 text-center space-y-6">
        <div class="flex items-center justify-center gap-3 mb-6">
          <Icon name="lucide:heart" class="w-6 h-6 text-red-400" />
          <h3 class="text-2xl md:text-3xl font-serif">Kisah Cinta Kami</h3>
          <Icon name="lucide:heart" class="w-6 h-6 text-red-400" />
        </div>

        <div class="space-y-4 text-navy-100 leading-relaxed">
          <p>
            Pertemuan kami dimulai dari persahabatan yang indah. Seiring waktu,
            Allah SWT menumbuhkan rasa cinta yang tulus di hati kami.
          </p>
          <p>
            Dengan ridho kedua orang tua dan restu keluarga, kami memutuskan
            untuk melanjutkan hubungan kami ke jenjang yang lebih suci dalam
            ikatan pernikahan.
          </p>
          <p class="font-medium text-white">
            "Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu
            mengingat kebesaran Allah."
          </p>
          <p class="text-sm text-navy-300 italic">- QS. Adz-Dzaariyat: 49</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ couple?: any }>(), {
  couple: () => ({}),
})
</script>
