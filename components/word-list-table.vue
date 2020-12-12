<template>
  <div class="list-table shadow-md sm:rounded overflow-y-auto">
    <table class="w-full text-md bg-white">
      <thead>
        <tr class="border-b bg-blue-900 text-white">
          <th class="text-left p-3 px-5">English word</th>
          <th class="text-left p-3 px-5">Meaning</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="text-gray-900">
        <tr
          v-for="(word, index) in wordList"
          :key="index"
          class="border-b bg-gray-100 hover:bg-orange-100 cursor-pointer"
          @click="wordLink()"
        >
          <td class="py-3 px-5 whitespace-no-wrap sm:whitespace-normal">
            {{ word.english }}
          </td>
          <td class="py-3 px-5 whitespace-no-wrap sm:whitespace-normal"
            >
            {{ word.meanings }}
          </td>
          <td class="py-3 px-5">
            <div class="flex justify-end items-center">
              <div
                class="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                <span
                  class="rounded-full w-5 h-5 bg-white p-0 border-px border-white inline-flex items-center justify-center text-blue-500 mr-2"
                >
                  <svg
                    fill="currentColor"
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                    />
                  </svg>
                </span>
                More
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref} from 'nuxt-composition-api'
import wordslistJson from '@/mock/wordslist.json'
import firebase from '@/plugins/firebase.ts'
type Word = {
  id: string
  english: string
  meanings: string
  }
export default defineComponent({
  name: 'ListTable',
  setup(_, { root: { $store } }) {
    const wordList = reactive<Word[]>([])
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
            id: doc.data().id,
            english: doc.data().english,
            meanings: doc.data().meanings
          })
          
        })
      })    
        .catch((err) => {
          console.log('Error getting document', err)
        })
    }
    const wordLink = (wordId: string): void =>{
      console.log(wordList)
      window.location.href = '/words/' + wordId
    }
    
    return {
      wordList,
      wordLink
    }
  }
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
