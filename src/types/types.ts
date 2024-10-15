import { CurrentWeatherKeys, DayForecastKeys } from '../enums/enums'

export type Location = {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export type Condition = {
  text: string
  icon: string
  code: number
}

export type Astro = {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: string
  moon_illumination: number
  is_moon_up: number
  is_sun_up: number
}

export type HourlyForecast = {
  time_epoch: number
  time: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  snow_cm: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
  vis_km: number
  vis_miles: number
  gust_mph: number
  gust_kph: number
  uv: number
}

export type ForecastDay = {
  date: string
  date_epoch: number
  day: DayForecast
  astro: Astro
  hour: Array<HourlyForecast>
}

export type WeatherAPIResponse = {
  location: Location
  current: CurrentWeather
  forecast: {
    forecastday: Array<ForecastDay>
  }
}

export type CurrentWeather = {
  [key in CurrentWeatherKeys]: key extends 'condition' ? Condition : number
}

export type DayForecast = {
  [key in DayForecastKeys]: key extends 'condition' ? Condition : number
}

export type GridItemProps = {
  bgColor?: string
}
