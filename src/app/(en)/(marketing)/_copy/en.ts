/**
 * Homepage copy. Translations live beside this file and must match its
 * shape; lists must keep the same length and order. After editing, update
 * each translation and run `pnpm i18n --stamp home`.
 */
export const en = {
  metadata: {
    title: "AI Video Analytics for Construction & Heavy Industries",
    description:
      "AI video analytics for construction & heavy industries. Ailytics turns your existing CCTV into real-time safety, security and productivity alerts.",
  },
  hero: {
    title: "AI video monitoring for construction & heavy industries",
    headline: "Safety & Productivity Monitoring:",
    highlight: "See What Matters",
    lead: "Ailytics connects to the cameras you already own and alerts your EHS and site teams to PPE breaches, exclusion-zone entries, near misses and struck-by risk the moment they happen. Live in under 2 weeks on construction sites, plants, ports and yards, with no rip-and-replace.",
    primaryCta: "Request a demo",
    secondaryCta: "See all use cases",
  },
  heroWall: {
    categories: {
      safety: "Safety",
      security: "Security",
      productivity: "Productivity",
    },
    legendLabel: "Show alerts by category",
    live: "Live",
    /** One label per camera tile, in tile order. */
    cams: [
      "Cam 01 · Tower A",
      "Cam 02 · Tower A",
      "Cam 03 · Plant 2",
      "Cam 04 · Yard",
      "Cam 05 · Tower A",
      "Cam 06 · Generator yard",
      "Cam 07 · Plant 2",
      "Cam 08 · Tower B",
      "Cam 09 · Tower B",
      "Cam 10 · Gate",
      "Cam 11 · Plant 2",
      "Cam 12 · Dock",
    ],
    /** One entry per alert, in the order the wall plays them. */
    events: [
      { tag: "1.8 m from excavator", text: "Worker too close to excavator" },
      { tag: "Open edge", text: "Worker near an open edge" },
      {
        tag: "Restricted area · 23:14",
        text: "After-hours restricted-area entry",
      },
      { tag: "Wrong way", text: "Wrong-way vehicle at gate" },
      { tag: "Smoke", text: "Smoke in generator yard" },
      { tag: "Idle 2 h 10 m", text: "Piling rig idle since 07:40" },
      { tag: "14 on shift", text: "14 workers on shift at dock" },
      { tag: "Reversing", text: "Person behind reversing truck" },
      { tag: "Suspended load", text: "Worker under suspended load" },
      { tag: "No hard hat", text: "Missing hard hat in low light" },
    ],
  },
  problem: {
    label: "The problem",
    statements: [
      "Sites run dozens of cameras. Nobody can watch them all.",
      "Walkarounds see one moment of one shift.",
      "Footage gets checked after something goes wrong.",
    ],
    payoff:
      "With Ailytics, every camera is watched all shift, and your team is alerted while there's still time to act, not after the accident report.",
    solvedLabel:
      "Illustration: Ailytics watches all 12 cameras, covers every hour of the shift and sends the alert as the incident happens.",
    unsolvedLabel:
      "Illustration: one operator watches 2 of 12 cameras while hazards on 3 others are missed, walkarounds cover two moments of the shift, and the incident is found in the footage afterwards.",
    missed: "Missed",
    walkarounds: "Walkarounds",
    everyHour: "Every hour covered",
    foundAfter: "Found after the incident",
    alertSent: "Alert sent as it happened",
    operator: "1 operator watching 2 of 12 cameras",
    allCameras: "Ailytics on all 12 cameras",
    illustration: "Illustration",
  },
  depth: {
    kicker: "How it works",
    title: "Understand depth from a single camera",
    steps: [
      {
        title: "A camera you already own",
        body: "One of the CCTV feeds the site already has. No new cameras or sensors, and usually nobody watching it.",
      },
      {
        title: "Spot the people and the load",
        body: "Ailytics finds the workers and the suspended load in every frame.",
      },
      {
        title: "Work out depth from one camera",
        body: "From that single camera it rebuilds the ground in 3D. No LiDAR, radar or second camera.",
      },
      {
        title: "Project the drop zone",
        body: "It marks where the load would land if it fell, as a live exclusion zone on the ground.",
      },
      {
        title: "Measure real distance",
        body: "It measures how far each worker is from the zone in metres and alerts the lifting supervisor the moment someone steps inside.",
      },
    ],
    frameAlt:
      "Construction site camera view: a formwork panel is lifted by crane while two workers guide it with tag lines.",
    camChip: "Cam 14 · a camera the site already has",
    load: "Suspended load",
    workers: "Workers",
    dropZone: "Projected drop zone",
    measure: "3.4 m from drop zone · safe",
    alertTitle: "Lift in progress · Cam 14",
    alertBody: "2 workers outside the drop zone. No alert sent.",
  },
  features: {
    title: "Why EHS and site safety teams choose Ailytics",
    lead: "Accurate on live sites, and simple to run across every project you manage.",
    cta: "Request a demo",
    items: {
      "real-3d-distance": {
        title: "Real 3D distance from one camera",
        body: "Measures how close workers are to plant, vehicles and lifted loads in real metres, from a single CCTV camera. No LiDAR or radar.",
        link: "How 3D distance works",
      },
      "harsh-conditions": {
        title: "Accurate in rain, dust and low light",
        body: "Built for live outdoor sites: night shifts, rain, dust and long-range cameras, with 85–99% detection accuracy in the field.",
      },
      "ask-your-cameras": {
        title: "Search footage in plain language",
        body: "Ask about smoke, idle machinery or unauthorized entry and get the matching clips with camera and time. Powered by Ailytics’ vision language model.",
      },
      "every-site": {
        title: "Multi-site safety dashboard",
        body: "Site supervisors get alerts on their phones. EHS managers compare PPE compliance and open alerts across every project on one screen.",
      },
      "set-up-your-way": {
        title: "Rules that match your site",
        body: "Draw exclusion zones, set grace periods and alert cooldowns, and combine detections into your own rules to cut false alerts.",
      },
    } as Record<
      | "real-3d-distance"
      | "harsh-conditions"
      | "ask-your-cameras"
      | "every-site"
      | "set-up-your-way",
      { title: string; body: string; link?: string }
    >,
  },
  visuals: {
    depth: {
      alt: "Site camera view of a crane lifting a formwork panel, with the projected drop zone marked on the ground.",
      dropZone: "Projected drop zone",
      inside: "Inside drop zone · alert",
      /** `{metres}` is the distance, such as 2.4. */
      distance: "{metres} m from drop zone",
      hint: "Try it: move over the ground",
    },
    harsh: {
      dayAlt:
        "Daylight camera view of an excavator and workers on a construction site.",
      nightAlt:
        "Night camera view of a site with a worker detected in low light.",
      day: "Daylight",
      night: "Night shift",
      hint: "Try it: move across",
    },
    ask: {
      /** One entry per suggested question, in the order they play. */
      questions: [
        {
          chip: "Smoke or fire",
          question: "Any smoke or fire near the generators today?",
          answer:
            "Yes, once. Smoke in the generator yard at 14:05. The alert went to the duty supervisor.",
          verdict: "Non-compliant · 1 issue",
          issue: "Fire hazard (High)",
          finding:
            "Smoke is rising above the roofline beside the generator yard.",
          fix: "Send the fire warden to check the source and keep people clear until it is confirmed safe.",
        },
        {
          chip: "Idle machinery",
          question: "Which machines sat idle for over an hour this morning?",
          answer: "One excavator in Zone C, idle from 07:40 to 09:55.",
          verdict: "Needs attention · 1 issue",
          issue: "Idle machinery (Medium)",
          finding:
            "The excavator stayed parked with no work cycles for 2 h 15 min.",
          fix: "Reassign it to another zone, or return it to cut hire and fuel costs.",
        },
        {
          chip: "Unauthorized entry",
          question: "Did anyone enter a restricted area after hours?",
          answer: "Yes. One person at the substation gate at 23:14.",
          verdict: "Non-compliant · 1 issue",
          issue: "Unauthorized entry (High)",
          finding:
            "A worker is opening the barrier past a STOP sign into a zone with an active excavator, outside permitted hours.",
          fix: "Lock the barrier after hours and confirm the worker's access permit with the site supervisor.",
        },
      ],
      rectification: "Rectification:",
      hint: "Try it: pick a question",
    },
    setup: {
      alt: "Yard camera view with an exclusion zone drawn behind a reversing vehicle.",
      zone: "Exclusion zone",
      on: "On",
      grace: "Grace period",
      /** `{seconds}` is the slider value. */
      graceValue: "{seconds} s",
      cooldown: "Alert cooldown",
      cooldownValue: "5 min",
      hint: "Try it: drag the slider",
    },
  },
  useCases: {
    title: "AI video analytics use cases for every hazard on site",
    lead: "Switch on the detections each camera needs, from PPE and exclusion zones to idle machinery. 50+ ready to configure.",
    cta: "See all use cases",
    items: {
      "ppe-detection": {
        title: "PPE detection",
        body: "Missing hard hats, vests and gloves, flagged in each work area.",
      },
      "machinery-proximity": {
        title: "Machinery proximity",
        body: "Real distance between workers and moving plant, from one camera.",
      },
      "under-load-detection": {
        title: "Under suspended loads",
        body: "Workers inside the drop zone of a lift, flagged for the lifting supervisor.",
      },
      "fire-smoke-detection": {
        title: "Smoke and fire",
        body: "Early smoke and flame detection, so teams can respond quickly.",
      },
      "no-access-zones": {
        title: "Restricted areas",
        body: "Unauthorized entry into barricaded or after-hours zones.",
      },
      "open-edge-detection": {
        title: "Open edges",
        body: "Workers near unguarded edges and openings, flagged before a fall.",
      },
    } as Record<
      | "ppe-detection"
      | "machinery-proximity"
      | "under-load-detection"
      | "fire-smoke-detection"
      | "no-access-zones"
      | "open-edge-detection",
      { title: string; body: string }
    >,
  },
  industries: {
    title: "Built for heavy industry and critical infrastructure",
    lead: "Find your industry and the hazards Ailytics watches for on sites like yours.",
    cta: "See all industries",
    more: "and more",
    items: {
      construction: {
        label: "Construction",
        hazards: "Struck-by machinery, suspended loads, open edges, PPE",
      },
      manufacturing: {
        label: "Manufacturing",
        hazards: "Machine areas, forklifts, PPE, smoke and fire",
      },
      "oil-and-gas": {
        label: "Oil and gas",
        hazards: "Exclusion zones, PPE, smoke and fire",
      },
      logistics: {
        label: "Logistics and warehousing",
        hazards: "Forklifts, reversing vehicles, restricted areas",
      },
      "ports-and-airports": {
        label: "Ports and airports",
        hazards: "Lifting, quayside and airside vehicles, restricted areas",
      },
      "data-centers": {
        label: "Data centers",
        hazards: "Restricted areas, contractor safety, smoke and fire",
      },
    } as Record<
      | "construction"
      | "manufacturing"
      | "oil-and-gas"
      | "logistics"
      | "ports-and-airports"
      | "data-centers",
      { label: string; hazards: string }
    >,
  },
  capabilities: {
    title: "Built for EHS reporting, compliance and IT",
    items: {
      "real-time-alerts": {
        title: "Real-time alerts",
        body: "Each alert carries the event frame, time and location, and goes straight to the supervisor's phone and dashboard.",
      },
      "unlimited-reporting": {
        title: "Compliance reporting",
        body: "Automated weekly reports show alert trends by site, zone and hazard, ready for safety meetings and audits.",
      },
      "multi-site-dashboard": {
        title: "Multi-site view",
        body: "Every project and plant on one map, with open alerts and trends for each site.",
      },
      "edge-engine": {
        title: "Deployment that meets data-residency rules",
        body: "Run detection on the edge, on-premise or in the cloud, with regional hosting so video stays where your policies require.",
      },
      "custom-use-cases": {
        title: "Custom scenarios, two ways",
        body: "Build your own custom use case, or describe the scenario in plain language and let the vision language model check for it.",
      },
      "hardware-agnostic": {
        title: "Works with the cameras you own",
        body: "Any IP camera from 2MP up, connected over RTSP. No new hardware.",
      },
    } as Record<
      | "real-time-alerts"
      | "unlimited-reporting"
      | "multi-site-dashboard"
      | "edge-engine"
      | "custom-use-cases"
      | "hardware-agnostic",
      { title: string; body: string }
    >,
  },
  cases: {
    title: "Safety results on live projects",
    cta: "Request a demo",
    items: {
      construction: {
        industry: "Construction",
        claim: "fewer non-compliances on a construction site in 16 months",
        alt: "Camera view over a building under construction, with workers on an upper floor.",
      },
      manufacturing: {
        industry: "Manufacturing",
        claim: "fewer non-compliances at a manufacturing site",
        alt: "Camera view of workers in high-visibility clothing on a factory floor.",
      },
    } as Record<
      "construction" | "manufacturing",
      { industry: string; claim: string; alt: string }
    >,
  },
  trust: {
    title: "Your footage stays under your control",
    lead: "Choose where video is processed and stored, and keep the people on camera private.",
    items: {
      iso: {
        title: "ISO/IEC 27001 certified",
        body: "Independently audited information security.",
      },
      hosting: {
        title: "On-premise or cloud",
        body: "Run on-premise and video stays on your network.",
      },
      privacy: {
        title: "Privacy blurring",
        body: "Blur faces or full bodies so workers stay anonymous.",
      },
    } as Record<"iso" | "hosting" | "privacy", { title: string; body: string }>,
  },
  faq: {
    title: "Common questions",
    lead: "The questions safety, operations and IT teams ask before a demo.",
    items: [
      {
        question: "Do I need new cameras?",
        answer:
          "No. Ailytics works with the IP cameras you already have (2MP and up), connected over RTSP.",
      },
      {
        question: "Where is my video processed and stored?",
        answer:
          "On the edge, on your own servers or in the cloud. You choose. With on-premise deployment, video stays on your network. Ailytics is ISO/IEC 27001 certified.",
      },
      {
        question: "Does it work outdoors, at night and in bad weather?",
        answer:
          "Yes. The models are built for outdoor sites with poor lighting, rain, dust and vibration, and for long-range, small-object detection.",
      },
      {
        question: "What does “2D to 3D from one camera” mean?",
        answer:
          "Ailytics works out depth from a single standard camera, with no lidar, radar or second camera. That lets it measure real distance between people and machinery, and project where a lifted load would fall.",
      },
      {
        question: "How accurate is it?",
        answer:
          "Up to 99% detection accuracy in the field, depending on the scenario. Each use case can be tuned to your site.",
      },
      {
        question: "How long does it take to go live?",
        answer: "Under 2 weeks on the cameras you already have.",
      },
      {
        question:
          "Does it replace our EHS software or video management system?",
        answer:
          "No. Ailytics adds AI detection to your cameras and sends its alerts and reports to the systems you already use (your VMS and EHS platform).",
      },
      {
        question: "Can we choose which hazards to detect?",
        answer:
          "Yes. Pick from 50+ use cases and set each one’s zones, grace period and alert cooldown to match your site rules.",
      },
    ],
  },
  closing: {
    title: "See Ailytics on a site like yours",
    description:
      "Book a demo and we’ll show you how Ailytics would work on your cameras.",
    button: "Request a demo",
  },
};

export type HomeCopy = typeof en;
