<template>
  <div class="bg-white flex flex-col font-sans sm:flex-row jusitfy-between items-center py-12">
    <div class="container mx-auto">
        <p class="sm:w-2/5 flex flex-col items-center sm:items-start text-center sm:text-left font-bold">
            Vocaburary Check!!
        </p>
        <h1
        class="uppercase text-6xl text-blue-900 font-bold leading-none tracking-wide mb-2 sm:w-2/5 flex flex-col items-center sm:items-start text-center"
      >
        English
      </h1>
        <nav class="md:flex text-lg">
          <a
            class="text-blue-900 hover:text-blue-600 py-3 px-6 text-sm font-bold text-align: left;"
          >
            前へ
          </a>
          <a
            class="text-blue-900 hover:text-blue-600 py-3 px-6 text-sm font-bold text-align: right;"
          >
            次へ
          </a>
        </nav>
        <button class="bg-gray-500 font-bold py-10 px-20 rounded-l sm:w-2/5 flex flex-col items-center"></button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'nuxt-composition-api'
import firebase from '@/plugins/firebase.ts'
export default defineComponent({
  layout: 'empty',
  setup(_, { root: { $store } }) {
    const isSignedIn = (): boolean => {
      return $store.state.signedIn
    }    
    const signOut = (): void => {
      firebase.auth().signOut()
    }
    return {
      isSignedIn,
      signOut
    }
  }
})
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
body {
  @apply text-gray-700;
}
</style>
