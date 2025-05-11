import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AddPetView from '../AddPetView.vue'
import { createApp, ref } from 'vue'
import type { Pet } from '@/types/petsType'

describe('AddPetView.vue', () => {
  const mockPets = ref<Pet[]>([])

  const app = createApp({})
  app.provide('Pets', mockPets)

  it('renders the add pet view correctly', () => {
    const wrapper = mount(AddPetView, {
      global: {
        provide: {
          Pets: mockPets,
        },
      },
    })

    expect(wrapper.find('h1').text()).toBe('Add a New Pet')
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('adds a pet and updates the list', async () => {
    const wrapper = mount(AddPetView, {
      global: {
        provide: {
          Pets: mockPets,
        },
      },
    })

    await wrapper.find('input#owner').setValue('Alice')
    await wrapper.find('input#name').setValue('Billy')
    await wrapper.find('input#age').setValue('3')
    await wrapper.find('input#imageUrl').setValue('https://example.com/dog.jpg')
    await wrapper.find('input#favoriteFood').setValue('Bone')
    await wrapper.find('form').trigger('submit.prevent')

    expect(mockPets.value.length).toBe(1)
    expect(mockPets.value[0]).toMatchObject({
      owner: 'Alice',
      name: 'Billy',
      age: 3,
      imageUrl: 'https://example.com/dog.jpg',
      favoriteFood: 'Bone',
      isFed: false,
    })
  })
})
