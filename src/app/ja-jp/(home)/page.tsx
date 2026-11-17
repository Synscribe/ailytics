import { jaJp } from "@/app/(en)/(marketing)/_copy/ja-jp";
import {
  HomePage,
  homeMetadata,
} from "@/app/(en)/(marketing)/_components/home-page";

export const metadata = homeMetadata(jaJp, "ja-jp");

/** The Japanese homepage. Copy: `src/app/(en)/(marketing)/_copy/ja-jp.ts`. */
export default function Page() {
  return <HomePage copy={jaJp} locale="ja-jp" />;
}
