import { useState, useEffect, useRef } from 'react'
import { FiSearch } from 'react-icons/fi'
import {
  Container,
  Dropdown,
  DropdownItem,
  ForecastGrid,
  ForecastItem,
  ForecastTitle,
  ForecastWrapper,
  Form,
  GridItem,
  Input,
  InputWrapper,
  SearchButton,
  Title,
  WeatherDetails,
  WeatherGrid,
  WeatherInfo,
  Wrapper,
} from '../styles/styles'
import { apiKey, forecastApi } from '../api/api'
import { WeatherAPIResponse } from '../types/types'
import { Loading, Notify } from 'notiflix'
import { getWeatherIcon } from '../helpers/WeatherIcon'
import { FaTint, FaWind } from 'react-icons/fa'
import styles from './styles.module.scss'
import { CurrentWeatherKeys, DayForecastKeys } from '../enums/enums'

const WeatherForecast: React.FC = () => {
  const [location, setLocation] = useState<string>('')
  const [toggle, setToggle] = useState<boolean>(false)
  const [weather, setWeather] = useState<WeatherAPIResponse | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  async function fetchData(city: string = ''): Promise<void> {
    try {
      if (city) {
        Loading.circle('Loading..')
        const res = await fetch(
          `${forecastApi}?key=${apiKey}&q=${encodeURIComponent(city)}&days=7`
        )
        if (!res.ok) {
          Notify.warning(`Incorrect destination. Please try again.`)
          throw new Error('Failed to fetch weather data')
        }
        const data: WeatherAPIResponse = await res.json()
        setWeather(data)
        addToRecentSearches(data.location.name)
        Loading.remove()
      } else if (navigator.geolocation) {
        Loading.circle('Loading..')
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          const res = await fetch(
            `${forecastApi}?key=${apiKey}&q=${latitude},${longitude}&days=7`
          )
          const data: WeatherAPIResponse = await res.json()
          setWeather(data)
        })
        Loading.remove()
      }
    } catch (err) {
      console.error(err)
      Loading.remove()
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches')
    const searches = savedSearches ? JSON.parse(savedSearches) : []
    setRecentSearches(searches)

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function handleClickOutside(event: MouseEvent): void {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false)
      setShowRecentSearches(false)
    }
  }

  function addToRecentSearches(searchedValues: string): void {
    const updatedSearches = [
      searchedValues,
      ...recentSearches.filter((s) => s !== searchedValues),
    ].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
  }

  function handleLocationChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setLocation(e.target.value)
    if (e.target.value.length >= 2) {
      const currentSearches = recentSearches.filter((suggestion) =>
        suggestion.toLowerCase().includes(location.toLowerCase())
      )
      setSuggestions(currentSearches)
      setShowSuggestions(true)
      setShowRecentSearches(false)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setShowRecentSearches(
        e.target.value.length === 0 && recentSearches.length > 0
      )
    }
  }

  function handleSuggestionClick(suggestion: string): void {
    setLocation(suggestion)
    setSuggestions([])
    setShowSuggestions(false)
    setShowRecentSearches(false)
    fetchData(suggestion)
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    if (location) {
      fetchData(location)
      setShowSuggestions(false)
      setShowRecentSearches(false)
    }
  }

  function handleRecentSearchClick(search: string): void {
    setLocation(search)
    setShowRecentSearches(false)
    fetchData(search)
  }

  return (
    <Container>
      <Wrapper>
        <Title>Weather Forecast</Title>
        <Form onSubmit={handleSearch}>
          <InputWrapper ref={dropdownRef}>
            <Input
              type='text'
              value={location}
              onChange={handleLocationChange}
              onFocus={() => setShowRecentSearches(recentSearches.length > 0)}
              placeholder='Enter location'
              aria-label='Enter location for weather forecast'
            />
            <SearchButton type='submit' aria-label='Search for weather'>
              <FiSearch style={{ fontSize: '1.5rem' }} />
            </SearchButton>
            {showSuggestions && (
              <Dropdown>
                {suggestions.length
                  ? suggestions.map((suggestion, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </DropdownItem>
                    ))
                  : null}
              </Dropdown>
            )}
            {showRecentSearches && (
              <Dropdown>
                {recentSearches.length
                  ? recentSearches.map((search, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                      >
                        {search}
                      </DropdownItem>
                    ))
                  : null}
              </Dropdown>
            )}
          </InputWrapper>
        </Form>
        {weather?.current && (
          <WeatherInfo onClick={() => setToggle(!toggle)}>
            <WeatherDetails>
              <div>
                <h2>{weather?.location?.name}</h2>
                <p>
                  The outside is{' '}
                  {weather?.current?.condition?.text.toLocaleLowerCase()}
                </p>
              </div>
              <div>
                {getWeatherIcon(weather?.current?.condition?.text)}
                <h2>
                  {toggle
                    ? `${weather?.current?.[CurrentWeatherKeys.TempC]}°C`
                    : `${weather?.current?.[CurrentWeatherKeys.TempF]}°F`}
                </h2>
              </div>
            </WeatherDetails>
            <WeatherGrid>
              <GridItem>
                <FaTint className={styles.humidity} />
                <h4>Humidity</h4>
                <p>{weather?.current?.[CurrentWeatherKeys.Humidity]}%</p>
              </GridItem>
              <GridItem>
                <FaWind className={styles.wind} />
                <h4>Wind</h4>
                <p>{weather?.current?.[CurrentWeatherKeys.WindKph]} km/h</p>
              </GridItem>
            </WeatherGrid>
          </WeatherInfo>
        )}
        {weather?.forecast?.forecastday.length ? (
          <ForecastWrapper onClick={() => setToggle(!toggle)}>
            <ForecastTitle>7-Day Forecast</ForecastTitle>
            <ForecastGrid>
              {weather.forecast.forecastday.map((item, index) => (
                <ForecastItem key={index}>
                  <h4>
                    {index === 0
                      ? 'Now'
                      : `${item.date.slice(-2)}/${item.date.slice(5, 7)}`}
                  </h4>
                  {getWeatherIcon(item.day.condition.text)}
                  <p>
                    High:{' '}
                    {toggle
                      ? `${item.day[DayForecastKeys.MaxTempC]}°C`
                      : `${item.day[DayForecastKeys.MaxTempF]}°F`}
                  </p>
                  <p>
                    Low:{' '}
                    {toggle
                      ? `${item.day[DayForecastKeys.MinTempC]}°C`
                      : `${item.day[DayForecastKeys.MinTempF]}°F`}
                  </p>
                </ForecastItem>
              ))}
            </ForecastGrid>
          </ForecastWrapper>
        ) : null}
      </Wrapper>
    </Container>
  )
}

export default WeatherForecast
