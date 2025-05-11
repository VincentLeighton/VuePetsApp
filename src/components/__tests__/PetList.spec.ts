import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import PetList from '../PetList.vue'
import { createApp, ref } from 'vue'
import type { Pet } from '@/types/petsType'

describe('PetList.vue', () => {
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

  it('renders the pet list correctly', () => {
    const wrapper = mount(PetList, {
      global: {
        provide: {
          Pets: mockPets,
        },
      },
    })

    expect(wrapper.findAll('.pet-item').length).toBe(2)
    expect(wrapper.text()).toContain('Buddy')
    expect(wrapper.text()).toContain('Whiskers')
  })

  it('sorts pets by owner', async () => {
    const wrapper = mount(PetList, {
      global: {
        provide: {
          Pets: mockPets,
        },
      },
    })

    await wrapper.find('#sort').setValue('owner')
    await wrapper.find('#sort').trigger('change')

    const petOwners = wrapper
      .findAll('.pet-details p strong:nth-child(1)')
      .map((node) => node.text())
    expect(petOwners).toEqual(['Alice', 'Bob'])
  })

  it('deletes a pet', async () => {
    const wrapper = mount(PetList, {
      global: {
        provide: {
          Pets: mockPets,
        },
      },
    })

    await wrapper.findAll('button').at(1)?.trigger('click')

    expect(mockPets.value.length).toBe(1)
    expect(wrapper.text()).not.toContain('Buddy')
  })

  it('downloads pets as JSON', async () => {
    const wrapper = mount(PetList, {
      global: {
        provide: {
          Pets: mockPets,
        },
      },
    })

    const createElementSpy = vi.spyOn(document, 'createElement')
    await wrapper.find('button:last-of-type').trigger('click')

    expect(createElementSpy).toHaveBeenCalledWith('a')
  })
})
