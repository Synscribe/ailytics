import { notFound } from "next/navigation";

import { ProjectVisual } from "@/components/visuals/project-visual";
import { VISUAL_IDS, type VisualId } from "@/lib/visuals";

type SingleVisualPageProps = {
  params: Promise<{ id: string }>;
};

/** One visual alone on the page, for review and screen recording. */
export default async function SingleVisualPage({
  params,
}: SingleVisualPageProps) {
  const { id } = await params;
  if (!(VISUAL_IDS as readonly string[]).includes(id)) notFound();

  return (
    <main
      className="fixed inset-0 z-[100] grid place-items-center overflow-auto bg-canvas p-8"
      id="main-content"
    >
      <div className="w-[720px] max-w-full">
        <ProjectVisual id={id as VisualId} priority />
      </div>
    </main>
  );
}
