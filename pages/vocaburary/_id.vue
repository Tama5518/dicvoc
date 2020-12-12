<template>
  <div class="container mx-auto">
    <PageHeading>単語帳詳細</PageHeading>
    <div class="lg:w-11/12 mx-auto flex flex-wrap">
      <div class="p-4 lg:px-8 lg:w-1/2 w-full">
        <hr class="my-4 sm:my-8" />
        <p class="leading-relaxed whitespace-pre-line">
          {{ wordsData.meaning }}
        </p>
      </div>
      <ProfileTable class="mt-8 lg:w-1/2 w-full" :more="wordsData.more" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'nuxt-composition-api'
import PageHeading from '@/components/page-heading.vue'
import ProfileTable from '@/components/profile-element.vue'
import wordslistJson from '@/mock/wordslist.json'
import firebase from '@/plugins/firebase.ts'
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
    const vocaburaryWordsData = reactive<Word[]>([])
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        getWordsData(user.uid)
      } else {
      }
    })

    const

    // const getWordsData = (userId: any) => {
    //   firebase
    //     .firestore()
    //     .collection("vocaburaries") 
    //     .where("userId", "==", userId)
    //     .get()
    //     .then(function (querySnapshot) {
    //       querySnapshot.forEach(function (doc) {
    //       vocaburaryWordsData.push({
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
      // wordsData,
    }
  },
})
</script>
<style></style>
