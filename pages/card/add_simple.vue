<template>
  <div class="container mx-auto">
    <PageHeading>
      単語登録
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
          v-model="wordData.meanings"
          class="border w-full px-1"
        />
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
} from "nuxt-composition-api";
import PageHeading from "@/components/page-heading.vue";
import ProfileNameIconEdit from "@/components/profile-name-icon-edit.vue";
import ProfileTableEdit from "@/components/profile-table-edit.vue";
import firebase from "@/plugins/firebase.ts";

type Word = {
  english: string;
  meanings: [];
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
    });
    let userId = ""
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        userId = user.uid;
      } else {
        // No user is signed in.
      }
    });
    const setWord = (): void => {
      const data = {
        english: wordData.english,
        meanings: wordData.meanings
      }
      firebase
        .firestore()
        .collection("words") // usersコレクションの、
        .doc() // <ユーザーID>というドキュメントに、
        .set(data) // dataをセットする
        .then(() => {
          window.location.href = "/card"; // 完了後、単語登録画面へ遷移
        });
    };
    return {
      wordData,
      setWord,
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
