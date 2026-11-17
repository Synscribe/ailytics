/**
 * Splits text into the units a word-by-word reveal lights up. Each segment
 * keeps its trailing space, so joining the segments gives the original text.
 *
 * Languages written with spaces, including Korean, split on spaces. Japanese
 * and Chinese have no spaces, so they use `Intl.Segmenter`, with punctuation
 * and spaces attached to the word before them. Run this on the server and
 * pass the result to client components, so the server HTML and the hydrated
 * page always match.
 */
export function segmentWords(text: string, lang: string): string[] {
  if (!/^(ja|zh)\b/i.test(lang)) {
    return text.split(/(?<=\s)/).filter(Boolean);
  }

  const segments: string[] = [];
  const segmenter = new Intl.Segmenter(lang, { granularity: "word" });
  for (const { segment, isWordLike } of segmenter.segment(text)) {
    if (!isWordLike && segments.length > 0) {
      segments[segments.length - 1] += segment;
    } else {
      segments.push(segment);
    }
  }
  return segments;
}
