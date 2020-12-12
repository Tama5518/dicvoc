<template>
  <div class="container mx-auto">
    <PageHeading>カード詳細</PageHeading>
    <div class="lg:w-11/12 mx-auto flex flex-wrap">
      <div class="p-4 lg:px-8 lg:w-1/2 w-full">
        <ProfileEnglishIcon
          :illustration="wordsData.illustration"
          :english="wordsData.english"
          :number="wordsData.number"
        />
        <hr class="my-4 sm:my-8" />
        <p class="leading-relaxed whitespace-pre-line">
          {{ wordsData.meaning }}
        </p>
      </div>
      <ProfileTable class="mt-8 lg:w-1/2 w-full" :more="wordsData.more" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'nuxt-composition-api'
import PageHeading from '@/components/page-heading.vue'
import ProfileEnglishIcon from '@/components/profile-english-icon.vue'
import ProfileTable from '@/components/profile-element.vue'
import wordslistJson from '@/mock/wordslist.json'
import firebase from '@/plugins/firebase.ts'

type Word = {
  id: string
  number: string
  english: string
  pronounciation: string
  part: string
  illustration: string
  meaning: string
  more: {
    synonims: string
    anti: string
    inflectedform: string
    etymology: string
  }
}

export default defineComponent({
  components: {
    PageHeading,
    ProfileTable,
    ProfileNameIcon,
  },
  setup(_, { root }: SetupContext) {
    const wordsData = reactive<Word>({
      id: '',
      number: '',
      english: '',
      pronounciation: '',
      part: '',
      illustration: '',
      meaning: '',
      more: {
        synonims: '',
        anti: '',
        inflectedform: '',
        etymology: ''
      },
    })
      .catch((err) => {
        console.log('Error getting document', err)
      })
    return {
      wordsData,
    }
  },
})
</script>
<style></style>
