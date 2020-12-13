<template>
  <div class="container mx-auto">
    <PageHeading>{{ vocabulary.vocabulary }}</PageHeading>
    <div class="lg:w-11/12 mx-auto flex flex-wrap">
      <div class="p-4 lg:px-8 lg:w-1/2 w-full">
        <hr class="my-4 sm:my-8" />
        <p class="leading-relaxed whitespace-pre-line">
          {{ wordsData.meaning }}
        </p>
      </div>
      <!-- <ProfileTable class="mt-8 lg:w-1/2 w-full" :more="wordsData.more" /> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'nuxt-composition-api'
import PageHeading from '@/components/page-heading.vue'
import ProfileTable from '@/components/profile-element.vue'
import wordslistJson from '@/mock/wordslist.json'
import firebase from '@/plugins/firebase.ts'
type Vocabulary = {
  wordIds: [],
  vocabulary: string
}
type Word = {
  id: string
  english: string
  meanings: string
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

    const vocabularyWordsData: [] = []

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
          firebase
          .firestore()
            .collection("words") 
            // .where("id", "array-contains", vocabulary.wordIds)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                console.log("doc",doc)
              })
              
            })
        } 
      })
      .catch((err) => {
      　console.log('Error getting document', err)
      })


    reactive<Word[]>([])
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        getWordsData(user.uid)
      } else {
      }
    })
    const getWordsData = (userId: any) => {
      firebase
        .firestore()
        .collection("vocabularies") 
        .doc(root.$route.params.id)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
          vocabularyWordsData.push({
            id: doc.id,
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
          console.log("vocabularyWordsData", vocabularyWordsData)
        })
      })    
        .catch((err) => {
          console.log('Error getting document', err)
        })
    }
    const vocabularyLink = (vocabularyId: string): void => {
      window.location.href = '/vocabulary/' + vocabularyId
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
      vocabulary
      // wordsData,
    }
  }
})
</script>
<style></style>