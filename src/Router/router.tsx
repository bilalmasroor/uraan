import { Routes, Route, Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/footer'
import Home from '../pages/Home'
import Aboutus from '../pages/Aboutus'
import ReachOutModalPreview from '../components/form'

function RootLayout() {
  return (
    <>
<Header />
<Outlet />
<Footer />
<ReachOutModalPreview />
    </>
  )
}

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Aboutus />} />
        <Route path="contact" element={<ReachOutModalPreview />} />
      </Route>
    </Routes>
  )
}

