export type GuideSectionId =
  | "type"
  | "colour"
  | "spacing"
  | "buttons"
  | "cards"
  | "icons-motion-imagery"
  | "decisions";

export type GuideSectionEntry = {
  id: GuideSectionId;
  title: string;
  summary: string;
};

export const GUIDE_SECTIONS: readonly GuideSectionEntry[] = [
  {
    id: "type",
    title: "Type",
    summary:
      "Headings, paragraphs and labels in Switzer. Each role has one size, weight and line height.",
  },
  {
    id: "colour",
    title: "Colour",
    summary:
      "Slate for text, teal for actions, and coral and yellow only for live alerts.",
  },
  {
    id: "spacing",
    title: "Spacing",
    summary:
      "The space between sections, headings and content, and the page widths that hold them.",
  },
  {
    id: "buttons",
    title: "Buttons and links",
    summary:
      "Pill buttons for actions, quiet underlined links inside sentences.",
  },
  {
    id: "cards",
    title: "Cards",
    summary: "One white card style with the same corners, border and padding.",
  },
  {
    id: "icons-motion-imagery",
    title: "Icons, motion and imagery",
    summary:
      "Lucide icons, one signature motion per page, and only real Ailytics footage.",
  },
  {
    id: "decisions",
    title: "Decisions",
    summary: "What we chose for each part of the system, when, and why.",
  },
];
