import React from "react";

import Image from "next/image";
import {builder} from './client'

export default function MyImage({
    quality = 80,
    blur = 0,
    src,
    ...props
}){
    const baseURL = 'https://cdn.sanity.io/images/';

    return (
        <Image
        {...props}
        loader={({ width: srcWidth }) => {
          let url =
          builder
              .image(src)
              .width(props.sanityWidth)
              .height(Number(props.sanityHeight) || 256)
              .auto('format')
              .quality(quality)
                
              .url() ?? '';
  
          if (blur) {
            url += `&blur=${blur}`;
          }
  
          return url;
        }}
        src={builder.image(src).url()?.toString().replace(baseURL, '') ?? ''} />
    )
}