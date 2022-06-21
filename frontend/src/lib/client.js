import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'products',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    apiVersion: '2022-06-12',
    useCdn: true,
    useProjectHostname: true
})

export const builder = imageUrlBuilder(client)

const urlFor = src => builder.image(src)

export {client, urlFor}