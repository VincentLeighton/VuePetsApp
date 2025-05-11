import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PetListView from '../PetListView.vue'
import { createApp, ref } from 'vue'
import type { Pet } from '@/types/petsType'

describe('PetListView.vue', () => {
  const mockPets = ref<Pet[]>([
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
  ])

  const app = createApp({})
  app.provide('Pets', mockPets)

  it('renders the pet list view correctly', () => {
    const wrapper = mount(PetListView, {
      global: {
        provide: {
          Pets: mockPets,
        },
      },
    })

    expect(wrapper.find('h1').text()).toBe('Pet List')
    expect(wrapper.findAll('.pet-item').length).toBe(2)
  })

  it('navigates to the add pet view', async () => {
    const wrapper = mount(PetListView, {
      global: {
        provide: {
          Pets: mockPets,
        },
      },
    })

    const addPetButton = wrapper
      .findAll('button')
      .find((button: { text: () => string }) => button.text() === 'Add Pet')
    if (!addPetButton) {
      throw new Error('Add Pet button not found')
    }
    expect(addPetButton.exists()).toBe(true)
  })
})
