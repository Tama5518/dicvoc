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
              <input v-model="profile.occupation" class="border w-full px-1" />
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
              本名
            </th>
            <td class="p-4 w-full">
              <input v-model="profile.name" class="border w-full px-1" />
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
              英語学習期間（年）
            </th>
            <td class="p-4 w-full">
              <input v-model="profile.learningtime" class="border w-full px-1" />
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
            出生地
            </th>
            <td class="p-4 w-full">
              <select
              v-model="profile.birthplace"
              class="appearance-none bg-white w-half border py-3 px-4 pr-8 rounded focus:outline-none"
            >
              <option value="japan">日本</option>
              <option value="others">英語圏</option>
             
            </select>
            </td>
          </tr>
          <tr class="border-b bg-gray-100">
            <th class="p-4 whitespace-no-wrap text-left">
            英語を学ぶ動機
            </th>
            <td class="p-4 w-full">
             <select
              v-model="profile.birthplace"
              class="appearance-none bg-white w-half border py-3 px-4 pr-8 rounded focus:outline-none"
            >
              <option value="work">学校や仕事で使用するため</option>
              <option value="culture">海外旅行で使用するため</option>
            　<option value="study">英語を勉強するのが好きだから</option>
              <option value="money">収入が上がるから</option>
            </select> 
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
