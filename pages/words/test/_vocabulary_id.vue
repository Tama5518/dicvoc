<template>
  <div class="container mx-auto">
    <PageHeading>{{ vocabulary.vocabulary }}
      <p class="flex flex-col items-center text-center font-bold">
            Vocabulary Check!!
        </p>
    </PageHeading>
    <h1
        v-if='wordList.length && displayMode == "english"'
        class="text-6xl text-blue-900 font-bold leading-none tracking-wide mb-2 flex flex-col items-center text-center mt-20 mb-20">
        {{ wordList[wordIndex].english }}
      </h1>
      <div v-if='wordList.length && displayMode == "meaning"'>
        <h1
          class="text-6xl text-blue-900 font-bold leading-none tracking-wide mb-2 flex flex-col items-center text-center mt-20 mb-20"
          v-for="(meaning, index) in wordList[wordIndex].meanings"
            :key="index">
          {{ meaning }}
        </h1>
      </div>
        <div class="flex content-center mt-20 mb-20">
          <button 
            @click="chanegeToAnother()"
            class="bg-gray-500 font-bold py-4 px-4 rounded-full flex justify-center"><img class="h-16 w-16" src="../../../assets/image/rotation.png"></button> 
        </div>
        <div class="text-center mt-10">
           <button 
            @click="changePreviousDisplayWord()"
            class="font-semibold text-blue-900 mb-20 px-10 rounded">前へ</button>
             <button 
            @click="stopDisplayWord()"
            class="font-semibold text-blue-900 mb-20 px-10 rounded">
            <a href= "/words/">やめる</a>
            </button>
           <button 
            @click="changeNextDisplayWord()"
            class="font-semibold text-blue-900 mb-20 px-10 rounded">次へ
            </button>
        </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'nuxt-composition-api'
import PageHeading from '@/components/page-heading.vue'
import ProfileTable from '@/components/profile-element.vue'
import firebase from '@/plugins/firebase.ts'
type Vocabulary = {
  wordIds: [],
  vocabulary: string
}
type Word = {
  id: string,
  userid: string
  english: string
  meanings: []
  more: {
    wordclass: string
    example: string
    image: string
    music: string
    link: string
  }
}

export default defineComponent({
  components: {
    PageHeading,
    ProfileTable
  },
  setup(_, { root }: SetupContext) {
    const wordIndex = ref(0)
    const vocabulary = reactive<Vocabulary>(
      {
        wordIds: [],
        vocabulary: ""
      }
    )

    const wordList = reactive<Word[]>([])
    console.log(root.$route.params.vocabulary_id)
    firebase
      .firestore()
      .collection("vocabularies") 
      .doc(root.$route.params.vocabulary_id)
      .get()
      .then((doc) => {
        if (doc.exists){
          console.log("a")
          vocabulary.wordIds = doc.data().wordIds
          vocabulary.vocabulary = doc.data().vocabulary
          console.log("doc0",doc)
          firebase
          .firestore()
          .collection("words") 
          .where(firebase.firestore.FieldPath.documentId(), 'in', vocabulary.wordIds)
          .get()
          .then(function (querySnapshot) {
           querySnapshot.forEach(function (doc) {
             wordList.push({
               id:doc.id,
               userid: doc.data().userid,
               english: doc.data().english,
               meanings: doc.data().meanings,
               more: {
                wordclass: doc.data().wordclass,
                example: doc.data().example,
                image: doc.data().image,
                music: doc.data().music,
                link: doc.data().link
               }
             })
            console.log("doc1",wordList)
              
              })
              
            })
        } 
      })
      .catch((err) => {
      　console.log('Error getting document', err)
      })
    const changePreviousDisplayWord = (): void =>{
      if (wordIndex.value > 0){
      wordIndex.value = wordIndex.value - 1
      }
    }
    const changeNextDisplayWord = (): void => {
      if (wordIndex.value != wordList.length - 1 ){
      wordIndex.value = wordIndex.value + 1
      displayMode.value="english"}
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
      vocabulary,
      wordIndex,
      wordList,
      changePreviousDisplayWord,
      changeNextDisplayWord,
      chanegeToAnother,
      displayMode
    }
  }
})
</script>
<style></style>