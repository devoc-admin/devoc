import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "lexical";

type Props = {
  data: SerializedEditorState;
};

export function RichText({ data }: Props) {
  return (
    <PayloadRichText
      className={[
        "prose max-w-none",
        "prose-headings:font-heading prose-headings:text-primary",
        "prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl",
        "prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl",
        "prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-lg",
        "prose-p:text-foreground/85 prose-p:leading-relaxed",
        "prose-a:text-accent prose-a:underline-offset-2",
        "prose-strong:text-foreground",
        "prose-li:text-foreground/85",
        "prose-hr:border-border",
      ].join(" ")}
      data={data}
    />
  );
}
