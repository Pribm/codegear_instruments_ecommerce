import { client, urlFor } from 'lib/client'
import React, { useEffect, useState } from 'react'

import "slick-carousel/slick/slick.css"
import Slider from "react-slick";
import styles from './Brand.module.scss'
import { useRouter } from 'next/router';




const Categories = () => {

  const [brands, setBrands] = useState([])

  const router = useRouter()

  const settings = {
    dots: false,
    arrows: false,
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 100,
    cssEase: "linear",

    accessibility: false,

  };

  useEffect(() => {
    const query = `
    *[_type ==  "vendor"]{
      logo, slug, _id, title
    }
    `

    client.fetch(query).then(data => {
      setBrands(data)
    })
  }, [])

  return (
      <div>
        <hr className='d-none d-md-block'/>
        <h1 className={'text-center mt-5 mb-5 '+styles.h1}>Take a look at our brands 😉</h1>
        <Slider {...settings} className={styles.slider}>
        {
          brands?.map(brand => (
            <div key={brand._id} className={styles.slide}>
              <img src={urlFor(brand.logo)} alt={brand.title+' logo'} onClick={() => router.push(`search?result=${brand.title}`)}/>
            </div>
          ))
        }
      </Slider>

      </div>
  )
}

export default Categories