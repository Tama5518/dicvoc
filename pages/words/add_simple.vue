<template>
  <div class="container mx-auto">
    <PageHeading>
      単語登録
      <button
        class="w-20 text-center text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 mt-2 rounded focus:outline-none focus:shadow-outline"
        @click="setWord"
      >
        <a href= "/words/add_detail">詳細登録</a>
      </button>
      <button
        class="w-20 text-center text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 mt-2 rounded focus:outline-none focus:shadow-outline"
        @click="setWord"
      >
        新規追加
      </button>
    </PageHeading>
    <div class="lg:w-11/12 mx-auto flex flex-wrap">
      <div class="p-4 lg:px-8 lg:w-1/2 w-full">
          <div>
      <h3 class="text-sm font-bold title-font text-black-500 tracking-widest">
        English Word
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <input
          v-model="wordData.english"
          class="border w-full px-1"
        />
      </h2>
    </div>
      <div>
      <h3 class="text-sm font-bold title-font text-black-500 tracking-widest">
        Meanings
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <input
          v-model="wordData.meanings[0]"
          class="border w-full px-1"
        />
      </h2>
      </div>
      <div>
      <h3 class="text-sm font-bold title-font text-black-500 tracking-widest">
        収納する単語帳
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <select
          v-model='selectedVocabularyId'
          class="appearance-none bg-white w-half border py-3 px-4 pr-8 rounded focus:outline-none"
        >
          <option 
          v-for="(vocabulary) in vocabularies" 
          :key='vocabulary.id'
          :value="vocabulary.id">
            {{vocabulary.vocabulary}}
          </option>
        </select>
      </h2>
    </div>
        <hr class="my-4 sm:my-8" /> 　
        <!-- 一番したのテンプレートの文字位置 -->
        
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  SetupContext,
  onBeforeMount,
  ref
} from "nuxt-composition-api";
import PageHeading from "@/components/page-heading.vue";
import ProfileNameIconEdit from "@/components/profile-name-icon-edit.vue";
import ProfileTableEdit from "@/components/profile-table-edit.vue";
import firebase from "@/plugins/firebase.ts";

type Word = {
  english: string;
  meanings: [];
  example: string;
  wordclass: string;
  link: string;
  image: string;
  vocabulary: string;
  
};
export default defineComponent({
  components: {
    PageHeading,
    ProfileTableEdit,
    ProfileNameIconEdit,
  },
  setup(_, { root }: SetupContext) {
    const wordData = reactive<Word>({
      english: "",
      meanings: [],
      example: "",
      wordclass: "",
      link: "",
      image: "",
      vocabulary: "",
    });
    let userId = ""
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        userId = user.uid;
        getVocaburariesData(userId)
      } else {
        // No user is signed in.
      }
    });
    const vocabularies = reactive<any[]>([])
    const selectedVocabularyId = ref('')
    const getVocaburariesData = (userId: any) => {
      console.log('getVocaburariesData', userId)
      firebase
        .firestore()
        .collection("vocabularies") 
        .where("userId", "==", userId)
        .get()
        .then(function (querySnapshot) {
          console.log('then', querySnapshot)
          querySnapshot.forEach(function (doc) {
          vocabularies.push({
            id: doc.id,
            userId: doc.data().userId,
            vocabulary: doc.data().vocabulary,
            wordIds: doc.data().wordIds
          })
          console.log('vocabularies', vocabularies)
        })
      })    
        .catch((err) => {
          console.log('Error getting document', err)
        })
    }
    const setWord = (): void => {
      const data = {
        english: wordData.english,
        example: wordData.example,
        image: wordData.image,
        link: wordData.link,
        meanings: wordData.meanings,
        vocabulary: vocabularies.filter((vocabulary)=>{
          return vocabulary.id == selectedVocabularyId.value
        })[0].vocabulary,
        userId: userId,
        wordclass: wordData.wordclass,
      }
      firebase
        .firestore()
        .collection("words") // usersコレクションの、
        .add(data) // dataをセットする
        .then((docRef) => {
          console.log('selectedVocabularyId.value', selectedVocabularyId.value)
          if (selectedVocabularyId.value) {
            firebase
              .firestore()
              .collection("vocabularies")
              .doc(selectedVocabularyId.value)
              .update({
                wordIds: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            })
          }
          window.location.href = "/words/" + docRef.id // 完了後、単語登録画面へ遷移
        });
    };
    return {
      wordData,
      setWord,
      vocabularies,
      selectedVocabularyId
    };
  },
});
</script>
<style>
.drag-area {
  width: 100%;
  min-width: 200px;
  height: 100%;
  min-height: 200px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f5f5f5;
}

.drag-area > input {
  opacity: 0;
}
</style>
