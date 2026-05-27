import { formatCurrency } from "../../_utils/format";
import { Product } from "../../_utils/action";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import FavoriteToggleButton_14 from "./FavoriteToggleButton_14";
import Link from "next/link";

const ProductsList_14 = ({ products }: { products: Product[] }) => {
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => (
        <Card key={product.id} className="rounded-lg py-0">
          <CardContent className="grid gap-y-4 p-6 sm:grid-cols-3 sm:gap-x-6">
            <div className="relative aspect-square h-48 w-full overflow-hidden rounded-md bg-muted sm:h-full">
              <Link
                href={`/store_14/products_14/${product.id}`}
                className="absolute inset-0 z-10"
              />
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col justify-between gap-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <Link href={`/store_14/products_14/${product.id}`}>
                    <h3 className="text-lg font-medium capitalize hover:underline">
                      {product.name}
                    </h3>
                  </Link>
                  <FavoriteToggleButton_14 productId={product.id} />
                </div>
                <p className="text-sm capitalize text-muted-foreground">
                  {product.company}
                </p>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <p className="text-base font-medium">
                {formatCurrency(product.price)}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default ProductsList_14;
