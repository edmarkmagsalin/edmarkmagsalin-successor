import { ExternalLink } from '@/components'
export const Projects = () => {
  const projectsConfig = [
    {
      title: 'As Per Visual',
      description: 'A simple website of a creative studio company.',
      link: 'https://aspervisual.netlify.app/',
      repo: 'https://github.com/edmarkmagsalin/aspervisual',
      madeUsing: [
        'Next.js',
        'SASS'
      ],
    },
    {
      title: 'GitHub (User) Finder',
      description: 'This application lets you search Github users using the Github API. This project is part of the course React Front To Back that is created by Brad Traversy.',
      link: 'https://edmarkmagsalin-github-user-finder.netlify.app/',
      repo: 'https://github.com/edmarkmagsalin/github-finder',
      madeUsing: [
        'React',
      ],
    },
  ]
  return (
    <>
      {
        projectsConfig.map((config, index) => {
          return (
            <div key={index} className='flex flex-col'>
              <h2>{config.title}</h2>
              <p>{config.description}</p>
              <p>
                <ExternalLink href={config.link} text='Link' /> <ExternalLink href={config.repo} text='Repo' />
              </p>
              <ul className='flex flex-wrap gap-1'>
                {
                  config.madeUsing.map((item, index) => {
                    return (
                      <li key={index} className='pills backdrop-bg py-1 px-1.5 text-xs'>{item}</li>
                    )
                  })
                }
              </ul>
            </div>
          )
        })
      }
    </>
  )
}

