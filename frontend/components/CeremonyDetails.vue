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
        Informasi lengkap mengenai waktu dan tempat berlangsungnya acara pernikahan kami
      </p>
    </div>

    <!-- Ceremony Events -->
    <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <!-- Akad Nikah -->
      <div class="animate-slide-in-left">
        <EventCard 
          :event="ceremony?.akad" 
          title="Akad Nikah" 
          icon="lucide:calendar"
        />
      </div>

      <!-- Resepsi -->
      <div class="animate-slide-in-right">
        <EventCard 
          :event="ceremony?.reception" 
          title="Resepsi" 
          icon="lucide:clock"
        />
      </div>
    </div>

    <!-- Additional Information -->
    <div class="max-w-4xl mx-auto wedding-card bg-gradient-to-r from-navy-50 to-blue-50">
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
                <p class="text-navy-600 text-sm">Tetap jaga kesehatan dan ikuti protokol yang berlaku</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 bg-navy-400 rounded-full mt-2"></div>
              <div>
                <p class="font-medium text-navy-800">Parkir</p>
                <p class="text-navy-600 text-sm">Area parkir tersedia di lokasi acara</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 bg-navy-400 rounded-full mt-2"></div>
              <div>
                <p class="font-medium text-navy-800">Konfirmasi Kehadiran</p>
                <p class="text-navy-600 text-sm">Mohon konfirmasi kehadiran melalui form yang tersedia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Embed Preview -->
    <div class="max-w-4xl mx-auto wedding-card overflow-hidden">
      <div class="p-6">
        <h3 class="text-xl font-serif text-navy-800 text-center mb-4">
          Lokasi Acara
        </h3>
        <div class="aspect-video bg-navy-100 rounded-lg flex items-center justify-center">
          <div class="text-center space-y-2">
            <Icon name="lucide:map-pin" class="w-12 h-12 text-navy-400 mx-auto" />
            <p class="text-navy-600">Peta lokasi akan dimuat saat mengklik tombol Google Maps</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  ceremony: {
    type: Object,
    default: () => ({})
  }
})
</script>