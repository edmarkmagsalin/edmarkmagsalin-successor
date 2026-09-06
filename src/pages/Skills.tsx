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
        'AWS',
        'Node.js',
        'Python',
        'Express',
        'PHP',
      ],
    },
    {
      heading: 'AI',
      skills: [
        'Claude',
        'Groq',
        'GitHub Copilot',
      ],
    },
  ]
  return (
    <div className='page-container'>
      {
        skillsConfig.map((config, index) => {
          return (
            <div key={index} className='flex flex-col'>
              <h2>{config.heading}</h2>
              <ul className='flex flex-wrap gap-2'>
                {
                  config.skills.map((skill, index) => {
                    return (
                      <li key={index} className='pills backdrop-bg py-1 px-3'>{skill}</li>
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

