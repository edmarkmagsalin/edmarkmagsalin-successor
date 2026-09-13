import { BrowserRouter, Route, Routes } from "react-router"
import { ThemeToggle, Navigation } from '@/components'
import { Me, Apps, Skills, Projects, Devices } from '@/pages'

function App() {
  return (
    <BrowserRouter>
      <div className='container mx-auto border-0 px-2 flex flex-col overflow-hidden h-[calc(100dvh-70px)] items-center justify-center'>
        <div className="flex gap-4 items-center justify-center p-2 w-full">
          <div className="page-container">
            <Routes>
              <Route path='/' element={<Me />} />
              <Route path='/skills' element={<Skills />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/devices' element={<Devices />} />
              <Route path='/apps' element={<Apps />} />
            </Routes>
          </div>
        </div>

        <div className="fixed bottom-5 left-1/2 min-h-10 -translate-x-1/2 -translate-y-1 gap-4 justify-center">
          <div className="flex gap-4">
            <div className="control-center backdrop-bg">
              <Navigation />
            </div>
            <div className="control-center backdrop-bg">
              <ThemeToggle />
            </div>
          </div>
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App;
