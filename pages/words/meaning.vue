<template>
  <div
    class="flex flex-col-reverse jusitfy-between items-center py-12"
  >
    <div
      class="flex flex-col items-center text-center"
    >
    <p class="flex flex-col items-center text-center font-bold">
            Vocaburary Check!!
        </p>
      <div  v-for="(meanings, index) in wordData"
            :key="index">
        <h1
          class="text-5xl text-blue-900 font-bold leading-none tracking-wide mt-20 mb-20"
        >
          {{ wordData.meanings }}
        </h1>
      </div>
      <div class="flex content-center mt-20 mb-20">
          <a href = "/words/0001/english">
           <button class="bg-gray-500 font-bold py-4 px-4 rounded-full"><img class="h-16 w-16" src="../../assets/image/rotation.png"></button>
          </a>
        </div>
      <div class="text-center mt-10">
          <a href = "/words/0000/meaning">
           <button class="font-semibold text-blue-900 mb-20 px-10 rounded">前へ</button>
          </a>
        
           <button class="font-semibold text-blue-900 mb-20 px-10 rounded">次へ</button>
         
        </div>
    </div>
    
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref} from 'nuxt-composition-api'
import firebase from '@/plugins/firebase.ts'
type Word = {
  meaning: string
}
export default defineComponent({
  layout: 'empty',
  setup(_, { root: { $store } }) {
    const wordIndex = ref(0)
    const wordList = reactive<Word[]>([])
    firebase.auth().onAuthStateChanged(function (user) { 
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
    const changePreviousDisplayWord = (): void =>{
      wordIndex.value = wordIndex.value - 1
      console.log("changePreviousDisplayWord")
    }
    const changeNextDisplayWord = (): void => {
      wordIndex.value = wordIndex.value + 1
      console.log("changeNextDisplayWord")
    }
    getWordsData()
    return {
      wordList,
      wordIndex,
      changeNextDisplayWord,
      changePreviousDisplayWord
    }
  }
})
</script>
