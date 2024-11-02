import React from 'react'

function Logo({width = '100px',className = ''}) {
  return (
    <img src="\public\blogVillaLogo.jpg" alt="logo" className={`h-10 w-10 ${className}`} />
  )
}

export default Logo
