export interface OpenFarmCrop {
  name: string;
  description: string | null;
  sun_requirements: string | null;
  sowing_method: string | null;
  spread: number | null;
  row_spacing: number | null;
  height: number | null;
  main_image_path: string | null;
}

const CROP_QUERIES: Record<string, string> = {
  mandioca: "cassava",
  acai: "acai",
  milho: "corn",
  cupuacu: "cupuacu",
  cacau: "cacao",
  "pimenta-do-reino": "black pepper",
};

export async function fetchOpenFarmCrop(cropId: string): Promise<OpenFarmCrop | null> {
  const query = CROP_QUERIES[cropId];
  if (!query) return null;

  const url = `https://openfarm.cc/api/v1/crops?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } });
    if (!response.ok) return null;

    const data = await response.json();
    const crops: { attributes: OpenFarmCrop }[] = data?.data;
    if (!crops?.length) return null;

    const best =
      crops.find((c) =>
        c.attributes.name.toLowerCase().includes(query.toLowerCase())
      ) ?? crops[0];

    return best.attributes;
  } catch {
    return null;
  }
}

export async function fetchAllOpenFarmCrops(
  cropIds: string[]
): Promise<Record<string, OpenFarmCrop | null>> {
  const entries = await Promise.allSettled(
    cropIds.map((id) => fetchOpenFarmCrop(id).then((data) => [id, data] as const))
  );

  return Object.fromEntries(
    entries
      .filter((r): r is PromiseFulfilledResult<readonly [string, OpenFarmCrop | null]> => r.status === "fulfilled")
      .map((r) => r.value)
  );
}
