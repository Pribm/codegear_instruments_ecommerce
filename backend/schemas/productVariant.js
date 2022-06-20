export default {
  title: 'Product variant',
  name: 'productVariant',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Weight in grams',
      name: 'grams',
      type: 'number',
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number',
    },
    {
      title: 'SKU',
      name: 'sku',
      type: 'string',
    },
    {
      title: 'Taxable',
      name: 'taxable',
      type: 'boolean',
    },
    {
      title: 'Promotional Image',
      name: 'promotionalImage',
      type: 'image'
    },
    {
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [
        {
          type: 'reference',
          to:[{type: 'productDetail'}]
        }
      ]
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      title: 'Bar code',
      name: 'barcode',
      type: 'barcode',
    },
  ],
}
