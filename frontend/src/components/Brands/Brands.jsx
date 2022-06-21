import { client, nextImageData, urlFor } from 'lib/client'
import React, { useEffect, useState } from 'react'

import "slick-carousel/slick/slick.css"
import Slider from "react-slick";
import styles from './Brand.module.scss'
import { useRouter } from 'next/router';

import MyImage from 'lib/SanityImageBuilder';


const Categories = () => {

  const [brands, setBrands] = useState([])
  const [isLoading, setLoading] = useState(true)

  const route  = useRouter()

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
      setLoading(false)
    })
  }, [])

  return (
      !isLoading &&
      <div>
        <hr className='d-none d-md-block'/>
        <h1 className={'text-center mt-5 mb-5 '+styles.h1}>Search your product by the brand 😉</h1>
          <Slider {...settings} className={styles.slider}>
          {
            brands?.map(brand => {
              return (
              <div key={brand._id} className={styles.slide} onClick={() => route.replace({
                pathname: '/search',
                query: {
                  result: brand.title
                }
              })}>
                <MyImage src={brand.logo} width={250} height={'400'} alt={brand.title+' logo'}/>
              </div>
            )})
          }
        </Slider>
      </div>
  )
}

export default Categories