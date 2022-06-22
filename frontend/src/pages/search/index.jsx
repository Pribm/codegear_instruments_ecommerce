import { Layout } from '../../components'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from 'lib/client'
import { useStateContext } from 'context/StateContext'
import HorizontalCard from 'components/Cards/HorizontalCard'
import { Spinner } from 'react-bootstrap'



const SearchPage = () => {

    const { isSearching, setSearching } = useStateContext()

    const [productList, setProductList] = useState([])

    const router = useRouter()


    useEffect(() => {
        const slug = router.query.result
        setSearching(true)

        const query =
        `*[_type == "product"
        && slug.current match "*${slug}*"
        || variants[].title match "*${slug}*"
        || categories[]->slug.current match "*${slug}*"
        || defaultProductVariant.details[]->detail match "*${slug}*"
        || variants[].details[]->detail match "*${slug}*"
        || categories[]->parents[]->slug.current match "*${slug}*"]{
            "products": [defaultProductVariant, ...variants]{
                ...,
          "mainName": ^.title,
          "blurb" : ^.blurb,
          "_id" : ^._id,
          "slug": ^.slug.current,
          "discount": ^.discount,
          "details":[details[]->][0]
            },
        }`

        client.fetch(query).then(data => {
            let result = []
            data.forEach(d => {
                d.products.forEach(product => {
                    result.push(product)
                })
            })
            setProductList(result)
            setSearching(false)
        })

    }, [router.query.result])


    return (
        <Layout>
            <div className="container-fluid bg-light min-vh-100">
                <div className="container pt-5">
                    {isSearching ?
                        <div className="card p-5">
                            <div className="d-flex">
                                <Spinner animation="border" role="status" size='lg'>
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                <span className='ms-2'>Loading...</span>
                            </div>
                        </div>
                        :

                        productList?.length > 0 ?
                            productList?.map((product, index) => {
                                return (
                                    <HorizontalCard product={product} key={product.sku} />
                                )
                            })
                            :
                            <div className='card p-4'>
                                <div className='text-center display-2 mb-4'>
                                🎸🎹🎚️🧑‍🎤
                                </div>
                                <h3 className='text-center m-0 p-0'>Sorry, but we Still Haven&#39;t Found What you&#39;re Looking For...</h3>
                            </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default SearchPage