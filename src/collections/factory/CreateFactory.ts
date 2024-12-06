import { Factory } from './Factory'
import { Product } from './Product'

interface CreateFactory {
  name: string
  shipsTo?: string[]
  portsFrom?: string[]
  factory: Omit<Factory, 'slug' | 'shipsTo' | 'portsFrom' | 'products'>
  product: Omit<Product, 'slug' | 'shipsTo' | 'portsFrom' | 'factory'>
}

const genFactoryName = (name: string) => {
  return name + 'Factory'
}

const genProductName = (name: string) => {
  return name + 'Products'
}

export const CreateFactory = ({
  name,
  factory,
  product,
  shipsTo = [],
  portsFrom = [],
}: CreateFactory) => {
  const factoryName = genFactoryName(name)
  const productName = genProductName(name)

  return [
    Factory({
      ...factory,
      slug: factoryName,
      products: productName,
      shipsTo: shipsTo.map(genFactoryName),
      portsFrom: portsFrom.map(genFactoryName),
    }),
    Product({
      ...product,
      slug: productName,
      factory: factoryName,
      shipsTo: shipsTo.map(genProductName),
      portsFrom: portsFrom.map(genProductName),
      portsFromFactories: portsFrom.map(genFactoryName),
    }),
  ]
}
