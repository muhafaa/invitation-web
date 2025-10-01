<template>
  <div class="space-y-8 transition-all duration-1000 opacity-100 translate-y-0">
    <!-- Header -->
    <div class="text-center space-y-4">
      <div class="flex items-center justify-center gap-3">
        <Icon name="lucide:users" class="w-8 h-8 text-navy-600" />
        <h2 class="text-3xl md:text-4xl font-serif text-navy-800">
          Konfirmasi Kehadiran
        </h2>
        <Icon name="lucide:users" class="w-8 h-8 text-navy-600" />
      </div>
      <div class="w-24 h-1 bg-navy-400 mx-auto"></div>
      <p class="text-navy-600 max-w-2xl mx-auto">
        Kehadiran dan doa restu Anda merupakan kebahagian bagi kami
      </p>
    </div>

    <div class="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <!-- RSVP Form -->
      <div class="lg:col-span-2">
        <div class="wedding-card bg-white/80 backdrop-blur-sm">
          <div class="p-6 md:p-8">
            <h3 class="text-2xl font-serif text-navy-800 mb-6 text-center">
              Form Konfirmasi
            </h3>
            
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name -->
              <div class="space-y-2">
                <label for="name" class="block text-navy-700 font-medium">
                  Nama Lengkap *
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  class="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <!-- Attendance -->
              <div class="space-y-2">
                <label class="block text-navy-700 font-medium">
                  Status Kehadiran *
                </label>
                <div class="space-y-3">
                  <label class="flex items-center gap-3 p-3 border border-navy-200 rounded-lg cursor-pointer hover:bg-navy-50 transition-colors duration-300">
                    <input
                      v-model="formData.attendance"
                      type="radio"
                      value="hadir"
                      class="text-navy-600 focus:ring-navy-500"
                    />
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:check-circle" class="w-5 h-5 text-green-600" />
                      <span class="text-navy-700">Hadir</span>
                    </div>
                  </label>
                  <label class="flex items-center gap-3 p-3 border border-navy-200 rounded-lg cursor-pointer hover:bg-navy-50 transition-colors duration-300">
                    <input
                      v-model="formData.attendance"
                      type="radio"
                      value="tidak-hadir"
                      class="text-navy-600 focus:ring-navy-500"
                    />
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:x-circle" class="w-5 h-5 text-red-600" />
                      <span class="text-navy-700">Tidak Hadir</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Guest Count - only show if attending -->
              <Transition name="slide-down">
                <div v-if="formData.attendance === 'hadir'" class="space-y-2">
                  <label for="guestCount" class="block text-navy-700 font-medium">
                    Jumlah Tamu *
                  </label>
                  <select
                    id="guestCount"
                    v-model="formData.guestCount"
                    class="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="">Pilih jumlah tamu</option>
                    <option v-for="num in 5" :key="num" :value="num.toString()">
                      {{ num }} {{ num === 1 ? 'Orang' : 'Orang' }}
                    </option>
                  </select>
                </div>
              </Transition>

              <!-- Message -->
              <div class="space-y-2">
                <label for="message" class="block text-navy-700 font-medium">
                  Ucapan & Doa (Opsional)
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  placeholder="Sampaikan ucapan dan doa terbaik untuk kami..."
                  class="w-full px-4 py-3 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-300 min-h-[100px]"
                  rows="4"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-navy-600 hover:bg-navy-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon v-if="isSubmitting" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
                <span>{{ isSubmitting ? 'Mengirim...' : 'Konfirmasi Kehadiran' }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Guest Stats & List -->
      <div class="space-y-6">
        <!-- Statistics -->
        <div class="wedding-card bg-gradient-to-br from-navy-800 to-navy-900 text-white">
          <div class="p-6 text-center space-y-4">
            <Icon name="lucide:users" class="w-12 h-12 text-navy-300 mx-auto" />
            <div>
              <h3 class="text-2xl font-bold">{{ totalAttendees }}</h3>
              <p class="text-navy-300">Total Tamu Hadir</p>
            </div>
            <div class="pt-4 border-t border-navy-700">
              <h4 class="text-lg font-semibold">{{ attendingGuests.length }}</h4>
              <p class="text-navy-300 text-sm">Konfirmasi Hadir</p>
            </div>
          </div>
        </div>

        <!-- Recent Confirmations -->
        <div class="wedding-card bg-white/80 backdrop-blur-sm">
          <div class="p-6">
            <h3 class="text-lg font-serif text-navy-800 mb-4 flex items-center gap-2">
              <Icon name="lucide:message-circle" class="w-5 h-5" />
              Konfirmasi Terbaru
            </h3>
            
            <div class="space-y-3 max-h-64 overflow-y-auto">
              <div v-if="guests.length === 0" class="text-navy-500 text-sm text-center py-4">
                Belum ada konfirmasi
              </div>
              <div
                v-for="guest in guests.slice(0, 10)"
                :key="guest.id"
                class="flex items-center justify-between py-2 border-b border-navy-100 last:border-b-0"
              >
                <div>
                  <p class="font-medium text-navy-800 text-sm">{{ guest.name }}</p>
                  <div class="flex items-center gap-2 text-xs">
                    <Icon
                      v-if="guest.attendance === 'hadir'"
                      name="lucide:check-circle"
                      class="w-3 h-3 text-green-600"
                    />
                    <Icon
                      v-else
                      name="lucide:x-circle"
                      class="w-3 h-3 text-red-600"
                    />
                    <span :class="guest.attendance === 'hadir' ? 'text-green-600' : 'text-red-600'">
                      {{ guest.attendance === 'hadir' ? `Hadir (${guest.guestCount} orang)` : 'Tidak Hadir' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMockAPI, mockGuests } from '~/composables/useMockData'

const mockAPI = useMockAPI()
const isSubmitting = ref(false)
const guests = ref([])
const formData = ref({
  name: '',
  attendance: '',
  guestCount: '',
  message: ''
})

const attendingGuests = computed(() => 
  guests.value.filter(guest => guest.attendance === 'hadir')
)

const totalAttendees = computed(() => 
  attendingGuests.value.reduce((sum, guest) => sum + guest.guestCount, 0)
)

const loadGuests = async () => {
  try {
    const guestList = await mockAPI.getGuests()
    guests.value = guestList
  } catch (error) {
    console.error('Error loading guests:', error)
  }
}

const showToast = (title, description, variant = 'default') => {
  // Simple console log for now - in a real app you'd use a toast library
  console.log(`Toast: ${title} - ${description}`)
  
  // You could also use browser notifications
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body: description })
    }
  }
}

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.attendance) {
    showToast('Error', 'Mohon lengkapi nama dan status kehadiran', 'error')
    return
  }

  if (formData.value.attendance === 'hadir' && (!formData.value.guestCount || formData.value.guestCount < 1)) {
    showToast('Error', 'Mohon tentukan jumlah tamu yang akan hadir', 'error')
    return
  }

  isSubmitting.value = true
  
  try {
    const guestData = {
      ...formData.value,
      guestCount: formData.value.attendance === 'hadir' ? parseInt(formData.value.guestCount) : 0
    }
    
    await mockAPI.submitGuest(guestData)
    
    showToast('Berhasil!', 'Terima kasih atas konfirmasi kehadiran Anda')
    
    // Reset form
    formData.value = {
      name: '',
      attendance: '',
      guestCount: '',
      message: ''
    }
    
    // Reload guests list
    await loadGuests()
    
  } catch (error) {
    showToast('Error', 'Terjadi kesalahan. Silakan coba lagi', 'error')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  loadGuests()
})
</script>

<style scoped>
.slide-down-enter-active {
  transition: all 0.4s ease-out;
}

.slide-down-leave-active {
  transition: all 0.4s ease-in;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
  max-height: 0;
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  max-height: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 200px;
}
</style>