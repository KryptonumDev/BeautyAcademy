'use client'
import React, { useMemo, useState } from "react"
import styles from './styles.module.scss'
import countryList from 'react-select-country-list'
import Select, { components } from 'react-select'
import Error from "../Error"
import { Controller } from "react-hook-form"

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.416 16.9583L20.3327 28.0416L9.24944 16.9583" stroke="#2B483C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </components.DropdownIndicator>
  )
}

const NoOptionsMessage = props => {
  return (
    <components.NoOptionsMessage {...props}>
      <span>Нет подходящих результатов</span>
    </components.NoOptionsMessage>
  );
};


export default function CountrySelect({ control, rules, errors, name, label }) {
  const options = useMemo(() => countryList().native().nativeData, [])

  return (
    <label className={styles.wrapper} aria-invalid={Boolean(errors[name])}>
      <p className={styles.label}>{label}</p>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            inputRef={ref}
            components={{ DropdownIndicator, NoOptionsMessage }}
            className="select"
            classNamePrefix="select"
            options={options}
            value={options.find(c => c.value === value)}
            onChange={val => onChange(val.value)}
            placeholder=''
          />
        )}
      />
      <Error error={errors[name]} />
    </label>
  )
}