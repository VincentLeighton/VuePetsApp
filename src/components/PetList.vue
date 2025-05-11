<script setup lang="ts">
import type { Pet } from '@/types/petsType'
import { ref, defineEmits, inject, type Ref } from 'vue'

defineEmits(['add-pet'])

const pets = inject('Pets') as Ref<Pet[]>
const sortKey = ref('')

const sortPets = () => {
  if (sortKey.value === 'isFed') {
    pets.value.sort((a, b) => Number(b.isFed) - Number(a.isFed))
  } else if (sortKey.value === 'isNotFed') {
    pets.value.sort((a, b) => Number(a.isFed) - Number(b.isFed))
  } else if (sortKey.value === 'owner') {
    pets.value.sort((a, b) => a.owner.localeCompare(b.owner))
  } else {
    pets.value.sort((a, b) => a.id - b.id)
  }
}

const deletePet = (id: number) => {
  const index = pets.value.findIndex((pet) => pet.id === id)
  if (index !== -1) {
    pets.value.splice(index, 1)
  }
}

const download = () => {
  const text = JSON.stringify(pets.value, null, 2)
  const filename = 'pets.json'
  const element = document.createElement('a')
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()
  document.body.removeChild(element)
}
</script>

<template>
  <div class="pet-list">
    <h1>Pet List</h1>
    <label for="sort">Sort by:</label>
    <select id="sort" v-model="sortKey" @change="sortPets">
      <option value="">Unsorted</option>
      <option value="isFed">Is Fed</option>
      <option value="isNotFed">Is Not Fed</option>
      <option value="owner">Owner</option>
    </select>
    <RouterLink to="/add-pet">
      <button>Add Pet</button>
    </RouterLink>
    <ul>
      <li v-for="pet in pets" :key="pet.id" class="pet-item">
        <img :src="pet.imageUrl" :alt="`Image of ${pet.owner}'s pet`" class="pet-image" />
        <div class="pet-details">
          <p><strong>Owner:</strong> {{ pet.owner }}</p>
          <p><strong>Name:</strong> {{ pet.name }}</p>
          <p><strong>Age:</strong> {{ pet.age }} years old</p>
          <p><strong>Favorite Food:</strong> {{ pet.favoriteFood }}</p>
          <p><strong>Is Fed:</strong> {{ pet.isFed ? 'Yes' : 'No' }}</p>
          <button
            @click="
              () => {
                pet.isFed = !pet.isFed
              }
            "
          >
            {{ pet.isFed ? 'Unfeed' : 'Feed' }}
          </button>
          <button @click="deletePet(pet.id)">Delete</button>
        </div>
      </li>
    </ul>
    <button @click="download">Download Pets</button>
  </div>
</template>

<style scoped>
.pet-list {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.pet-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.pet-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

.pet-details {
  line-height: 1.5;
}
</style>
