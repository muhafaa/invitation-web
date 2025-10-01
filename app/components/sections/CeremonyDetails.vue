<template>
  <div class="space-y-8 transition-all duration-1000 opacity-100 translate-y-0">
    <!-- Header -->
    <div class="text-center space-y-4">
      <div class="flex items-center justify-center gap-3">
        <Icon name="lucide:calendar" class="w-8 h-8 text-navy-600" />
        <h2 class="text-3xl md:text-4xl font-serif text-navy-800">
          Detail Acara
        </h2>
        <Icon name="lucide:calendar" class="w-8 h-8 text-navy-600" />
      </div>
      <div class="w-24 h-1 bg-navy-400 mx-auto"></div>
      <p class="text-navy-600 max-w-2xl mx-auto">
        Informasi lengkap mengenai waktu dan tempat berlangsungnya acara
        pernikahan kami
      </p>
    </div>

    <!-- Ceremony Events -->
    <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <!-- Akad Nikah -->
      <div class="animate-slide-in-left">
        <SectionsComponentsEventCard
          :event="ceremony?.akad"
          title="Akad Nikah"
          icon="lucide:calendar"
        />
      </div>

      <!-- Resepsi -->
      <div class="animate-slide-in-right">
        <SectionsComponentsEventCard
          :event="ceremony?.reception"
          title="Resepsi"
          icon="lucide:clock"
        />
      </div>
    </div>

    <!-- Additional Information -->
    <div
      class="max-w-4xl mx-auto wedding-card bg-gradient-to-r from-navy-50 to-blue-50"
    >
      <div class="p-6 md:p-8">
        <h3 class="text-xl font-serif text-navy-800 text-center mb-6">
          Informasi Penting
        </h3>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 bg-navy-400 rounded-full mt-2"></div>
              <div>
                <p class="font-medium text-navy-800">Dress Code</p>
                <p class="text-navy-600 text-sm">Formal / Semi Formal</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-2 h-2 bg-navy-400 rounded-full mt-2"></div>
              <div>
                <p class="font-medium text-navy-800">Protokol Kesehatan</p>
                <p class="text-navy-600 text-sm">
                  Tetap jaga kesehatan dan ikuti protokol yang berlaku
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 bg-navy-400 rounded-full mt-2"></div>
              <div>
                <p class="font-medium text-navy-800">Parkir</p>
                <p class="text-navy-600 text-sm">
                  Area parkir tersedia di lokasi acara
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-2 h-2 bg-navy-400 rounded-full mt-2"></div>
              <div>
                <p class="font-medium text-navy-800">Konfirmasi Kehadiran</p>
                <p class="text-navy-600 text-sm">
                  Mohon konfirmasi kehadiran melalui form yang tersedia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Embed Preview -->
    <div
      class="max-w-4xl mx-auto wedding-card hover:transform-none overflow-hidden"
    >
      <div class="p-6">
        <h3 class="text-xl font-serif text-navy-800 text-center mb-4">
          Lokasi Acara
        </h3>
        <div
          class="aspect-video bg-navy-100 rounded-lg flex items-center justify-center"
        >
          <div class="text-center space-y-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1993.533669190947!2d104.76147942303038!3d-2.9637977491825387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b767adedf6333%3A0x89c24c2270f8ef07!2sGedung%20Serbaguna%20Suka%20Ria!5e0!3m2!1sen!2sid!4v1759337451013!5m2!1sen!2sid"
              class="map-frame"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../../utils/large-small-dynamic-viewport-units-polyfill'

withDefaults(defineProps<{ ceremony?: any }>(), {
  ceremony: () => ({}),
})
</script>

<style scoped>
.map-frame {
  height: 60%;
  height: 60vh;
  height: calc(var(--1dvh, 1vh) * 60);
  height: 60dvh;

  width: 80%;
  width: 80vw;
  width: calc(var(--1dvw, 1vw) * 80);
  width: 80dvw;
}
</style>
