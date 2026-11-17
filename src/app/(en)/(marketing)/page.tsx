import { en } from "./_copy/en";
import { HomePage, homeMetadata } from "./_components/home-page";

export const metadata = homeMetadata(en, "en");

export default function Page() {
  return <HomePage copy={en} locale="en" />;
}
