<template>
  <div>
    <PageHeading>単語一覧</PageHeading>
    <ListTable class="my-4 lg:w-11/12 mx-auto" />
    <hr class="my-12" />
    <div class="flex fllex-col items-center text-center mt-10">
            <div
                  class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center"
                  @click="startVocabyraries()"
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
                  単語を再生
            </div>
            <div
                  class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded-full focus:outline-none focus:shadow-outline flex items-center"
                  @click="addNewWords()"
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
                  単語を追加
              </div>
            <div
                  class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center"
                  @click="vocaburaryList()"
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
                  単語帳一覧
            </div>
        
    </div>
  </div>  
</template>
<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'
import PageHeading from '@/components/page-heading.vue'
import ListTable from '@/components/word-list-table.vue'

export default defineComponent({
  components: {
    PageHeading,
    ListTable,
  },
  setup(_, { root: { $store } }) {
    const startVocabyraries = () : void =>{
      window.location.href = '/words/english'
    }
    const addNewWords = (): void => {
      window.location.href= '/words/add_simple'
    }
    const vocaburaryList = (): void =>{
      window.location.href = '/vocaburary'
    }
    
    return {
      startVocabyraries,
      addNewWords,
      vocaburaryList
    }
  }
})
</script>
<style></style>
