import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import KofiSupportWidget from './components/KofiSupportWidget'

export default function App() {
  return (
    <>
      <KofiSupportWidget />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}
