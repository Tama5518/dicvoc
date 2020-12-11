<template>
  <div class="bg-white flex flex-col font-sans">
    <div class="container mx-auto">
      <header
        class="flex items-center justify-between relative pl-4 sm:pl-0 py-6"
      >
      </header>
      <main>
        <nuxt />
      </main>
      <footer class="p-4">
      </footer>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'nuxt-composition-api'
import firebase from '@/plugins/firebase.ts'
export default defineComponent({
  middleware: ['Auth'],
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
