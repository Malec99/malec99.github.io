import TeamDetailClient from "./team-detail-client";

export function generateStaticParams() {
  // Generate static params for teams 1-8
  return Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TeamDetailClient id={id} />;
}
