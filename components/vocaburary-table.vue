<template>
  <div>
    <div class="list-table shadow-md sm:rounded overflow-y-auto">
      <table class="w-full text-md bg-white">
        <thead>
          <tr class="border-b bg-blue-900 text-white">
            <th class="text-left p-3 px-5">Vocaburary</th>
          </tr>
        </thead>
        <tbody class="text-gray-900">
          <tr
            v-for="(vocaburary, index) in vocaburaryList"
            :key="index"
            class="border-b bg-gray-100 hover:bg-orange-100 cursor-pointer"
            @click="vocaburaryLink(vocaburary.id)">
            <td class="py-3 px-5 whitespace-no-wrap sm:whitespace-normal">
                {{ vocaburary.nameofvocaburary }}
            </td>
            <td class="py-3 px-5">
              <div class="flex justify-end items-center">
                <a
                  :href="'/vocaburary/' + vocaburary.id"
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
                  card
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="lg:w-11/12 mx-auto">
        <h3 class="text-sm font-bold title-font text-black-500 tracking-widest">
          New Vocabulary
        </h3>
        <div class="mb-2">
          <h2
            class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
          >
            <input
              v-model="newVocabularyName"
              class="border w-full px-1"
            />
          </h2>
          <button
            class="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center"
            @click='addVocabulary()'
          >
            Add
          </button>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'nuxt-composition-api'
import vocaburarylistJson from '@/mock/vocaburarylist.json'
import firebase from '@/plugins/firebase.ts'
type Vocaburary = {
  id: string
  nameofvocaburary: string
}
export default defineComponent({
  name: 'ListTable',
  setup(_) {
    const vocaburaryList = reactive(vocaburarylistJson.vocaburarylistData)
    const vocaburaryLink = (vocaburaryId: string): void => {
      window.location.href = '/vocaburary/' + vocaburaryId
    }
    const newVocabularyName = ref('')
    // const wordData = reactive<Word>({
    //     english: "",
    //     meanings: [],
    //     example: "",
    //     wordclass: "",
    //     link: "",
    //     image: "",
    //     music: "",
    // });
    let userId = ""
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        userId = user.uid;
      } else {
        // No user is signed in.
      }
    });
    const addVocabulary = (): void => {
      const data = {
        userId: userId,
        vocabulary: newVocabularyName.value,
        wordIds: []
      };
      firebase
        .firestore()
        .collection("vocabularies") // usersコレクションの、
        .add(data) // dataをセットする
        .then((docRef) => {
          window.location.href = "/vocabulary"
        });
    };
    return {
      vocaburaryList,
      vocaburaryLink,
      newVocabularyName,
      addVocabulary
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
