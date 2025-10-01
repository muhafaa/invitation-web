<template>
  <div
    class="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-navy-100"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute top-10 left-10 w-20 h-20 border border-navy-300 rounded-full"
      ></div>
      <div
        class="absolute top-32 right-20 w-16 h-16 border border-navy-200 rounded-full"
      ></div>
      <div
        class="absolute bottom-20 left-1/4 w-12 h-12 border border-navy-300 rounded-full"
      ></div>
      <div
        class="absolute bottom-40 right-10 w-24 h-24 border border-navy-200 rounded-full"
      ></div>
    </div>

    <!-- Envelope Container -->
    <div
      class="relative min-h-screen flex flex-col items-center justify-center p-4"
    >
      <div
        class="relative transition-all duration-1000 transform"
        :class="{
          'scale-110 rotate-2 opacity-0': isOpening,
          'scale-100 rotate-0 opacity-100': !isOpening,
        }"
      >
        <!-- Envelope Back -->
        <div
          class="relative w-80 h-96 md:w-96 md:h-[28rem] bg-gradient-to-br from-navy-700 to-navy-900 rounded-lg shadow-2xl"
        >
          <!-- Envelope Flap -->
          <div
            class="absolute -top-16 left-0 w-full h-32 bg-gradient-to-br from-navy-600 to-navy-800 transform-gpu transition-transform duration-1000 origin-bottom"
            :class="{
              '-rotate-12 scale-105': isOpening,
              'rotate-0 scale-100': !isOpening,
            }"
            style="clip-path: polygon(0 100%, 50% 0, 100% 100%)"
          >
            <!-- Envelope Seal -->
            <div
              class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gold-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <Icon name="lucide:heart" class="w-6 h-6 text-navy-800" />
            </div>
          </div>

          <!-- Invitation Card -->
          <div
            class="absolute inset-4 bg-gradient-to-br from-white via-blue-50 to-navy-50 rounded-lg shadow-xl transform transition-all duration-1000"
            :class="{
              'translate-y-8 scale-105 rotate-1': isOpening,
              'translate-y-0 scale-100 rotate-0': !isOpening,
            }"
          >
            <div
              class="p-6 md:p-8 h-full flex flex-col justify-center items-center text-center relative"
            >
              <!-- Decorative Border -->
              <div
                class="absolute inset-2 border-2 border-navy-200 rounded-lg opacity-50"
              ></div>
              <div
                class="absolute inset-4 border border-navy-100 rounded-lg opacity-30"
              ></div>

              <!-- Content -->
              <div class="z-10 space-y-6">
                <div
                  class="flex justify-center items-center absolute -top-4 rounded-full left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-slate-50 via-blue-50 to-navy-100"
                >
                  <Icon
                    name="lucide:mail"
                    class="w-8 h-8 text-navy-600 mx-auto opacity-80"
                  />
                </div>

                <div class="space-y-2">
                  <p
                    class="text-sm text-navy-500 font-medium tracking-wider uppercase"
                  >
                    Undangan Pernikahan
                  </p>
                  <div class="w-16 h-px bg-navy-300 mx-auto"></div>
                </div>

                <div class="space-y-4">
                  <div
                    class="text-2xl md:text-3xl font-serif text-navy-800 leading-tight"
                  >
                    {{ weddingDataComputed?.couple.bride.name }}
                    <span class="block text-lg text-navy-600 font-light my-2"
                      >&</span
                    >
                    {{ weddingDataComputed?.couple.groom.name }}
                  </div>

                  <div class="space-y-2 text-navy-600">
                    <p class="text-sm font-medium">Kepada Yth.</p>
                    <p class="text-lg font-semibold text-navy-800">
                      {{ guestName }}
                    </p>
                  </div>
                </div>

                <div class="pt-4">
                  <button
                    :disabled="isOpening"
                    class="bg-navy-600 hover:bg-navy-700 text-white px-8 py-3 rounded-full font-medium tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
                    @click="openInvitation"
                  >
                    {{ isOpening ? 'Membuka...' : 'Buka Undangan' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="text-xs text-center text-navy-400 mt-4">
        Mohon maaf apabila ada kesalahan nama dan gelar
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { weddingData as staticWeddingData } from '../composables/useMockData'

// Get guest name from query params
const route = useRoute()
const router = useRouter()
const guestName = ref(route.query.kpd || 'Tamu Undangan')
const isOpening = ref(false)

// Use static wedding data
const weddingDataComputed = computed(() => staticWeddingData)

// SEO
useHead({
  title: `Wedding Invitation - ${weddingDataComputed.value?.couple.bride.name} & ${weddingDataComputed.value?.couple.groom.name}`,
  meta: [
    {
      name: 'description',
      content: 'You are cordially invited to the wedding celebration',
    },
    { property: 'og:title', content: 'Wedding Invitation' },
    {
      property: 'og:description',
      content: 'Join us in celebrating our special day',
    },
  ],
})

function openInvitation() {
  isOpening.value = true
  setTimeout(() => {
    router.push('/invitation')
  }, 1000)
}
</script>
