<template>
  <div>
    <div class="list-table shadow-md sm:rounded overflow-y-auto mx-2">
      <table class="w-full text-md bg-white">
        <thead>
          <tr class="border-b bg-blue-900 text-white">
            <th class="text-left p-3 px-5">Vocabulary</th>
          </tr>
        </thead>
        <tbody class="text-gray-900">
          <tr
            v-for="(vocabulary, index) in vocabularyList"
            :key="index"
            class="border-b bg-gray-100 hover:bg-orange-100 cursor-pointer"
            @click="vocabularyLink(vocabulary.vocabularyId)">
            <td class="py-3 px-5 whitespace-no-wrap sm:whitespace-normal">
                {{ vocabulary.vocabulary }}
            </td>
            <td class="py-3 px-5">
              <div class="flex justify-end items-center">
                <div
                class="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center"
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                    />
                  card
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="lg:w-11/12 mx-2">
        <h3 class="text-sm font-bold title-font text-black-500 tracking-widest">
          New Vocabulary
        </h3>
        <div class="mb-2 mx-2">
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
import firebase from '@/plugins/firebase.ts'
type Vocabulary = {
  vocabularyId: string
  userId: string
  wordIds: string
  vocabulary: string  //name of vocabulary
}
export default defineComponent({
  setup(_) {
    const vocabularyList = reactive<Vocabulary[]>([])
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
        .where("userId", "==", userId)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
          vocabularyList.push({
            vocabularyId: doc.id,
            userId:doc.data().userId,
            wordIds: doc.data().wordIds,
            vocabulary: doc.data().vocabulary
          })
          console.log("vocabularyList", vocabularyList)
        })
      })    
        .catch((err) => {
          console.log('Error getting document', err)
        })
    }
    const vocabularyLink = (vocabularyId: string): void => {
      window.location.href = '/vocabulary/' + vocabularyId
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
      vocabularyList,
      vocabularyLink,
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
