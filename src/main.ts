import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import type { Pet } from './types/petsType'

const app = createApp(App)

const Pets = ref<Pet[]>([
  {
    id: 1,
    name: 'Buddy',
    age: 3,
    owner: 'Alice',
    imageUrl: 'https://example.com/dog.jpg',
    favoriteFood: 'Bone',
    isFed: true,
  },
  {
    id: 2,
    name: 'Whiskers',
    age: 2,
    owner: 'Bob',
    imageUrl: 'https://example.com/cat.jpg',
    favoriteFood: 'Fish',
    isFed: false,
  },
  {
    id: 3,
    name: 'Tweety',
    age: 1,
    owner: 'Charlie',
    imageUrl: 'https://example.com/bird.jpg',
    favoriteFood: 'Seeds',
    isFed: true,
  },
])

app.provide('Pets', Pets)

app.use(router)

app.mount('#app')
