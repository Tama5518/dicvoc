<template>
  <div class="container mx-auto">
    <PageHeading>カード詳細</PageHeading>
    <div class="lg:w-11/12 mx-auto flex flex-wrap">
      <div class="p-4 lg:px-8 lg:w-1/2 w-full">
        <ProfileNameIcon
          :illustration="wordsData.illustration"
          :english="wordsData.english"
          :number="userData.number"
        />
        <hr class="my-4 sm:my-8" />
        <p class="leading-relaxed whitespace-pre-line">
          {{ wordsData.meaning }}
        </p>
      </div>
      <ProfileTable class="mt-8 lg:w-1/2 w-full" :more="userData.more" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'nuxt-composition-api'
import PageHeading from '@/components/page-heading.vue'
import ProfileNameIcon from '@/components/profile-name-icon.vue'
import ProfileTable from '@/components/profile-table.vue'
import wordslistJson from '@/mock/wordslist.json'
import firebase from '@/plugins/firebase.ts'

type User = {
  id: string
  name: string
  email: string
  role: string
  iconUrl: string
  comment: string
  profile: {
    belongs: string
    nickname: string
    birthplace: string
    birthday: string
    bloodType: string
    sign: string
    hobby: string
  }
}

export default defineComponent({
  components: {
    PageHeading,
    ProfileTable,
    ProfileNameIcon,
  },
  setup(_, { root }: SetupContext) {
    const userData = reactive<User>({
      number: '',
      english: '',
      pronounciation: '',
      part: '',
      illustration: '',
      meaning: '',
      more: {
        synonims: '',
        anti: '',
        inflectedform: '',
        etymology: ''
      },
    })
    firebase
      .firestore()
      .collection('words')
      .doc(root.$route.params.id) // URLからIDを取得して、そのIDのドキュメントを取得する
      .get()
      .then((doc) => {
        if (doc.exists) {
          wordsData.id = root.$route.params.id
          wordsData.english = doc.data().english
          wordsData.email = doc.data().email
          wordsData.part = doc.data().part
          wordsData.illustration = doc.data().illustration
          wordsData.more = doc.data().more
          wordsData.meaning = doc.data().meaning
        }
      })
      .catch((err) => {
        console.log('Error getting document', err)
      })
    return {
      wordsData,
    }
  },
})
</script>
<style></style>
