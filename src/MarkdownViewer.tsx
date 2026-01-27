import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function MarkdownViewer({
  url,
  pollIntervalMs = 2000,
}: {
  url: string;
  pollIntervalMs?: number;
}) {
  const [content, setContent] = useState<string>("Loading...");

  useEffect(() => {
    let mounted = true;
    const fetchOnce = async () => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(res.statusText);
        const text = await res.text();
        if (mounted) setContent(text);
      } catch (e) {
        if (mounted) setContent(`Error: ${String(e)}`);
      }
    };

    fetchOnce();
    const id = setInterval(fetchOnce, pollIntervalMs);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [url, pollIntervalMs]);

  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}