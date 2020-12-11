<template>
  <div
    class="flex flex-col-reverse sm:flex-row jusitfy-between items-center py-12"
  >
    <div
      class="sm:w-2/5 flex flex-col items-center sm:items-start text-center sm:text-left"
    >
    <p class="sm:w-2/5 flex flex-col items-center sm:items-start text-center sm:text-left font-bold">
            Vocaburary Check!!
        </p>
      <h1
        class="text-5xl text-blue-900 font-bold leading-none tracking-wide mt-20 mb-20"
      >
        表彰する
      </h1>
      <div class="flex content-center mt-20 mb-20">
          <button class="bg-gray-500 font-bold py-4 px-4 rounded-full"><img class="h-16 w-16" src="../../assets/image/rotation.png"></button>
        </div>
      <div class="text-center mt-10">
          <button class="font-semibold text-blue-900 mb-20 px-10 rounded">前へ</button>
          <button class="font-semibold text-blue-900 mb-20 px-10 rounded">次へ</button>
        </div>
    </div>
    
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'
import SvgImage from '@/components/svg-image.vue'
export default defineComponent({
  layout: 'empty',
  components: {
    SvgImage,
  },
})
</script>
