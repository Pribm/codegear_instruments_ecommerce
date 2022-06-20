import { client } from 'lib/client';
import Stripe from 'stripe'




const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY)

export default async function handler(req, res) {
  
  if (req.method === 'POST') {
    try {

      const query = `
  *[_type == "product" && _id in $cart.id]{
    "products": [defaultProductVariant, ...variants][sku in $cart.sku]{
     "price_data": {
        "currency": "brl",
        "product_data": {
          "name": ^.title + ' ' + title,
        },
        "unit_amount": price*100,
      },
      "quantity": 1,
      "discount": ^.discount,
      "adjustable_quantity":  {
        "enabled": true,
        "minimum": 1,
      },
  },
  }.products[]
  `


      let products = await client.fetch(query, {
        cart: req.body
      })

      products = products.map(({discount, ...product}, index) => {
        product.price_data.product_data.images = [req.body[index].image.replace('-jpg', '.jpg').replace('image-', 'https://cdn.sanity.io/images/'+process.env.NEXT_PUBLIC_SANITY_PROJECT_ID+'/products/')]
        product.quantity = req.body[index].quantity
        product.price_data.unit_amount = discount ? parseInt(product.price_data.unit_amount - (product.price_data.unit_amount * discount * 0.01)) : parseInt(product.price_data.unit_amount)
        return product
      })

      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        line_items: products,
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      res.status(200).json(session);

    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}