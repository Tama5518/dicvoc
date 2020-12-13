<template>
  <div class="container mx-auto">
    <PageHeading>{{ vocabulary.vocabulary }}</PageHeading>
    <div class="lg:w-11/12 mx-auto flex flex-wrap">
        <table class="w-full text-md bg-white mx-3">
      <thead>
        <tr class="border-b bg-blue-900 text-white">
          <th class="text-left p-3 px-5">English</th>
          <th class="text-left p-3 px-5">Meaning</th>
        </tr>
      </thead>
      <tbody class="text-black-900">
        <tr
          v-for="(word, index) in wordList"
          :key="index"
          class="border-b bg-gray-100 hover:bg-orange-100 cursor-pointer"
          @click="wordLink(word.id)"
        >
          <td class="py-3 px-5 whitespace-no-wrap sm:whitespace-normal">
            {{ word.english }}
          </td>
          <td class="py-3 px-5 whitespace-no-wrap sm:whitespace-normal"
            >
            {{ word.meanings.join() }}
          </td>
        </tr>
      </tbody>
    </table>
      <!-- <ProfileTable class="mt-8 lg:w-1/2 w-full" :more="wordsData.more" /> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'nuxt-composition-api'
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
    const vocabulary = reactive<Vocabulary>(
      {
        wordIds: [],
        vocabulary: ""
      }
    )

    const wordList = reactive<Word[]>([])

    firebase
      .firestore()
      .collection("vocabularies") 
      .doc(root.$route.params.id)
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

    const wordLink = (wordId: string): void => {
      window.location.href = '/words/' + wordId
    }



    

    // const getWordsData = (userId: any) => {
    //   firebase
    //     .firestore()
    //     .collection("vocabularies") 
    //     .where("userId", "==", userId)
    //     .get()
    //     .then(function (querySnapshot) {
    //       querySnapshot.forEach(function (doc) {
    //       vocabularyWordsData.push({
    //         id: doc.id,
    //         english: doc.data().english,
    //         meanings: doc.data().meanings
    //       })
          
    //     })
    //   })    
    //     .catch((err) => {
    //       console.log('Error getting document', err)
    //     })
    // }
    // })
    //   })
    return {
      vocabulary,
      wordList,
      wordLink
      
      // wordsData,
    }
  }
})
</script>
<style></style>