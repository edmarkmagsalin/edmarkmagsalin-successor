import { useGetDataWeatherByLatLongQuery } from '@/services/weatherApi';
import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react'
import { Dialog, ExternalLink } from '@/components';

export const Weather = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    long: number;
  } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        })
      },
      (err: any) => {
        console.log({err});
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, [])
  
  const {
    data,
    error,
    isLoading
  } = useGetDataWeatherByLatLongQuery(
    coordinates ?? { lat: 0, long: 0 },
    {
      skip: !coordinates,

      // BACKGROUND SYNC: Auto-refetch weather data every 60,000ms (1 minute)
      pollingInterval: 60000*30,

      refetchOnFocus: true,
    }
  )

  const getMonthAndDate = (dt: number) => {
    const date = new Date(dt * 1000).toString().split(' ');
    return date[1]+' '+date[2];
  }
  const getWeatherDescription = (description: string) => {
    return description.charAt(0).toUpperCase() + description.slice(1)
  }
  const getTempText = (temp: number) => {
    return `${temp.toFixed(0)}°C`
  }

  return (
    <div className="flex flex-col justify-center align-middle w-full h-full">
      <div className='text-center pb-2'>
        <h1>{("Current City Weather").toUpperCase()}</h1>
        <small className='text-xs cursor-pointer'><a onClick={() => dialogRef.current?.showModal()}>About</a>
        </small>
      </div>
      <div className="flex flex-col justify-center w-full h-full mb-10 text-center">
        {!coordinates && <small>Getting location permission..</small>}
        {isLoading && <small>Freemium web service API takes a while to wake up.</small>}
        {error && <small>Error getting data.</small>}
        {
          data && (
            <>
              <h4 className='text-center'><MapPin size={20} className='inline-block' />
                {data.name}, {data.sys.country}
              </h4>
              <h4 className='text-xl text-center'>
                {getMonthAndDate(data.dt)}
              </h4>
              <div className="flex justify-center gap-2">
                <img src={`https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`} alt={data.weather[0].description} className='w-10 h-10 inline-block rounded-full bg-gray-500'/>
                <small className='self-center'>
                  {getWeatherDescription(data.weather[0].description)}
                </small>
              </div>
              <div className="text-center text-[3rem] mt-0">
                {getTempText(data.main.temp)}
              </div>
              <div className="text-center opacity-40 text-xs">
                Feels like {getTempText(data.main.feels_like)}
              </div>
            </>
          )
        }
      </div>
      <Dialog dialogRef={dialogRef}>
        <div className='text-center'>
          <h4 className='pb-2'>Created with</h4>
          <ul className='flex flex-wrap gap-1 justify-center'>
            <li>
              <ExternalLink className='pills py-2 px-3 text-sm' href='https://openweathermap.org/api' text='OpenWeather API' />
            </li>
            <li>
              <ExternalLink className='pills py-2 px-3 text-sm' href='https://expressjs.com/' text='ExpressJS' />
            </li>
            <li>
              <ExternalLink className='pills py-2 px-3 text-sm' href='https://redux-toolkit.js.org/rtk-query/overview' text='RTK Query' />
            </li>
          </ul>
        </div>
      </Dialog>
    </div>
  )
}