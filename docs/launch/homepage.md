# Ailytics homepage (draft for kickoff, 14 Oct)

This merges the team's homepage draft with the decisions already made:

- Navigation from the 13 Oct meeting
- Stats only from `docs/research/ailytics/claims-ledger.md`
- No em dashes, no filler copy
- The two selling points shown as their own sections

Every claim has a source next to it. Anything marked `TODO_CLIENT_*` stays out of the build until the client confirms it.

Visual direction is still open: all dark, or light with dark "camera" panels (see the canvas).

## Metadata

| Field            | Copy                                                                                                                                                 | Notes                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Title            | `AI Video Analytics for Construction & Heavy Industries \| Ailytics`                                                                                 | 65 characters, keyword first                                                              |
| Meta description | `AI video analytics for construction & heavy industries. Ailytics turns your existing CCTV into real-time safety, security and productivity alerts.` | 146 characters                                                                            |
| H1               | `AI video monitoring for construction & heavy industries`                                                                                            | Compact heading above the display line. "Monitoring" is allowed; "surveillance" stays out |

"AI video surveillance" stays out of the H1. The onboarding call says it attracts retail and F&B enquiries. "Monitoring" can appear in body copy and the FAQ.

## Section order

| #   | Section                  | Purpose                                                   |
| --- | ------------------------ | --------------------------------------------------------- |
| 1   | Navigation               | Use cases, Industries, Blog, Case studies, Request a demo |
| 2   | Hero                     | What Ailytics does, at a glance                           |
| 3   | Customer logos           | Instant credibility                                       |
| 4   | The problem              | Why cameras alone don't keep people safe                  |
| 5   | How it works             | Connect, detect, alert                                    |
| 6   | 2D to 3D from one camera | Main technical difference                                 |
| 7   | Ask your cameras         | Future-facing feature (vision language AI)                |
| 8   | Use cases                | Links into use-case pages                                 |
| 9   | Industries               | Links into industry pages                                 |
| 10  | Results                  | Sourced numbers                                           |
| 11  | Security and privacy     | Trust for US, UK and AU buyers                            |
| 12  | FAQ                      | Objections, FAQPage schema                                |
| 13  | Final CTA                | Request a demo                                            |
| 14  | Footer                   | Company links, legal                                      |

Left out for launch:

- **Testimonials:** no approved quotes yet.
- **Case-study teaser:** case studies stay off the homepage until approved (13 Oct meeting).
- **Use-case category tabs:** not MVP.
- **Language switch:** comes after the month-3 localisation work.
- **Product menu:** skipped for now.

## 1. Navigation

```
[Logo]   Use cases ▾   Industries ▾   Case studies   Blog        [Request a demo]
```

- **Use cases ▾:** the 8 launch use cases plus "All use cases"
- **Industries ▾:**
  - Core industries: Construction, Manufacturing, Oil and gas, Logistics and warehousing, Ports and maritime, Airports
  - Other industries: tier 2 pages when built. ChildSafe Vision (`/childsafe-vision`) sits here under childcare.
- **Blog:** blog and news

About us, Partner with us, Projects and Careers move to the footer.

## 2. Hero

- **Eyebrow pill:** `New: ask your cameras questions in plain English →` (links to section 7)
- **H1:** AI video monitoring for construction & heavy industries
- **Display line:** Safety & Productivity Monitoring: See What Matters
- **Subhead (38 words):** Ailytics watches the cameras you already own and alerts your team to safety, security and productivity risks as they happen. Built for construction sites, plants, ports and yards. Runs on the edge, on-premise or in the cloud.
- **Buttons:** `Request a demo` · `See use cases`
- **Visual:** the camera wall catching hazards on its own, using client clips from `public/media/ailytics/`
- **Proof chips:**

| Chip                       | Source                                                        |
| -------------------------- | ------------------------------------------------------------- |
| 400+ projects worldwide    | Ledger #9 (NVIDIA Cosmos news post, case studies p2, deck S6) |
| 50+ configurable use cases | Ledger #11 (live homepage, brochure p2)                       |
| Live in under 2 weeks      | Ledger safe #5 (brochure p1, deck S3)                         |
| ISO/IEC 27001 certified    | Ledger #28 (live site, deck S7, S27)                          |

Dropped from the team draft: 73% TRIR (unsourced, ledger #1), 84% (ledger #2), 15 countries (four conflicting counts, ledger #10).

## 3. Customer logos

**Heading:** `Trusted on sites and facilities in TODO_CLIENT_COUNTRY_COUNT countries`

Until the country count is confirmed, use `Trusted by teams across construction, manufacturing, logistics and aviation`.

Logos (public on the live site **and** on the client's approved list, ledger customer table):

Changi Airport Group · DHL · Laing O'Rourke · LTA · NatSteel · Obayashi · Rogers-O'Brien Construction · Woh Hup

Removed from the team draft: Sime Darby and PaxOcean. They are on the live site but not on the approved list.

Logo files are not in the asset pack. Pull them from the live site or ask the client.

## 4. The problem

- **H2:** Your cameras record everything. No one can watch it all.
- **Body:** Most sites have dozens or hundreds of cameras, and footage is usually reviewed after something goes wrong. Manual inspections only cover one moment of one shift. Ailytics checks every camera, day and night, and alerts the right person while there is still time to act.

Proof to show beside it (case studies, ledger #16):

> One customer cut the time spent watching CCTV from 20 hours a week to 4.

That figure is from Case Study 2 (CS p10). Show it only once the client approves publishing case-study figures without a name.

The team draft's figures (98% of projects late, $1M per fatality, "6 screens") are dropped. None of our sources contain them.

## 5. How it works

**H2:** How Ailytics works with the cameras you already have

| Step | Heading                | Copy                                                                                        | Source                                                                       |
| ---- | ---------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1    | Connect your cameras   | Ailytics connects to existing IP cameras over RTSP or ONVIF. No new cameras.                | Ledger #23, #24 (homepage, deck S52, ChildSafe page)                         |
| 2    | Detect hazards         | AI checks every feed for the hazards you choose, on the edge, on-premise or in the cloud.   | Ledger #25                                                                   |
| 3    | Alert the right people | Alerts go to the mobile app, messaging groups or site radios, with a clip of what happened. | Deck media: mobile app (S4), Telegram group (S10), walkie-talkie alert (S75) |

## 6. 2D to 3D from one camera

Built on the canvas (Home-USP board, section 2), using only client assets.

- **Eyebrow:** 2D to 3D, one camera
- **H2:** Real 3D distance from one ordinary camera
- **Body:** Most video AI flags a hazard when two boxes overlap on screen, even when the machine is parked or the worker is metres away. Ailytics turns a single camera view into 3D, draws the danger area on the ground around each machine, and checks where the worker's feet are.
- **Points:**

| Point                   | Copy                                                     |
| ----------------------- | -------------------------------------------------------- |
| No new hardware         | No lidar, radar or second camera                         |
| Alerts that matter      | The danger area only applies while the machine is moving |
| Predicts the drop zone  | Projects where a lifted load would land                  |
| Built for outdoor sites | Works through poor light, weather and vibration          |

- **Visuals:**
  - Deck slide 103: camera view to 3D scene
  - `Normal AI/nc_machinery.mp4`: real site, Near Machinery alert
  - Typical 2D vs Ailytics 3D comparison, from the deck slide "Smart Perspective for Unmatched Accuracy with a Single Camera"
- **Sources:**
  - Founder talk (GTC 2026) and Golden Pitch script
  - Brochure p1
  - Master Doc
- Do not say "patented" until the client gives a patent number (ledger).

## 7. Ask your cameras

- **Eyebrow:** Ask your cameras
- **H2:** Ask any camera a question. Get the footage and a written answer.
- **Body:** Ailytics' vision language AI reads a whole scene the way an experienced safety officer would. Search past footage in plain English, or get a written inspection of any camera view.
- **Visuals:** rebuild from client assets before launch:
  - `VLM/CVAS Falling Object Short.mp4`: live AI alert text
  - The load-strapping narration clip (deck S91)
  - Compliance cards (deck S100)
  - Natural-language search diagram (deck S93)

  The current canvas version is a mock-up. Its typed questions and answers are invented examples.

- **Sources:**
  - AilyssaX brochure
  - Onboarding call (OK to show the VLM now)
  - Deck S83 to S100
- Product names (AilyssaX, SceneTrace, AI Inspector) need client sign-off before they go on the page.

## 8. Use cases

- **H2:** Hazards Ailytics detects
- **Layout:** 8 tiles, each with a short clip or poster, a keyword label and a link to its own page.

| Tile                          | Link                                  | Visual                        |
| ----------------------------- | ------------------------------------- | ----------------------------- |
| Machinery proximity detection | `/use-cases/machinery-proximity`      | detection-machinery-proximity |
| Under suspended load          | `/use-cases/under-suspended-load`     | deck GIF S9                   |
| Open edge detection           | `/use-cases/open-edge-detection`      | detection-open-edge           |
| PPE detection                 | `/use-cases/ppe-detection`            | detection-low-light-ppe       |
| Smoke and fire detection      | `/use-cases/smoke-and-fire-detection` | detection-smoke-fire          |
| Vehicle reversing             | `/use-cases/vehicle-reversing`        | detection-vehicle-reversing   |
| Ergonomics                    | `/use-cases/ergonomics`               | detection-ergonomics          |
| Machinery utilisation         | `/use-cases/machinery-utilisation`    | deck GIF S20                  |

- **Link:** `See all 50+ use cases →` goes to `/use-cases`
- **Fix from the live site:** every tile gets its own URL and keyword anchor text, instead of all pointing at `/use-cases`.

## 9. Industries

- **H2:** Built for heavy industry and critical infrastructure
- **Cards:** Construction · Manufacturing · Oil and gas · Logistics and warehousing · Ports and maritime · Airports
- Each card shows its top 3 hazards and links to `/industries/[slug]`.
- Source: onboarding call tier 1 list.
- Mining, energy and data centres follow after launch. Data centres have no live customer yet.

## 10. Results

- **H2:** Results from sites using Ailytics

| Stat      | Label                                                     | Source                                                |
| --------- | --------------------------------------------------------- | ----------------------------------------------------- |
| 60 to 80% | fewer safety non-compliances, typical customer result     | Ledger #5                                             |
| 69.1%     | fewer non-compliances on a construction site in 16 months | Ledger #12 (no customer name)                         |
| 85 to 99% | detection accuracy in the field                           | Client feedback, Oct 2026 (was 80 to 95%, ledger #17) |
| 400+      | projects worldwide                                        | Ledger #9                                             |

- **Optional, if the client confirms:**
  - `TODO_CLIENT_HAZARDS_DETECTED` (4.2M on the live site vs 3.4M in the case studies, ledger #6)
  - `TODO_CLIENT_AREA_COVERED` (500M+ vs 400M+ m², ledger #8)

## 11. Security and privacy

- **H2:** Your footage stays under your control
- **Points:**

| Point                                                          | Source                                                                        |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| ISO/IEC 27001 certified                                        | Ledger #28                                                                    |
| Run on-premise so video stays on your network, or in the cloud | Ledger #25                                                                    |
| Face and full-body blurring                                    | Ledger #31 (Golden Pitch, deck S76)                                           |
| SOC 2                                                          | `TODO_CLIENT_SOC2_WORDING` (Type 1 in progress per the call; confirm wording) |

- **Link:** `/security` (trust page)

## 12. FAQ (FAQPage schema)

**Do I need new cameras?**
No. Ailytics works with the IP cameras you already have, connected over RTSP or ONVIF.
_Sources: ledger #23, #24._

**Where is my video processed and stored?**
On the edge, on your own servers or in the cloud. You choose. With on-premise deployment, video stays on your network. Ailytics is ISO/IEC 27001 certified.
_Sources: ledger #25, #28._

**Does it work outdoors, at night and in bad weather?**
Yes. The models are built for outdoor sites with poor lighting, rain, dust and vibration, and for long-range, small-object detection.
_Sources: ledger #27._

**What does "2D to 3D from one camera" mean?**
Ailytics works out depth from a single standard camera, with no lidar, radar or second camera. That lets it measure real distance between people and machinery, and project where a lifted load would fall.
_Sources: GTC talk, brochure p1._

**How long does it take to go live?**
Under 2 weeks on the cameras you already have.
_Sources: ledger safe #5._

**Does it replace our EHS software or video management system?**
No. Ailytics adds AI detection to your cameras and sends its alerts and reports to the systems you already use.
_Source: onboarding call ("not an EHS system, they integrate with EHS platforms"). Confirm which integrations exist before naming any._

**Can we choose which hazards to detect?**
Yes. Pick from 50+ use cases and set each one's zones, grace period and alert cooldown to match your site rules.
_Sources: ledger #11, Use Case Guide p8._

## 13. Final CTA

- **H2:** See Ailytics on a site like yours
- **Body:** Tell us about your site and the hazards you care about. We'll show you how Ailytics would work on your cameras.
- **Form:** Name · Work email · Company · Country · What would you like to monitor?
- **Button:** `Request a demo`
- **Phone:** `TODO_CLIENT_SALES_PHONE`. The team draft's +65 number is Singapore-only, and the site should read as a US company. Confirm a US number.

## 14. Footer

- **Columns:**
  - Use cases
  - Industries
  - Company: About us, Partner with us, Projects, Careers, News
  - Resources: Blog, Case studies
  - Legal: Privacy policy, Terms, EULA
- **Badges:** ISO/IEC 27001
- **Office addresses:** `TODO_CLIENT_OFFICES` (confirm US address first)
- **Email:** `TODO_CLIENT_CONTACT_EMAIL`. Optional; omit it if not confirmed.

## Decisions for the client at kickoff

1. Country count to publish (9, 10, 11 or 15 all appear today)
2. Source for 73% TRIR and 50% fewer inspections, or drop them
3. Approve or remove the 10 live-site logos not on the approved list
4. Can case-study numbers appear without the customer's name, and can CSCEC and NatSteel be named?
5. Public product names: Ailyssa, AilyssaX, SceneTrace, AI Inspector
6. US phone number, US office address, SOC 2 wording
