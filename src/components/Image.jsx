import React from 'react'
import { IKImage } from 'imagekitio-react'

function Image({src, className, w, h, alt}) {
  return (
            <IKImage
                urlEndpoint={import.meta.env.VITE_urlEndpoint}
                // path="/logo.png" 
                path={src}
                className={className} 
                alt={alt} 
                loading='lazy'
                lqip={{ active: true, quality: 20}}
                width={w}
                h={h}
            />
  )
}

export default Image