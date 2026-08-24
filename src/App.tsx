import { BrowserRouter, Route, Routes } from "react-router"
import { ThemeToggle, Navigation } from '@/components'
import { Me, WebApps, Skills, Projects } from '@/pages'

function App() {
  return (
    <BrowserRouter>
      <div className='container py-6 mx-auto border-0 px-2 flex flex-col min-h-screen'>

        <div className="grow flex gap-4 items-center justify-center mb-10 p-4">
          <Routes>
            <Route path='/' element={<Me />} />
            <Route path='/skills' element={<Skills />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/webapps' element={<WebApps />} />
          </Routes>
        </div>

        <div className="fixed bottom-5 left-1/2 min-h-10 -translate-x-1/2 -translate-y-1 gap-4 justify-center items-bottom">
          <div className="flex gap-4">
            <div className="flex justify-center rounded-full backdrop-blur-md bg-white/20 p-2 px-4">
            <Navigation />
          </div>
          <div className="flex justify-center rounded-full backdrop-blur-md bg-white/20 p-2 px-4">
            <ThemeToggle />
          </div>
          </div>
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App;
