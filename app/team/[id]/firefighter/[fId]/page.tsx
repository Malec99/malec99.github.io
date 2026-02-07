import FirefighterDetailClient from "./firefighter-detail-client";

export function generateStaticParams() {
  // Generate static params for teams 1-8 and firefighters A/B
  const params = [];
  for (let teamId = 1; teamId <= 8; teamId++) {
    params.push({ id: String(teamId), fId: "0" }); // A
    params.push({ id: String(teamId), fId: "1" }); // B
  }
  return params;
}

export default async function FirefighterDetailPage({
  params,
}: {
  params: Promise<{ id: string; fId: string }>;
}) {
  const { id, fId } = await params;
  return <FirefighterDetailClient teamId={id} firefighterId={fId} />;
}
