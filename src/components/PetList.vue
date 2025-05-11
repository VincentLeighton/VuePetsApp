<script setup lang="ts">
import { ref } from 'vue'

type Pet = {
  id: number
  owner: string
  imageUrl: string
  favoriteFood: string
  isFed: boolean
}

const pets = ref<Pet[]>([
  {
    id: 1,
    owner: 'Alice',
    imageUrl: 'https://example.com/dog.jpg',
    favoriteFood: 'Bone',
    isFed: true,
  },
  {
    id: 2,
    owner: 'Bob',
    imageUrl: 'https://example.com/cat.jpg',
    favoriteFood: 'Fish',
    isFed: false,
  },
  {
    id: 3,
    owner: 'Charlie',
    imageUrl: 'https://example.com/bird.jpg',
    favoriteFood: 'Seeds',
    isFed: true,
  },
])
</script>

<template>
  <div class="pet-list">
    <h1>Pet List</h1>
    <ul>
      <li v-for="pet in pets" :key="pet.id" class="pet-item">
        <img :src="pet.imageUrl" :alt="`Image of ${pet.owner}'s pet`" class="pet-image" />
        <div class="pet-details">
          <p><strong>Owner:</strong> {{ pet.owner }}</p>
          <p><strong>Favorite Food:</strong> {{ pet.favoriteFood }}</p>
          <p><strong>Is Fed:</strong> {{ pet.isFed ? 'Yes' : 'No' }}</p>
        </div>
      </li>
    </ul>
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
