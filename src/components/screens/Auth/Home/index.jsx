import React from 'react'
import { isMobile } from 'react-device-detect'

import MobileHome from './Mobile'
import DesktopHome from './Desktop'

const Home = () => (isMobile ? <MobileHome /> : <DesktopHome />)

export default Home
