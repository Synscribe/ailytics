/**
 * The industries listed on the /industries hub. `slug` names the page in
 * src/content/pages/industries; the hub lists it only once that JSON page exists.
 * Never add retail, food and beverage, or hospitality.
 */
export type HubEntry = {
  slug: string;
  title: string;
  description: string;
};

export const INDUSTRY_GROUPS: { title: string; items: HubEntry[] }[] = [
  {
    title: "Core industries",
    items: [
      {
        slug: "construction",
        title: "Construction",
        description:
          "Machinery, open edges, suspended loads and missing PPE on busy outdoor sites.",
      },
      {
        slug: "manufacturing",
        title: "Manufacturing",
        description:
          "Forklift traffic, restricted zones, PPE and lifting posture in food, chemical and pharma plants.",
      },
      {
        slug: "oil-and-gas",
        title: "Oil and gas",
        description:
          "Smoke and fire, PPE and restricted zones across refineries and terminals.",
      },
      {
        slug: "logistics-and-warehousing",
        title: "Logistics and warehousing",
        description:
          "Forklift and pedestrian traffic, loading bays and crowding in busy warehouses.",
      },
      {
        slug: "ports-and-airports",
        title: "Ports and airports",
        description:
          "Vehicle speed, people near the water's edge and restricted areas across terminals and airside.",
      },
      {
        slug: "data-centers",
        title: "Data centres",
        description:
          "Restricted areas, loitering and unattended objects around critical equipment.",
      },
      {
        slug: "mining",
        title: "Mining",
        description:
          "Heavy vehicles, exclusion zones and PPE in dusty outdoor conditions.",
      },
      {
        slug: "energy-and-utilities",
        title: "Energy and utilities",
        description:
          "Restricted zones, smoke and fire, and PPE at plants and remote sites.",
      },
    ],
  },
  {
    title: "Other industries",
    items: [
      {
        slug: "education",
        title: "Education and campus security",
        description:
          "Restricted areas, loitering and crowding across campus grounds.",
      },
      {
        slug: "healthcare",
        title: "Healthcare",
        description:
          "Restricted areas, crowding and person-down alerts across hospital grounds.",
      },
      {
        slug: "elderly-care",
        title: "Elderly care",
        description:
          "Falls and collapsed residents flagged to staff as they happen.",
      },
      {
        slug: "childcare",
        title: "Childcare",
        description:
          "Restricted areas and water hazards around preschools and play areas.",
      },
      {
        slug: "correctional-facilities",
        title: "Correctional facilities",
        description:
          "Loitering, crowding and restricted-area alerts across the facility.",
      },
      {
        slug: "dormitories",
        title: "Dormitories",
        description:
          "Collapsed-person alerts, crowding and restricted areas in worker housing.",
      },
      {
        slug: "environment-and-animal-counting",
        title: "Environment and animal counting",
        description: "Counts animals and flags changes across outdoor sites.",
      },
    ],
  },
];
