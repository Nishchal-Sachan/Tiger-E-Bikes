import { fetchPublicApi } from '@/lib/fetchPublicApi';
import VehicleShowcaseClient from '@/components/vehicle-showcase/VehicleShowcaseClient';

export default async function VehicleShowcase() {
  const result = await fetchPublicApi('/api/products');

  let products = [];
  if (
    result.ok &&
    result.data &&
    typeof result.data === 'object' &&
    Array.isArray(result.data.products)
  ) {
    products = result.data.products;
  }

  return (
    <VehicleShowcaseClient
      initialProducts={products}
      apiUnavailable={!result.ok}
      apiErrorMessage={result.error}
    />
  );
}
