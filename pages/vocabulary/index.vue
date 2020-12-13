<template>
  <div>
    <PageHeading>All Vocabularies</PageHeading>
    <ListTable class="my-4 lg:w-11/12 mx-auto mx-16" />
    <hr class="my-12" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'
import PageHeading from '@/components/page-heading.vue'
import ListTable from '@/components/vocabulary-table.vue'
import firebase from "@/plugins/firebase.ts";

export default defineComponent({
  components: {
    PageHeading,
    ListTable,
  }
})
</script>
<style></style>
