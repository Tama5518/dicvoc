<template>
  <div class="profile-table p-4 bg-gray-100">
    <div class="shadow-md rounded overflow-y-auto">
      <table class="w-full text-md bg-white">
        <tbody>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
              職種
            </th>
            <td class="p-4 w-full">
              <input v-model="profile.belongs" class="border w-full px-1" />
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
              本名
            </th>
            <td class="p-4 w-full">
              <input v-model="profile.nickname" class="border w-full px-1" />
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
              英語学習期間（年）
            </th>
            <td class="p-4 w-full">
              <input v-model="profile.birthplace" class="border w-full px-1" />
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
            TOIEC点数（点）
            </th>
            <td class="p-4 w-full">
              <select
              v-model="wordData.wordclass"
              class="appearance-none bg-white w-half border py-3 px-4 pr-8 rounded focus:outline-none"
            >
              <option value="-400">0~400点</option>
              <option value="401-600">401~600点</option>
              <option value="601-700">601~700点</option>
              <option value="701-800">701~800点</option>
              <option value="801-900">801~900点</option>
              <option value="901-990">901~990点</option>
            </select>
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
            英語を学ぶ動機
            </th>
            <td class="p-4 w-full">
              <input v-model="profile.bloodType" class="border w-full px-1" />
            </td>
          </tr>
          
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
              趣味
            </th>
            <td class="p-4 w-full">
              <input v-model="profile.hobby" class="border w-full px-1" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from 'nuxt-composition-api'
export default defineComponent({
  name: 'ProfileTable',
  props: {
    profile: {},
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
