<template>
  <div class="bg-white flex flex-col font-sans">
    <div class="container mx-auto">
      <header
        class="flex items-center justify-between relative pl-4 sm:pl-0 py-6"
      >
        <p class="leading-none">
          <a
            href="/"
            class="text-xl sm:text-2xl font-bold text-blue-900 hover:text-blue-800"
          >
            DicVoc
          </a>
        </p>
        <nav class="hidden md:flex text-lg">
          <a
            v-if="isSignedIn()"
            href="/vocabulary"
            class="text-blue-900 hover:text-blue-600 py-3 px-6 text-sm font-bold"
          >
           単語帳一覧
          </a>
          <a
            v-if="isSignedIn()"
            href="/words/english"
            class="text-blue-900 hover:text-blue-600 py-3 px-6 text-sm font-bold"
          >
           単語再生
          </a>
          <a
            v-if="isSignedIn()"
            href="/words"
            class="text-blue-900 hover:text-blue-600 py-3 px-6 text-sm font-bold"
          >
           単語一覧
          </a>
          <a
            v-if="isSignedIn()"
            href="/words/add_simple"
            class="text-blue-900 hover:text-blue-600 py-3 px-6 text-sm font-bold"
          >
            単語追加
          </a>
          <a
            v-if="isSignedIn()"
            href="/users"
            class="text-blue-900 hover:text-blue-600 py-3 px-6 text-sm font-bold"
          >
            フレンズリスト
          </a>
          <a
            v-if="isSignedIn()"
            href="/profile"
            class="text-blue-900 hover:text-blue-600 py-3 px-6 text-sm font-bold"
          >
            マイプロフィール
          </a>
          <a
            v-if="!isSignedIn()"
            href="/signup"
            class="text-blue-900 hover:text-blue-600 py-3 px-6 text-sm font-bold"
          >
            ユーザー登録
          </a>
          <a
            v-if="!isSignedIn()"
            href="/signin"
            class="text-blue-900 hover:text-blue-600 py-3 px-6 text-sm font-bold"
          >
            ログイン
          </a>
          <a
            v-if="isSignedIn()"
            href="#"
            @click="signOut"
            class="text-blue-900 hover:text-blue-600 py-3 px-6 text-sm font-bold"
          >
            ログアウト
          </a>
        </nav>
        <button
          class="flex md:hidden flex-col absolute top-0 right-0 py-6 px-4 focus:outline-none"
        >
          <span class="w-6 h-1 mb-1 bg-gray-500"></span>
          <span class="w-6 h-1 mb-1 bg-gray-500"></span>
          <span class="w-6 h-1 mb-1 bg-gray-500"></span>
        </button>
      </header>
      <main>
        <nuxt />
      </main>
      <footer class="p-4">
        <p class="text-gray-500 font-xs text-center">
          <span class="inline-block pt-2 border-t md:pt-8 md:border-none">
            Tamaki&amp;Takaki&amp;Ryo
          </span>
        </p>
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
