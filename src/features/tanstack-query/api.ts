function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export interface Country {
  name: string
  cities: string[]
}

const countries: Country[] = [
  { name: 'USA', cities: ['New York', 'Los Angeles'] },
  { name: 'Canada', cities: ['Toronto', 'Vancouver'] },
  { name: 'Australia', cities: ['Sydney', 'Melbourne'] },
  { name: 'Germany', cities: ['Berlin', 'Munich'] },
  { name: 'India', cities: ['Delhi', 'Mumbai'] },
]

/** Simulates fetching the supported countries list from a backend. */
export function getCountries(): Promise<Country[]> {
  return delay(countries, 300)
}

/** Simulates deleting a country on the backend. */
export function deleteCountry(name: string): Promise<Country[]> {
  return delay(
    countries.filter((country) => country.name !== name),
    300,
  )
}

/** Simulates adding a country on the backend. */
export function addCountry(name: string): Promise<Country> {
  return delay({ name, cities: [] }, 300)
}
