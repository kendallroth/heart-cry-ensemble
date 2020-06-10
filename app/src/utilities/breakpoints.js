// Taken from: https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/services/breakpoint/index.ts

export default class Breakpoint {
  constructor(thresholds) {
    this.xs = false;
    this.sm = false;
    this.md = false;
    this.lg = false;
    this.xl = false;

    this.thresholds = thresholds;
    this.name = "";
    this.resizeTimeout = null;

    this.init();
  }

  init() {
    if (typeof window === "undefined") return;

    window.addEventListener("resize", this.onResize.bind(this), {
      passive: true,
    });

    this.update();
  }

  update() {
    const height = this.getClientHeight();
    const width = this.getClientWidth();

    // QUESTION: Possibly handle scrollbar width?
    const xs = width < this.thresholds.xs;
    const sm = width < this.thresholds.sm && !xs;
    const md = width < this.thresholds.md && !(xs || sm);
    const lg = width < this.thresholds.lg && !(xs || sm || md);
    const xl = width >= this.thresholds.lg && !(xs || sm || md || lg);

    this.height = height;
    this.width = width;

    this.xs = xs;
    this.sm = sm;
    this.md = md;
    this.lg = lg;
    this.xl = xl;

    this.xsOnly = xs;
    this.smOnly = sm;
    this.smAndDown = (xs || sm) && !(md || lg || xl);
    this.smAndUp = !xs && (sm || md || lg || xl);
    this.mdOnly = md;
    this.mdAndDown = (xs || sm || md) && !(lg || xl);
    this.mdAndUp = !(xs || sm) && (md || lg || xl);
    this.lgOnly = lg;
    this.lgAndDown = (xs || sm || md || lg) && !xl;
    this.lgAndUp = !(xs || sm || md) && (lg || xl);
    this.xlOnly = xl;

    switch (true) {
      case xs:
        this.name = "xs";
        break;
      case sm:
        this.name = "sm";
        break;
      case md:
        this.name = "md";
        break;
      case lg:
        this.name = "lg";
        break;
      default:
        this.name = "xl";
        break;
    }

    console.log("Updated breakpoints", this);
  }

  onResize() {
    clearTimeout(this.resizeTimeout);

    // Debounce the breakpoint update after the screen resizes
    this.resizeTimeout = window.setTimeout(this.update.bind(this), 200);
  }
  // Cross-browser support as described in: https://stackoverflow.com/questions/1248081
  getClientWidth() {
    if (typeof document === "undefined") return 0; // SSR
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    );
  }

  getClientHeight() {
    if (typeof document === "undefined") return 0; // SSR
    return Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0,
    );
  }
}
