import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "lexical";

type Props = {
  data: SerializedEditorState;
};

export function RichText({ data }: Props) {
  return (
    <PayloadRichText className="prose prose-neutral max-w-none" data={data} />
  );
}
