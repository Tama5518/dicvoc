<template>
  <div class="container mx-auto">
    <PageHeading>メンバープロフィール</PageHeading>
    <div class="lg:w-11/12 mx-auto flex flex-wrap">
      <div class="p-4 lg:px-8 lg:w-1/2 w-full">
        <ProfileNameIcon
          :icon-url="userData.iconUrl"
          :user-name="userData.name"
          :email="userData.email"
        />
        <hr class="my-4 sm:my-8" />
        <p class="leading-relaxed whitespace-pre-line">
          {{ userData.comment }}
        </p>
      </div>
      <ProfileTable class="mt-8 lg:w-1/2 w-full" :profile="userData.profile" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'nuxt-composition-api'
import PageHeading from '@/components/page-heading.vue'
import ProfileNameIcon from '@/components/profile-name-icon.vue'
import ProfileTable from '@/components/profile-table.vue'
import userlistJson from '@/mock/userlist.json'
import firebase from '@/plugins/firebase.ts'

type User = {
  id: string
  username: string
  email: string
  // role: string
  // iconUrl: string
  comment: string
  profile: {
    occupation: string
    name: string
    learningtime: string
    birthplace: string
    motivation: string
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
      id: '',
      username: '',
      email: '',
      // role: '',
      // iconUrl: '',
      comment: '',
      profile: {
        occupation: '',
        name: '',
        learningtime: '',
        birthplace: '',
        motivation: '',
        hobby: '',
      },
    })
    firebase
      .firestore()
      .collection('users')
      .doc(root.$route.params.id) // URLからIDを取得して、そのIDのドキュメントを取得する
      .get()
      .then((doc) => {
        if (doc.exists) {
          userData.id = root.$route.params.id
          userData.username = doc.data().name
          userData.email = doc.data().email
          // userData.role = doc.data().role
          // userData.iconUrl = doc.data().iconUrl
          userData.profile = doc.data().profile
          userData.comment = doc.data().comment
        }
      })
      .catch((err) => {
        console.log('Error getting document', err)
      })
    return {
      userData,
    }
  },
})
</script>
<style></style>
