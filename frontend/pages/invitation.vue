<template>
  <div 
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-navy-100 transition-all duration-1000"
    :class="{
      'opacity-100': isVisible,
      'opacity-0': !isVisible
    }"
  >
    <!-- Floating Header -->
    <header class="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm border-b border-navy-100 z-40">
      <div class="container mx-auto px-4 py-3">
        <div class="text-center">
          <h1 class="text-xl font-serif text-navy-800">
            {{ weddingDataComputed?.couple.bride.name }} & {{ weddingDataComputed?.couple.groom.name }}
          </h1>
          <p class="text-xs text-navy-500">{{ weddingDataComputed?.ceremony.akad.date }}</p>
        </div>
      </div>
      <!-- Scroll Progress Bar -->
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-navy-100">
        <div 
          class="h-full bg-gradient-to-r from-navy-600 to-navy-500 transition-all duration-300 ease-out"
          :style="{ width: `${scrollProgress}%` }"
        />
      </div>
    </header>

    <!-- Main Scrolling Content -->
    <main class="pt-20">
      
      <!-- Hero Section -->
      <ScrollSection 
        id="home" 
        class="min-h-screen flex items-center justify-center px-4 py-20"
        :visible-sections="visibleSections"
      >
        <div class="max-w-5xl mx-auto">
          <HomeSection />
        </div>
      </ScrollSection>

      <!-- Section Divider -->
      <div class="h-20 bg-gradient-to-b from-transparent via-navy-100/30 to-transparent"></div>

      <!-- Islamic Quote Section -->
      <ScrollSection 
        id="quote" 
        class="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-navy-50/30 to-blue-50/30"
        :visible-sections="visibleSections"
      >
        <div class="max-w-5xl mx-auto w-full">
          <IslamicQuote :quote="weddingDataComputed?.islamicQuote" />
        </div>
      </ScrollSection>

      <!-- Section Divider -->
      <div class="h-20 bg-gradient-to-b from-transparent via-slate-100/50 to-transparent"></div>

      <!-- Photo Gallery Section -->
      <ScrollSection 
        id="gallery" 
        class="min-h-screen flex items-center justify-center px-4 py-20"
        :visible-sections="visibleSections"
      >
        <div class="max-w-7xl mx-auto w-full">
          <PhotoCarousel :photos="weddingDataComputed?.gallery" />
        </div>
      </ScrollSection>

      <!-- Section Divider -->
      <div class="h-20 bg-gradient-to-b from-transparent via-navy-50/40 to-transparent"></div>

      <!-- Couple Profiles Section -->
      <ScrollSection 
        id="couple" 
        class="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-slate-50/50 to-navy-50/40"
        :visible-sections="visibleSections"
      >
        <div class="max-w-7xl mx-auto w-full">
          <CoupleProfiles :couple="weddingDataComputed?.couple" />
        </div>
      </ScrollSection>

      <!-- Section Divider -->
      <div class="h-20 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent"></div>

      <!-- Ceremony Details Section -->
      <ScrollSection 
        id="ceremony" 
        class="min-h-screen flex items-center justify-center px-4 py-20"
        :visible-sections="visibleSections"
      >
        <div class="max-w-7xl mx-auto w-full">
          <CeremonyDetails :ceremony="weddingDataComputed?.ceremony" />
        </div>
      </ScrollSection>

      <!-- Section Divider -->
      <div class="h-20 bg-gradient-to-b from-transparent via-navy-100/30 to-transparent"></div>

      <!-- RSVP Section -->
      <ScrollSection 
        id="rsvp" 
        class="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-navy-50/30 to-slate-50/50"
        :visible-sections="visibleSections"
      >
        <div class="max-w-7xl mx-auto w-full">
          <GuestForm />
        </div>
      </ScrollSection>

    </main>

    <!-- Footer -->
    <footer class="bg-navy-800 text-white py-12">
      <div class="container mx-auto px-4 text-center">
        <div class="flex items-center justify-center mb-6">
          <Icon name="lucide:heart" class="w-6 h-6 text-red-400 mx-3" />
          <p class="text-navy-200 text-lg">Terima kasih atas doa dan restu Anda</p>
          <Icon name="lucide:heart" class="w-6 h-6 text-red-400 mx-3" />
        </div>
        <div class="max-w-2xl mx-auto text-navy-300 leading-relaxed mb-6">
          <p>
            Kehadiran dan doa restu dari keluarga dan sahabat merupakan anugerah terindah 
            bagi kami. Semoga Allah SWT senantiasa memberkahi langkah kami.
          </p>
        </div>
        <div class="border-t border-navy-600 pt-6 mt-6">
          <p class="text-navy-400 text-sm">
            © 2024 Wedding Invitation | Made with Love
          </p>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button
      v-if="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 bg-navy-600 hover:bg-navy-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
    >
      <Icon name="lucide:arrow-up" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import { weddingData, useMockAPI } from '~/composables/useMockData'

const isVisible = ref(false)
const showScrollTop = ref(false)
const visibleSections = ref(new Set())
const scrollProgress = ref(0)
const mockAPI = useMockAPI()

// Load wedding data
const weddingDataRef = ref(null)

onMounted(async () => {
  isVisible.value = true
  
  try {
    const data = await mockAPI.getWeddingData()
    weddingDataRef.value = data
  } catch (error) {
    console.error('Error loading wedding data:', error)
  }
  
  // Set up scroll listener
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial state
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Use weddingData from composable
const weddingDataComputed = computed(() => weddingDataRef.value || weddingData)

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercentage = (scrollTop / documentHeight) * 100
  
  showScrollTop.value = scrollTop > 500
  scrollProgress.value = Math.min(scrollPercentage, 100)
  
  // Check which sections are visible
  const newVisibleSections = new Set()
  const sections = ['home', 'quote', 'gallery', 'couple', 'ceremony', 'rsvp']
  
  sections.forEach(sectionId => {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
        newVisibleSections.add(sectionId)
      }
    }
  })
  
  visibleSections.value = newVisibleSections
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// SEO
useHead({
  title: `Wedding Invitation - ${weddingData?.couple.bride.name} & ${weddingData?.couple.groom.name}`,
  meta: [
    { name: 'description', content: 'Join us in celebrating our special wedding day' }
  ]
})
</script>