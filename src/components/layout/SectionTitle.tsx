interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8">
      <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-javeriana-blue dark:text-white md:text-4xl">
        {title}
      </h2>
      <div className="mt-3 h-1.5 w-20 rounded-full bg-javeriana-gold" />
      <p className="mt-4 max-w-3xl text-sm text-text-secondary dark:text-gray-300 md:text-base">
        {subtitle}
      </p>
    </div>
  );
}
