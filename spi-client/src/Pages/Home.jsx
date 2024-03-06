import React from 'react'

import Footer from '../Component/Footer/Footer'
import Index from '../Component/Index/Index'
import Contact from '../Component/Contact/Contact'
import About from '../Component/About/About'

function Home() {
  return (
    <div>
      
      <Index/>
      <About/>
      <Contact />
      <Footer/>
    </div>
  )
}

export default Home
