<script setup lang="ts">
import { ref, defineEmits } from 'vue'

type Pet = {
  id: number
  owner: string
  imageUrl: string
  favoriteFood: string
  isFed: boolean
}

const emits = defineEmits(['add-pet'])

const owner = ref('')
const imageUrl = ref('')
const favoriteFood = ref('')

const addPet = () => {
  if (owner.value && imageUrl.value && favoriteFood.value) {
    const newPet: Pet = {
      id: Math.floor(Math.random() * 1000),
      owner: owner.value,
      imageUrl: imageUrl.value,
      favoriteFood: favoriteFood.value,
      isFed: false,
    }
    emits('add-pet', newPet)
    owner.value = ''
    imageUrl.value = ''
    favoriteFood.value = ''
  }
}
</script>

<template>
  <div class="add-pet">
    <h1>Add a New Pet</h1>
    <form @submit.prevent="addPet">
      <div>
        <label for="owner">Owner:</label>
        <input type="text" id="owner" v-model="owner" required />
      </div>
      <div>
        <label for="imageUrl">Image URL:</label>
        <input type="url" id="imageUrl" v-model="imageUrl" required />
      </div>
      <div>
        <label for="favoriteFood">Favorite Food:</label>
        <input type="text" id="favoriteFood" v-model="favoriteFood" required />
      </div>
      <button type="submit">Add Pet</button>
    </form>
  </div>
</template>

<style scoped>
.add-pet {
  font-family: Arial, sans-serif;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

input {
  padding: 5px;
  font-size: 14px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
