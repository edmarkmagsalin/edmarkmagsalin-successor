export const Devices = () => {
  const devicesConfig = [
    {
      name: 'MacBook Pro',
      description: '13-inch, M1, 2020',
    },
    {
      name: 'iPhone 17 Pro Max',
      description: '256GB Silver',
    },
  ]
  return (
    <div className='page-container'>
      {
        devicesConfig.map((config, index) => {
          return (
            <div key={index} className='flex flex-col'>
              <h2>{config.name}</h2>
              <small>{config.description}</small>
            </div>
          )
        })
      }
    </div>
  )
}

