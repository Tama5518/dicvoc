<template>
  <div class="container mx-auto">
    <PageHeading>
      単語登録
      <button
        class="w-20 text-center text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 mt-2 rounded focus:outline-none focus:shadow-outline"
        @click="setProfile"
      >
        新規追加
      </button>
    </PageHeading>
    <div class="lg:w-11/12 mx-auto flex flex-wrap">
      <div class="p-4 lg:px-8 lg:w-1/2 w-full">
          <div>
      <h3 class="text-sm title-font text-gray-500 tracking-widest">
        英語
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <input
          v-model="wordData.english"
          class="border w-full px-1"
          @input="userNameEmitter()"
        />
      </h2>
      
      
    </div>
       <div>
      <h3 class="text-sm title-font text-gray-500 tracking-widest">
        日本語の意味①
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <input
          v-model="wordData.japanese1"
          class="border w-full px-1"
          @input="userNameEmitter()"
        />
      </h2>
      
      
    </div>
    <div>
      <h3 class="text-sm title-font text-gray-500 tracking-widest">
        日本語の意味②
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <input
          v-model="wordData.japanese2"
          class="border w-full px-1"
          @input="userNameEmitter()"
        />
      </h2>
      
      
    </div>
    <div>
      <h3 class="text-sm title-font text-gray-500 tracking-widest">
        日本語の意味③
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <input
          v-model="wordData.japanese3"
          class="border w-full px-1"
          @input="userNameEmitter()"
        />
      </h2>
      
      
    </div>
    <div>
      <h3 class="text-sm title-font text-gray-500 tracking-widest">
        例文
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <input
          v-model="wordData.example"
          class="border w-full px-1"
          @input="userNameEmitter()"
        />
      </h2>
      
      
    </div>
    
    <div>
      <h3 class="text-sm title-font text-gray-500 tracking-widest">
        品詞
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <select
              v-model="wordData.wordclass"
              class="appearance-none bg-white w-half border py-3 px-4 pr-8 rounded focus:outline-none"
            >
              <option value="admin">名詞</option>
              <option value="admin">動詞</option>
              <option value="member">形容詞</option>
              <option value="admin">副詞</option>
              <option value="admin">代名詞</option>
              <option value="member">前置詞</option>
              <option value="member">接続詞</option>
            </select>
      </h2>
      
      
    </div>
    <div>
      <h3 class="text-sm title-font text-gray-500 tracking-widest">
        リンクのURL
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <input
          v-model="wordData.link"
          class="border w-full px-1"
          @input="userNameEmitter()"
        />
      </h2>
      
      
    </div>
    <div>
      <h3 class="text-sm title-font text-gray-500 tracking-widest">
        写真
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <input
          v-model="wordData.image"
          class="border w-full px-1"
          @input="userNameEmitter()"
        />
      </h2>
      
      
    </div>
    <div>
      <h3 class="text-sm title-font text-gray-500 tracking-widest">
        音楽
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <input
          v-model="wordData.music"
          class="border w-full px-1"
          @input="userNameEmitter()"
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

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  iconUrl: string;
  comment: string;
  profile: {
    english: string;
    japanese1: string;
    japanese2: string;
    japanese3: string;
    example: string;
    wordclass: string;
    link: string;
    image: string;
    music: string;
  };
};
export default defineComponent({
  components: {
    PageHeading,
    ProfileTableEdit,
    ProfileNameIconEdit,
  },
  setup(_, { root }: SetupContext) {
    const wordData = reactive<User>({
      id: "",
      name: "",
      email: "",
      role: "",
      iconUrl: "",
      comment: "",
      profile: {
        english: "",
        japanese1: "",
        japanese2: "",
        japanese3: "",
        example: "",
        wordclass: "",
        link: "",
        image: "",
        music: "",
      },
    });
    firebase.auth().onAuthStateChanged(function (word) {
      if (word) {
        // User is signed in.
        wordData.id = word.uid;
        getwordData(word);
      } else {
        // No user is signed in.
      }
    });
    const getwordData = (word: any) => {
      firebase
        .firestore()
        .collection("words")
        .doc(word.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            wordData.name = doc.data().name;
            wordData.role = doc.data().role;
            wordData.iconUrl = doc.data().iconUrl;
            wordData.profile = doc.data().profile;
            wordData.comment = doc.data().comment;
          }
        })
        .catch((err) => {
          console.log("Error getting user document", err);
        });
    };
    const changeName = (name: string) => {
      wordData.name = name;
    };
    const setIcon = (file: File): void => {
      // ストレージのルートへの参照を取得
      const storageRef = firebase.storage().ref();
      // プロフィール画像アップロード先への参照を取得
      const fileRef = storageRef.child(
        "images/profile/" + wordData.id + "/" + file.name
      );
      // プロフィール画像をストレージにアップロード
      fileRef.put(file).then(function (snapshot) {
        // ユーザーデータのURLを更新する
        snapshot.ref.getDownloadURL().then((url) => {
          wordData.iconUrl = url;
        });
      });
    };
    const setProfile = (): void => {
      const data = {
        name: wordData.name,
        email: wordData.email,
        role: wordData.role,
        iconUrl: wordData.iconUrl,
        comment: wordData.comment,
        profile: wordData.profile,
      };
      firebase
        .firestore()
        .collection("words") // usersコレクションの、
        .doc(wordData.id) // <ユーザーID>というドキュメントに、
        .set(data) // dataをセットする
        .then(() => {
          window.location.href = "/profile"; // 完了後、プロフィール画面へ遷移
        });
    };
    return {
      wordData,
      setIcon,
      setProfile,
      changeName,
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
