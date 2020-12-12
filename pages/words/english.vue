<template>
  <div class="bg-white flex flex-col font-sans jusitfy-between items-center py-12">
    <div class="flex flex-col items-center text-center ">
        <p class="flex flex-col items-center text-center font-bold">
            Vocaburary Check!!
        </p>
        <h1
        v-if='wordList.length'
        class="text-6xl text-blue-900 font-bold leading-none tracking-wide mb-2 flex flex-col items-center text-center mt-20 mb-20">
        {{ wordList[0].english }}
      </h1>
        
        <div class="flex content-center mt-20 mb-20">
         <a href="/words/meaning">
          <button class="bg-gray-500 font-bold py-4 px-4 rounded-full"><img class="h-16 w-16" src="../../assets/image/rotation.png"></button> 
        </a>
        </div>
        <div class="text-center mt-10">
          <a href="words/english">
           <button class="font-semibold text-blue-900 mb-20 px-10 rounded">前へ</button>
          </a>
          <a href="words/english">
           <button class="font-semibold text-blue-900 mb-20 px-10 rounded">次へ</button>
          </a>
        </div>
        
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'nuxt-composition-api'
import firebase from '@/plugins/firebase.ts'
type Word = {
  english: string
}
export default defineComponent({
  layout: 'empty',
  setup(_, { root: { $store } }) {
    // const wordState = reactive({
    //   wordList: []
    // })
    const wordList = reactive<Word[]>([])
    firebase.auth().onAuthStateChanged(function (user) { 　　//user.uidはここで取得できた:firebase.auth().onAuthStateChanged
      if (user) {
        getWordsData(user.uid)
      } else {
      }
    })

    const getWordsData = (userId: any) => {
      console.log(userId)
      firebase
        .firestore()
        .collection("words") 
        .where("userId", "==", userId)
        .get()
        .then(function (querySnapshot) {
          console.log("querySnapshot")
          querySnapshot.forEach(function (doc) {
          console.log(doc.data())
          wordList.push({
            english: doc.data().english
          })
          
        })
      })    
        .catch((err) => {
          console.log('Error getting document', err)
        })
    }
      
    return {
      wordList
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
