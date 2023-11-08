'use server'

import { cookies } from 'next/headers'

export async function create(data) {
  return cookies().set(data.name, data.value)
}

export async function read(name) {
  return cookies().get(name)
}

export async function getAll() {
  return cookies().getAll()
}