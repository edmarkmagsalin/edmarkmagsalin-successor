export const Skills = () => {
  const skillsConfig = [
    {
      heading: 'Front-end',
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'Next.js',
        'SASS',
        'TailwindCSS',
      ],
    },
    {
      heading: 'Back-end',
      skills: [
        'Node.js',
        'Express',
        'PHP',
      ],
    },
    {
      heading: 'AI',
      skills: [
        'Claude',
      ],
    },
  ]
  return (
    <div className='page-container'>
      {
        skillsConfig.map(config => {
          return (
            <div className='flex flex-col'>
              <h2>{config.heading}</h2>
              <ul className='flex flex-wrap gap-2'>
                {
                  config.skills.map(skill => {
                    return (
                      <li className='pills py-1 px-3'>{skill}</li>
                    )
                  })
                }
              </ul>
            </div>
          )
        })
      }
    </div>
  )
}

