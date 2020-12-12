<template>
  <div class="bg-white flex flex-col font-sans jusitfy-between items-center py-12">
    <div class="flex flex-col items-center text-center ">
        <p class="flex flex-col items-center text-center font-bold">
            Vocaburary Check!!
        </p>
        <h1
        class="text-6xl text-blue-900 font-bold leading-none tracking-wide mb-2 flex flex-col items-center text-center mt-20 mb-20">
        {{ wordData.english }}
      </h1>
        
        <div class="flex content-center mt-20 mb-20">
         <a href="/words/0001/meaning">
          <button class="bg-gray-500 font-bold py-4 px-4 rounded-full"><img class="h-16 w-16" src="../../../assets/image/rotation.png"></button> 
        </a>
        </div>
        <div class="text-center mt-10">
          <a href="words/0000/english">
           <button class="font-semibold text-blue-900 mb-20 px-10 rounded">前へ</button>
          </a>
          <a href="words/0002english">
           <button class="font-semibold text-blue-900 mb-20 px-10 rounded">次へ</button>
          </a>
        </div>
        
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'nuxt-composition-api'
import firebase from '@/plugins/firebase.ts'
export default defineComponent({
  layout: 'empty',
  setup(_, { root: { $store } }) {
    const wordData = reactive({
      english: '',
    })
    const getWordsData = () => {
      firebase
        .firestore()
        .collection("words")
        .doc("mYfr8BGrWok9jx6yd9bs")
        .get()
        .then((doc) => {
          if (doc.exists) {
            wordData.english = doc.data().english
          }
        })
        .catch((err) => {
          console.log('Error getting document', err)
        })
    }
    getWordsData()
    return {
      wordData
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
