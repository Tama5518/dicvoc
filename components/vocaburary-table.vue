<template>
  <div class="list-table shadow-md sm:rounded overflow-y-auto">
    <table class="w-full text-md bg-white">
      <thead>
        <tr class="border-b bg-blue-900 text-white">
          <th class="text-left p-3 px-5">Vocaburary</th>
        </tr>
      </thead>
      <tbody class="text-gray-900">
        <tr class="py-3 px-5 whitespace-no-wrap sm:whitespace-normal">
            {{ Toeic }}
        <tr class="py-3 px-5 whitespace-no-wrap sm:whitespace-normal">
            {{ Toeful }}
        </tr>
        <tr class="py-3 px-5 whitespace-no-wrap sm:whitespace-normal">
            {{英検}}
        </tr>
        <tr class="py-3 px-5　whitespace-no-wrap sm:whitespace-normal">
          　　{{論文}} 
        </tr>
         <tr class="py-3 px-5　whitespace-no-wrap sm:whitespace-normal">
          　　{{その他}} 
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'nuxt-composition-api'
import userlistJson from '@/mock/userlist.json'
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
  name: 'ListTable',
  setup(_) {
    const userList = reactive<User[]>([])
    firebase
      .firestore()
      .collection('users')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          userList.push({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            role: doc.data().role,
            iconUrl: doc.data().iconUrl,
            comment: doc.data().comment,
            profile: doc.data().profile,
          })
        })
      })    
    const userLink = (userId: string): void => {
      window.location.href = '/users/' + userId
    }
    return {
      userList,
      userLink,
    }
  },
})
</script>
<style>
tbody tr:nth-child(odd) {
  @apply bg-white;
}
input[type='text'],
select {
  outline-color: #a0aec0;
}
</style>
