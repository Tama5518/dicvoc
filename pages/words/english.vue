<template>
  <div class="bg-white flex flex-col font-sans jusitfy-between items-center py-12">
    <div class="flex flex-col items-center text-center">
        <p class="flex flex-col items-center text-center font-bold">
            Vocabulary Check!!
        </p>
      <h1
        v-if='wordList.length && displayMode == "english"'
        class="text-6xl text-blue-900 font-bold leading-none tracking-wide mb-2 flex flex-col items-center text-center mt-20 mb-20">
        {{ wordList[wordIndex].english }}
      </h1>
      <div v-if='wordList.length && displayMode == "meaning"'>
        <h1
          class="text-3xl text-blue-900 font-bold leading-none tracking-wide mb-2 flex flex-col items-center text-center mt-10 mb-10"
          v-for="(meaning, index) in wordList[wordIndex].meanings"
            :key="index">
          {{ meaning }}
        </h1>
      </div>
        <div class="flex content-center mt-20 mb-20">
          <button 
            @click="chanegeToAnother()"
            class="bg-gray-500 font-bold py-4 px-4 rounded-full"><img class="h-16 w-16" src="../../assets/image/rotation.png"></button> 
        </div>
        <div class="text-center mt-10">
           <button 
            @click="changePreviousDisplayWord()"
            class="font-semibold text-blue-900 mb-20 px-10 rounded">前へ</button>
           <button 
            @click="changeNextDisplayWord()"
            class="font-semibold text-blue-900 mb-20 px-10 rounded">次へ</button>
        </div>
        
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'nuxt-composition-api'
import firebase from '@/plugins/firebase.ts'
type Word = {
  english: string
  meanings: string
}
export default defineComponent({
  layout: 'empty',
  setup(_, { root: { $store } }) {
    const wordList = reactive<Word[]>([])
    const wordIndex = ref(0)
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        getWordsData(user.uid)
      } else {
      }
    })

    const getWordsData = (userId: any) => {
      firebase
        .firestore()
        .collection("words") 
        .where("userId", "==", userId)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
          wordList.push({
            english: doc.data().english,
            meanings: doc.data().meanings
          })
          
        })
      })    
        .catch((err) => {
          console.log('Error getting document', err)
        })
    }
    const changePreviousDisplayWord = (): void =>{
      if (wordIndex.value > 0){
      wordIndex.value = wordIndex.value - 1
      }
    }
    const changeNextDisplayWord = (): void => {
      if (wordIndex.value != wordList.length - 1 ){
      wordIndex.value = wordIndex.value + 1}
      else(window.location.href = "/words")
    }

    const displayMode = ref("english")
    const chanegeToAnother = () : void => {
      console.log("wordList",wordList)
      if (displayMode.value == "meaning"){
        displayMode.value = "english"
      }
      else{
        displayMode.value = "meaning"
      }

    }
      
    return {
      wordList,
      wordIndex,
      changeNextDisplayWord,
      changePreviousDisplayWord,
      displayMode,
      chanegeToAnother
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
