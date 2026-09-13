export const Devices = () => {
  const devicesConfig = [
    {
      name: 'MacBook Pro',
      description: '13-inch, M1, 2020',
    },
    {
      name: 'Magic Mouse',
      description: 'White Multi-Touch Surface',
    },
    {
      name: 'iPhone 17 Pro Max',
    },
  ]
  return (
    <>
      {
        devicesConfig.map((config, index) => {
          return (
            <div key={index} className='flex flex-col'>
              <h2>{config.name}</h2>
              {config.description && <small>{config.description}</small>}
            </div>
          )
        })
      }
    </>
  )
}

