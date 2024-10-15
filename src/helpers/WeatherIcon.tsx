import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiDayCloudy,
  WiFog,
  WiSleet,
} from 'react-icons/wi'

export function getWeatherIcon(condition: string): JSX.Element {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <WiDaySunny style={{ color: '#fbbf24', fontSize: '2rem' }} />
    case 'partly cloudy':
    case 'cloudy':
      return <WiCloudy style={{ color: '#9ca3af', fontSize: '2rem' }} />
    case 'overcast':
      return <WiDayCloudy style={{ color: '#9ca3af', fontSize: '2rem' }} />
    case 'patchy rain possible':
    case 'light rain':
    case 'moderate rain':
    case 'heavy rain':
    case 'rain':
    case 'patchy light rain':
      return <WiRain style={{ color: '#3b82f6', fontSize: '2rem' }} />
    case 'thundery outbreaks possible':
    case 'thunderstorm':
    case 'patchy light rain with thunder':
      return <WiThunderstorm style={{ color: '#4b5563', fontSize: '2rem' }} />
    case 'snow':
    case 'light snow':
    case 'moderate snow':
    case 'heavy snow':
    case 'patchy snow possible':
      return <WiSnow style={{ color: '#bfdbfe', fontSize: '2rem' }} />
    case 'mist':
    case 'fog':
    case 'freezing fog':
      return <WiFog style={{ color: '#94a3b8', fontSize: '2rem' }} />
    case 'patchy sleet possible':
    case 'sleet':
      return <WiSleet style={{ color: '#6b7280', fontSize: '2rem' }} />
    default:
      return <WiDaySunny style={{ color: '#fbbf24', fontSize: '2rem' }} />
  }
}
