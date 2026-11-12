import { Globe2, MessagesSquare, Mic, Users } from "lucide-react";

const stats = [
  { icon: Mic, value: "50+", label: "Visionary Speakers" },
  { icon: Globe2, value: "70", label: "Worldwide Brands" },
  { icon: MessagesSquare, value: "280+", label: "Sessions & Workshops" },
  { icon: Users, value: "960+", label: "Event Participants" },
];

export default function ImpactStats() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="uppercase text-sm mb-3 font-medium text-gray-600">
            Platform Features
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Built for Community-Led Change
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
            A frictionless platform connecting compassionate citizens with local
            initiatives that create real, lasting change.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <li
              key={label}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6 flex size-28 items-center justify-center">
                <span
                  aria-hidden="true"
                  className="absolute right-0 bottom-0 size-20 rounded-full bg-[#C9F2E9]"
                />
                <Icon
                  aria-hidden="true"
                  className="relative z-10 size-16 text-foreground"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-5xl font-bold tracking-tight md:text-6xl">
                {value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                {label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
