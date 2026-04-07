import { fetchPublicApi } from '@/lib/fetchPublicApi';
import FeatureSliderClient from '@/components/feature-slider/FeatureSliderClient';

export default async function FeatureSlider() {
  const result = await fetchPublicApi('/api/features');

  let features = [];
  if (
    result.ok &&
    result.data &&
    typeof result.data === 'object' &&
    Array.isArray(result.data.features)
  ) {
    features = [...result.data.features].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );
  }

  return (
    <FeatureSliderClient
      features={features}
      apiUnavailable={!result.ok}
      apiErrorMessage={result.error}
    />
  );
}
