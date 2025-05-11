import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AddPet from '../AddPet.vue'
import { createApp, ref } from 'vue'
import type { Pet } from '@/types/petsType'

describe('AddPet.vue', () => {
  const mockPets = ref<Pet[]>([])

  const app = createApp({})
  app.provide('Pets', mockPets)

  it('renders the add pet form correctly', () => {
    const wrapper = mount(AddPet, {
      global: {
        provide: {
          Pets: mockPets,
        },
      },
    })

    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input#owner').exists()).toBe(true)
    expect(wrapper.find('input#imageUrl').exists()).toBe(true)
    expect(wrapper.find('input#favoriteFood').exists()).toBe(true)
  })

  it('adds a new pet to the list', async () => {
    const wrapper = mount(AddPet, {
      global: {
        provide: {
          Pets: mockPets,
        },
      },
    })

    wrapper.find('input#owner').setValue('Alice')
    wrapper.find('input#name').setValue('Billy')
    wrapper.find('input#age').setValue('3')
    wrapper.find('input#imageUrl').setValue('https://example.com/dog.jpg')
    wrapper.find('input#favoriteFood').setValue('Bone')
    wrapper.find('form').trigger('submit.prevent')

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

  it('resets the form after submission', async () => {
    const wrapper = mount(AddPet, {
      global: {
        provide: {
          Pets: mockPets,
        },
      },
    })

    await wrapper.find('input#owner').setValue('Alice')
    await wrapper.find('input#age').setValue('3')
    await wrapper.find('input#name').setValue('Billy')
    await wrapper.find('input#imageUrl').setValue('https://example.com/dog.jpg')
    await wrapper.find('input#favoriteFood').setValue('Bone')
    await wrapper.find('form').trigger('submit.prevent')

    expect((wrapper.find('input#owner').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('input#name').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('input#age').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('input#imageUrl').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('input#favoriteFood').element as HTMLInputElement).value).toBe('')
  })
})
