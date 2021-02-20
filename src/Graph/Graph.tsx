import { lazy, Suspense, onMount, createSignal } from "solid-js";
const FusionTimeChart = lazy(() => {
  return import("./FusionTimeChart");
});

const Graph = () => {
  const [renderGraph, setRenderGraph] = createSignal(false);
  let sectionRef!: HTMLElement;

  return (
    <section
      ref={sectionRef}
      id="recent-coding-activity"
      className="coding-activity"
    >
      <button onClick={() => setRenderGraph(true)}>Render Graph</button>
      <br />
      <div role="presentation" className="container">
        {renderGraph() ? (
          <Suspense fallback={<div>Fetching graph data ...</div>}>
            <FusionTimeChart />
          </Suspense>
        ) : null}
      </div>
    </section>
  );
};

export default Graph;
