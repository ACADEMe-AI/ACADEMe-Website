import {
  MessagesSquare,
  Layers,
  ListChecks,
  FileText,
  ClipboardCheck,
} from "lucide-react";

const features = [
  {
    icon: MessagesSquare,
    title: "Chat",
    description:
      "Ask your AI tutor anything. It answers on your notes, not generic examples.",
  },
  {
    icon: Layers,
    title: "Flashcards",
    description:
      "Turn any topic into spaced-repetition cards that stick with you.",
  },
  {
    icon: ListChecks,
    title: "Quizzes",
    description:
      "Generate practice quizzes from your own material and know what to review.",
  },
  {
    icon: FileText,
    title: "Summaries",
    description:
      "Condense lectures and notes into the key ideas worth remembering.",
  },
  {
    icon: ClipboardCheck,
    title: "Practice tests",
    description:
      "Simulate real exams under time and see exactly where you stand.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            One companion for how you actually study
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Upload your notes once, then study them the way your exam expects —
            chat, cards, quizzes, summaries, and practice tests, all in your
            pocket.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-surface border border-border rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;