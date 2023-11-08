'use server'
import { cookies } from 'next/headers'

export async function create(data) {

  const params = {
    secure: true,
    httpOnly: true,
  }

  if (data?.age)
    params.expires = new Date(data.age * 1000)

  return cookies().set(data.name, data.value, params)
}

export async function read(name) {
  return cookies().get(name)
}

export async function getAll() {
  return cookies().getAll()
}