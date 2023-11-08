import Authorization from "@/components/sections/authorization"
import React from "react"
import wpFetchData from "@/utils/wpFetchData" 

const data = {
  register: {
    title: 'Регистрация',
    text: 'Зарегистрируйтесь, чтобы получить доступ к курсам Академии Красоты'
  },
  login: {
    title: 'Авторизация',
    text: 'Войдите в свой аккаунт, чтобы продолжить обучение'
  }
}

export default async function AuthorizationProcess() {
  const {loginClients: providers} = await getData();

  return (
    <div>
      <Authorization data={data} providers={providers}/>
    </div>
  )
}

const getData = async () => {
  const { body: { data } } = await wpFetchData(`
    query getData {
      loginClients {
          provider
          authorizationUrl
      }
    }
  `)
  return data;
}