<template>
  <div class="profile-table p-4 bg-gray-100">
    <div class="shadow-md rounded overflow-y-auto">
      <table class="w-full text-md bg-white">
        <tbody>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
              発音
            </th>
            <td class="p-4">
              {{ pronounciation }}
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
              品詞
            </th>
            <td class="p-4">
              {{ profile.nickname }}
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
              英語学習期間（年）
            </th>
            <td class="p-4">
              {{ profile.birthplace }}
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
              TOIEC点数（点）
            </th>
            <td class="p-4">
              {{ profile.birthday }}
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
              英語を学ぶ動機
            </th>
            <td class="p-4">
              {{ profile.bloodType }}
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
              趣味
            </th>
            <td class="p-4">
              {{ profile.sign }}
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'nuxt-composition-api'
export default defineComponent({
  name: 'ProfileTable',
  props: {
    more: {},
  },
  setup(props, { root }: SetupContext) {
    return {
      props,
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
