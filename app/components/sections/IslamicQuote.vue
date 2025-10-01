<template>
  <div class="space-y-8 transition-all duration-1000 opacity-100 translate-y-0">
    <!-- Header -->
    <div class="text-center space-y-4">
      <div class="flex items-center justify-center gap-3">
        <Icon name="lucide:book" class="w-8 h-8 text-navy-600" />
        <h2 class="text-3xl md:text-4xl font-serif text-navy-800">
          Firman Allah SWT
        </h2>
        <Icon name="lucide:book" class="w-8 h-8 text-navy-600" />
      </div>
      <div class="w-24 h-1 bg-navy-400 mx-auto"></div>
    </div>

    <!-- Quote Card -->
    <div
      class="max-w-4xl mx-auto wedding-card bg-gradient-to-br from-white via-blue-50/50 to-navy-50/30 backdrop-blur-sm shadow-xl"
    >
      <div class="p-8 md:p-12">
        <!-- Decorative Border -->
        <div class="relative">
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-navy-200/20 to-transparent"
          ></div>
          <div class="relative space-y-8">
            <!-- Arabic Text -->
            <div class="text-center space-y-6">
              <div
                class="text-2xl md:text-4xl leading-relaxed font-arabic text-navy-800 px-4"
              >
                <p
                  class="leading-loose font-arabic"
                  style="direction: rtl; text-align: right"
                >
                  {{ quote?.arabic }}
                </p>
              </div>

              <!-- Decorative Separator -->
              <div class="flex items-center justify-center space-x-4">
                <div class="w-16 h-px bg-navy-300"></div>
                <Icon name="lucide:heart" class="w-5 h-5 text-red-400" />
                <div class="w-16 h-px bg-navy-300"></div>
              </div>
            </div>

            <!-- Indonesian Translation -->
            <div class="space-y-4">
              <p
                class="text-lg md:text-xl text-navy-700 leading-relaxed text-center italic px-4"
              >
                "{{ quote?.indonesian }}"
              </p>

              <!-- Reference -->
              <div class="text-center">
                <div
                  class="inline-flex items-center gap-2 bg-navy-100 px-4 py-2 rounded-full"
                >
                  <Icon name="lucide:book" class="w-4 h-4 text-navy-600" />
                  <span class="text-navy-700 font-semibold">
                    {{ quote?.reference }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Message -->
    <div class="wedding-card bg-navy-800 text-white">
      <div class="p-6 md:p-8 text-center">
        <h3 class="text-xl md:text-2xl font-serif mb-4">
          Dengan Ridho Allah SWT
        </h3>
        <p class="text-navy-200 leading-relaxed max-w-2xl mx-auto">
          Semoga pernikahan kami menjadi ladang ibadah, saling melengkapi dalam
          kebaikan, dan mendapat berkah serta ridho dari Allah Subhanahu wa
          Ta'ala
        </p>
        <div class="flex items-center justify-center mt-6 space-x-4">
          <div class="w-12 h-px bg-navy-400"></div>
          <Icon name="lucide:heart" class="w-5 h-5 text-red-400" />
          <div class="w-12 h-px bg-navy-400"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ quote?: object }>(), {
  quote: () => ({}),
})
</script>
