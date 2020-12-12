<template>
  <div class="container mx-auto">
    <PageHeading>
      単語詳細
      <button
        class="w-20 text-center text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 mt-2 rounded focus:outline-none focus:shadow-outline"
        @click="setWord"
      >
        編集
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
        <p class="w-full px-1">  {{wordData.english}} </p>
      </h2>
      
      
    </div>
       <div>
      <h3 class="text-sm font-bold title-font text-black-500 tracking-widest">
        Meanings
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <p class="w-full px-1" 
          v-for="(meaning, index) in  wordData.meanings"
          :key="index"> 
          {{ meaning }} </p>
      </h2>
      
      
    </div>
    <div>
      <h3 class="text-sm font-bold title-font text-black-500 tracking-widest">
        例文
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <p class="w-full px-1">  {{wordData.example}} </p>
      </h2>
      
      
    </div>
    
    <div>
      <h3 class="text-sm font-bold title-font text-black-500 tracking-widest">
        品詞
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <p class="w-full px-1"> {{wordData.wordclass}} </p>
      </h2>
      
      
    </div>
    <div>
      <h3 class="text-sm font-bold title-font text-black-500 tracking-widest">
        リンクのURL
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <p class="w-full px-1">  {{wordData.link}} </p>
      </h2>
    </div>
    <div>
      <h3 class="text-sm font-bold title-font text-black-500 tracking-widest">
        写真
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <p class="w-full px-1"> {{wordData.image}} </p>
      </h2>
      
      
    </div>
    <div>
      <h3 class="text-sm font-bold title-font text-black-500 tracking-widest">
        収納する単語帳
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <p class="w-full px-1">  {{wordData.vacaburary}} </p>
      </h2>
      
      
    </div>
        <hr class="my-4 sm:my-8" /> 　
        <!-- 一番したのテンプレートの文字位置 -->
        
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'nuxt-composition-api'
import PageHeading from '@/components/page-heading.vue'
import ProfileNameIcon from '@/components/profile-name-icon.vue'
import ProfileTable from '@/components/profile-table.vue'
import firebase from '@/plugins/firebase.ts'

type Word = {
    english: string;
    meanings:[];
    example: string;
    wordclass: string;
    link: string;
    image: string;
    vocaburary: string;
};

export default defineComponent({
  components: {
    PageHeading,
    ProfileTable,
    ProfileNameIcon,
  },
  setup(_, { root }: SetupContext) {
    const wordData = reactive<Word>({
      english: "",
      meanings: [],
      example: "",
      wordclass: "",
      link: "",
      image: "",
      vocaburary: "",
    });
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        userId = user.uid
      } else {
        // No user is signed in.
      }
    });

      firebase
        .firestore()
        .collection('words')
        .doc(root.$route.params.id) // URLからIDを取得して、そのIDのドキュメントを取得する
        .get()
        .then((doc) => {
          if (doc.exists) {
            wordData.english = doc.data().english
            wordData.meanings = doc.data().meanings
            wordData.example = doc.data().example
            wordData.wordclass = doc.data().wordclass
            wordData.link = doc.data().link
            wordData.image = doc.data().image
            wordData.vocaburary = doc.data().vocaburary
          }
        })
        .catch((err) => {
          console.log('Error getting document', err)
        });
    return {
      wordData,
    }
  }
})
</script>
<style></style>
