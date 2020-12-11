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
        英語の意味
      </h3>
      <h2
        class="text-blue-900 text-2xl sm:text-3xl title-font font-medium mb-1"
      >
        <input
          v-model="userData.name"
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
          v-model="userData.name"
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
          v-model="userData.name"
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
          v-model="userData.name"
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
          v-model="userData.name"
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
        <input
          v-model="userData.name"
          class="border w-full px-1"
          @input="userNameEmitter()"
        />
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
          v-model="userData.name"
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
          v-model="userData.name"
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
          v-model="userData.name"
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
    belongs: string;
    nickname: string;
    birthplace: string;
    birthday: string;
    bloodType: string;
    sign: string;
    hobby: string;
  };
};

export default defineComponent({
  components: {
    PageHeading,
    ProfileTableEdit,
    ProfileNameIconEdit,
  },
  setup(_, { root }: SetupContext) {
    const userData = reactive<User>({
      id: "",
      name: "",
      email: "",
      role: "",
      iconUrl: "",
      comment: "",
      profile: {
        belongs: "",
        nickname: "",
        birthplace: "",
        birthday: "",
        bloodType: "",
        sign: "",
        hobby: "",
      },
    });

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        userData.id = user.uid;
        userData.email = user.email;
        getUserData(user);
      } else {
        // No user is signed in.
      }
    });
    const getUserData = (user) => {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            userData.name = doc.data().name;
            userData.role = doc.data().role;
            userData.iconUrl = doc.data().iconUrl;
            userData.profile = doc.data().profile;
            userData.comment = doc.data().comment;
          }
        })
        .catch((err) => {
          console.log("Error getting user document", err);
        });
    };
    const changeName = (name) => {
      userData.name = name;
    };
    const setIcon = (file: File): void => {
      // ストレージのルートへの参照を取得
      const storageRef = firebase.storage().ref();
      // プロフィール画像アップロード先への参照を取得
      const fileRef = storageRef.child(
        "images/profile/" + userData.id + "/" + file.name
      );
      // プロフィール画像をストレージにアップロード
      fileRef.put(file).then(function (snapshot) {
        // ユーザーデータのURLを更新する
        snapshot.ref.getDownloadURL().then((url) => {
          userData.iconUrl = url;
        });
      });
    };
    const setProfile = (): void => {
      const data = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        iconUrl: userData.iconUrl,
        comment: userData.comment,
        profile: userData.profile,
      };
      firebase
        .firestore()
        .collection("users") // usersコレクションの、
        .doc(userData.id) // <ユーザーID>というドキュメントに、
        .set(data) // dataをセットする
        .then(() => {
          window.location.href = "/profile"; // 完了後、プロフィール画面へ遷移
        });
    };
    return {
      userData,
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
