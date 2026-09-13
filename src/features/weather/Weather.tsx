import { useGetDataWeatherByLatLongQuery } from '@/services/weatherApi';
import { useEffect, useRef, useState } from 'react';
import { MapPin, RefreshCw } from 'lucide-react'
import { Dialog, ExternalLink, Loading } from '@/components';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setWeatherData } from './weatherSlice';

export const Weather = () => {
  const dispatch = useAppDispatch();
  const cachedWeather = useAppSelector((state) => state.weather.data);
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
    isLoading,
    isFetching,
    refetch,
  } = useGetDataWeatherByLatLongQuery(
    coordinates ?? { lat: 0, long: 0 },
    {
      skip: !coordinates,

      // BACKGROUND SYNC: Auto-refetch weather data every 60,000ms (1 minute)
      pollingInterval: 60000*30,

      refetchOnFocus: true,
    }
  )

  useEffect(() => {
    if (data) {
      dispatch(setWeatherData(data));
    }
  }, [data, dispatch]);

  const weatherData = data ?? cachedWeather;

  const [isSlowLoading, setIsSlowLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsSlowLoading(false);
      return;
    }

    const slowLoadingTimer = window.setTimeout(() => {
      setIsSlowLoading(true);
    }, 5000);

    return () => window.clearTimeout(slowLoadingTimer);
  }, [isLoading]);

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
    <div className="app-container">
      <header className='text-center pb-2'>
        <h1>{("Weather Today").toUpperCase()}</h1>
        <nav className="mini-menu">
          <button onClick={() => dialogRef.current?.showModal()}>
            About
          </button>
        </nav>
      </header>
      <main className='flex flex-col justify-center w-full h-full mb-10 items-center text-center'>
        {!coordinates && <small>Getting location permission..</small>}
        {isLoading && (
          <small>
            {
              isSlowLoading
                ? <Loading text='Cold starting API...' />
                : <Loading text='Loading weather data...' />
            }
          </small>
        )}
        {error && !weatherData && <small>Error getting data.</small>}
        {
          (weatherData && !isLoading && !error) && (
            <>
              <h4 className='flex justify-center items-center gap-1'>
                <MapPin className='inline-block' />
                {weatherData.name}, {weatherData.sys.country}
                <button
                  aria-label="Refresh weather"
                  className="cursor-pointer disabled:cursor-wait"
                  disabled={!coordinates || isFetching}
                  onClick={() => refetch()}
                  title="Refresh weather"
                  type="button"
                >
                  <RefreshCw className={isFetching ? 'animate-spin' : ''} size={15} />
                </button>
              </h4>
              <h4 className='text-xl text-center'>
                {getMonthAndDate(weatherData.dt)}
              </h4>
              <div className="flex justify-center gap-2">
                <img src={`https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} className='w-10 h-10 inline-block rounded-full bg-gray-500'/>
                <small className='self-center'>
                  {getWeatherDescription(weatherData.weather[0].description)}
                </small>
              </div>
              <div className="text-center text-[3rem] mt-0">
                {getTempText(weatherData.main.temp)}
              </div>
              <div className="text-center opacity-40 text-xs">
                Feels like {getTempText(weatherData.main.feels_like)}
              </div>
            </>
          )
        }
      </main>
      <Dialog dialogRef={dialogRef}>
        <div className='text-center'>
          <h4 className='pb-2'>Created with</h4>
          <ul className='flex flex-wrap gap-1 justify-center'>
            <li>
              <ExternalLink className='backdrop-bg-pills py-2 px-3 text-sm' href='https://openweathermap.org/api' text='OpenWeather API' />
            </li>
            <li>
              <ExternalLink className='backdrop-bg-pills py-2 px-3 text-sm' href='https://expressjs.com/' text='ExpressJS' />
            </li>
            <li>
              <ExternalLink className='backdrop-bg-pills py-2 px-3 text-sm' href='https://redux-toolkit.js.org/rtk-query/overview' text='RTK Query' />
            </li>
          </ul>
        </div>
      </Dialog>
    </div>
  )
}