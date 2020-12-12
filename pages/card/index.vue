<template>
  <div class="container mx-auto">
    <PageHeading>
      あなたのプロフィール
      <nuxt-link
        class="w-20 text-center text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 mt-2 rounded focus:outline-none focus:shadow-outline"
        to="/profile/edit"
      >
        編集
      </nuxt-link>
    </PageHeading>
    <div class="lg:w-11/12 mx-auto flex flex-wrap">
      <div class="p-4 lg:px-8 lg:w-1/2 w-full">
        <ProfileNameIcon
          :icon-url="userData.iconUrl"
          :user-name="userData.name"
          :email="userData.email"
        />
        <hr class="my-4 sm:my-8">
        <p class="leading-relaxed whitespace-pre-line">
          {{ wordData.comment }}
        </p>
      </div>
      <ProfileTable class="mt-8 lg:w-1/2 w-full" :profile="wordData.profile" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'nuxt-composition-api'
import PageHeading from '@/components/page-heading.vue'
import ProfileNameIcon from '@/components/profile-name-icon.vue'
import ProfileTable from '@/components/profile-table.vue'
import firebase from '@/plugins/firebase.ts'

type User = {
  id: string
  name: string
  email: string
  role: string
  iconUrl: string
  comment: string
  profile: {
    english: string;
    meanings: string;
    example: string;
    wordclass: string;
    link: string;
    image: string;
    vacaburary: string;
  }
}

export default defineComponent({
  components: {
    PageHeading,
    ProfileTable,
    ProfileNameIcon,
  },
  setup(_, { root }: SetupContext) {
    const wordData = reactive<User>({
      id: '',
      name: '',
      email: '',
      role: '',
      iconUrl: '',
      comment: '',
      profile: {
        english: '',
        japanese1: '',
        japanese2: '',
        japanese3: '',
        example: '',
        wordclass: '',
        link: '',
        image: '',
        music: '',

      },
    })
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        wordData.id = word.uid
        Data.email = user.email
        getwordData(word)
      } else {
        // No user is signed in.
      }
    })
    const getwordData = (word: any) => {
      firebase
        .firestore()
        .collection('users')
        .doc(word.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            wordData.name = doc.data().name
            wordData.role = doc.data().role
            wordData.iconUrl = doc.data().iconUrl
            wordData.profile = doc.data().profile
            wordData.comment = doc.data().comment
          }
        })
        .catch((err) => {
          console.log('Error getting document', err)
        })
    }
    return {
      wordData,
    }
  }
})
</script>
<style></style>
