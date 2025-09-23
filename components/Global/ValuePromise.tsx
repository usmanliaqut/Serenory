export function ValuePromise() {
  return (
    <section className="py-16 px-4 warm-glow relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-muted/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
            Value Promise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/60 via-accent to-primary/60 mx-auto rounded-full"></div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground text-pretty">
            Bring whatever is on your heart. Share your milestones and joys,
            your struggles and disappointments, or even the heavy things
            weighing on you that you've never told anyone. Whether you're
            celebrating or hurting, feeling light or carrying something dark —
            this is your space to speak freely, without fear of judgment.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 rounded-xl bg-card/80 backdrop-blur-sm soft-shadow border border-border/30">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Safe Space
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              A judgment-free environment where you can be completely authentic
            </p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-xl bg-card/80 backdrop-blur-sm soft-shadow border border-border/30">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Open Dialogue
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Share anything on your heart, from celebrations to struggles
            </p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-xl bg-card/80 backdrop-blur-sm soft-shadow border border-border/30">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Confidential
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Your privacy and trust are our highest priorities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
