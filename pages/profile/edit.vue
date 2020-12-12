<template>
  <div class="container mx-auto">
    <PageHeading>
      プロフィール編集
      <button
        class="w-20 text-center text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 mt-2 rounded focus:outline-none focus:shadow-outline"
        @click="setProfile"
      >
        登録
      </button>
    </PageHeading>
    <label class="text-sm title-font text-gray-500">
            プロフィール画像
          </label>
    <div class="lg:w-11/12 mx-auto flex flex-wrap">
      <div class="p-4 lg:px-8 lg:w-1/2 w-full">
        <ProfileNameIconEdit
          :icon-url="userData.iconUrl"
          :user-name="userData.name"
          :email="userData.email"
          @changeName="changeName"

        />
        <div class="pt-2">
          <label class="text-sm title-font text-gray-500">
            年齢
          </label>
          <div class="age">
            <select
              class="appearance-none bg-white w-full border py-3 px-4 pr-8 rounded focus:outline-none"
            >
              <option v-for="age in 100" :key="age"> {{ age }} </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <hr class="my-4 sm:my-8" />
        <label class="text-sm title-font text-gray-500">
          意気込み・ひとこと・ポエムなど
          </label>
        <textarea
          v-model="userData.comment"
          class="w-full h-40 border px-1"
        ></textarea>
      </div>
      <ProfileTableEdit
        class="mt-8 lg:w-1/2 w-full"
        :profile="userData.profile"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext, onBeforeMount } from 'nuxt-composition-api'
import PageHeading from '@/components/page-heading.vue'
import ProfileNameIconEdit from '@/components/profile-name-icon-edit.vue'
import ProfileTableEdit from '@/components/profile-table-edit.vue'
import firebase from '@/plugins/firebase.ts'

type User = {
  id: string
  username: string
  email: string
  // role: string
  iconUrl: string
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
    ProfileTableEdit,
    ProfileNameIconEdit,
  },
  setup(_, { root }: SetupContext) {
    const userData = reactive<any>({
      id: '',
      username: '',
      email: '',
      // role: '',
      iconUrl: '',
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

    firebase.auth().onAuthStateChanged(function (user) {
      console.log('userData',userData)
      if (user) {
        // User is signed in.
        userData.id = user.uid
        // userData.email = user.email
        getUserData(user)
      } else {
        // No user is signed in.
      }
    })
    const getUserData = (user: any) => {
      console.log('getUserData', user)
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          console.log('doc', doc)
          if (doc.exists) {
            userData.username = doc.data().username
            // userData.role = doc.data().role
            userData.iconUrl = doc.data().iconUrl
            userData.profile = doc.data().profile
            userData.comment = doc.data().comment
          }
        })
        .catch((err) => {
          console.log('Error getting user document', err);
        })
    }
    // const changeName = (name: any) => {
    //   userData.name = name
    // }
    const setIcon = (file: File): void => {
      // ストレージのルートへの参照を取得
      const storageRef = firebase.storage().ref()
      // プロフィール画像アップロード先への参照を取得
      const fileRef = storageRef.child(
        'images/profile/' + userData.id + '/' + file.name
      )
      // プロフィール画像をストレージにアップロード
      fileRef.put(file).then(function (snapshot) {
        // ユーザーデータのURLを更新する
        snapshot.ref.getDownloadURL().then((url) => {
          userData.iconUrl = url
        })
      })
    }
    const setProfile = (): void => {
      const data = {
        username: userData.username,
        email: userData.email,
        // role: userData.role,
        iconUrl: userData.iconUrl,
        comment: userData.comment,
        profile: userData.profile,
      }
      firebase
        .firestore()
        .collection('users') // usersコレクションの、
        .doc(userData.id) // <ユーザーID>というドキュメントに、
        .set(data) // dataをセットする
        .then(() => {
          window.location.href = '/profile' // 完了後、プロフィール画面へ遷移
        })
    }
    return {
      userData,
      setIcon,
      setProfile,
      // changeName,
    }
  },
})
</script>
<style>
.drag-area {
  width: 100%;
  min-width: 200px;
  height: 100%;
  min-height: 200px;
  border: 1px dotted rgba(0,0,0,0.1);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #F5F5F5;
}

.drag-area > input {
  opacity: 0;
}
</style>
