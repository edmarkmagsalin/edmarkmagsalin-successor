import { useGetDataWeatherByLatLongQuery } from '@/services/weatherApi';
import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react'

export const Weather = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    long: number;
  } | null>(null);

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
    { skip: !coordinates }
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
    <div className="flex justify-center grow">
      <div className="self-center">
        {!coordinates && (<small>Getting location permission..</small>)}
        {isLoading && <small>Loading data...</small>}
        {error && <small>Error getting data.</small>}
        {
          data && (
            <>
              <div className="flex flex-col justify-center gap-2">
                <h4><MapPin size={20} className='inline-block' /> {data.name}, {data.sys.country}</h4>
                <h4 className='text-xl text-center'>{getMonthAndDate(data.dt)}</h4>
                <div className="flex justify-center gap-2">
                  <img src={`https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`} alt={data.weather[0].description} className='w-10 inline-block rounded-full bg-gray-500'/>
                  <small className='self-center'>
                    {getWeatherDescription(data.weather[0].description)}
                  </small>
                </div>
              </div>
              <div className="text-center text-[3rem]">
                {getTempText(data.main.temp)}
              </div>
              <div className="text-center opacity-40 text-xs">
                Feels like {getTempText(data.main.feels_like)}
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}