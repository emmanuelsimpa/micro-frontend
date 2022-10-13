import React, { useEffect, useRef } from 'react';
import { mount as marketing } from 'marketing/MarketingApp'

export default function MarketingApp() {
    const ref = useRef(null)

    useEffect(()=> {
        marketing(ref.current)
    })

  return (
    <div ref={ref}/>
  )
}
