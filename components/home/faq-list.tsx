import type { FaqItem } from "@/data/faq";

/** Native <details> accordion: keyboard accessible, crawlable, zero JS. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="faq-item">
          <summary>
            <span>{item.q}</span>
            <span className="faq-icon text-fg-subtle" aria-hidden="true" />
          </summary>
          <p className="faq-answer">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
