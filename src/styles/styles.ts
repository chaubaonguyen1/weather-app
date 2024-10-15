import styled from 'styled-components'
import { GridItemProps } from '../types/types'

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #60a5fa, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`

export const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  max-width: 48rem;
  width: 100%;
`

export const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`

export const Form = styled.form`
  margin-bottom: 1.5rem;
  position: relative;
`

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
`

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.5);
  }
`

export const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  &:hover {
    color: #3b82f6;
  }
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`

export const Dropdown = styled.ul`
  position: absolute;
  top: 35px;
  z-index: 10;
  width: 100%;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 1rem;
  margin-top: 0.25rem;
  max-height: 15rem;
  overflow: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
`

export const DropdownItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`

export const WeatherInfo = styled.div`
  margin-bottom: 2rem;
  transition: all 0.3s ease-in-out;
`

export const WeatherDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

export const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`

export const GridItem = styled.div<GridItemProps>`
  background: ${(props) => props.bgColor || '#fff'};
  padding: 1rem;
  border-radius: 0.5rem;
`

export const ForecastWrapper = styled.div`
  transition: all 0.3s ease-in-out;
`

export const ForecastTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

export const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  p {
    line-height: 1.3;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
export const ForecastItem = styled.div`
  background: #fff;
  padding: 1.2rem;
  border-radius: 0.5rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  text-align: center;

  @media (max-width: 768px) {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
    &:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    h4 {
      margin: 0;
      font-size: 0.9rem;
    }
    p {
      margin: 0;
      font-size: 0.8rem;
    }
    height: 50px;
    padding: 0.5rem;
    h4,
    p {
      margin: 1px;
      padding: 1px;
      line-height: 1.2;
      width: 75px;
    }
  }
`
