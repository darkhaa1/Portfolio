interface SectionHeadingProps {
  number: string;
  title: string;
}

export function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <span className="font-mono text-sm text-text-hint">{"// "}{number}</span>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="font-mono text-accent">$ </span>
        {title}
      </h2>
    </div>
  );
}
