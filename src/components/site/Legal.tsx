import { PageHero } from "./PageHero";

export function Legal({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <>
      <PageHero eyebrow="Policies" title={title}>
        Template text — please have this reviewed and replaced with your final policy before launch.
      </PageHero>
      <div className="container-page max-w-3xl space-y-8 py-16">
        {sections.map(([h, p]) => (
          <section key={h}>
            <h2 className="text-2xl font-semibold">{h}</h2>
            <p className="mt-2 text-foreground/80">{p}</p>
          </section>
        ))}
      </div>
    </>
  );
}
