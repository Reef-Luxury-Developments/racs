import { useEffect, useRef, useState } from 'react';

import consultIcon from '@/assets/icons/services/consult.svg';

const SCENE_URL = 'https://prod.spline.design/gXcQP6l55ruwhGI0/scene.splinecode';
const OBJECT_ID = '4d4ea24f-5f17-45f8-a3b6-427bea394694';
const BASE_SIZE = 600;

type SplineRuntime = {
  Application: new (canvas: HTMLCanvasElement) => {
    load: (url: string) => Promise<void>;
    findObjectById: (id: string) => { rotation: { y: number } } | null;
  };
};

export const HomeConsultSection = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isSplineReady, setIsSplineReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let isMounted = true;
    let animationFrameId = 0;

    const scaleCanvas = (): void => {
      const scale = wrapper.clientWidth / BASE_SIZE;
      canvas.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    const initSpline = async (): Promise<void> => {
      try {
        const runtimeModule = (await import(
          /* @vite-ignore */ 'https://unpkg.com/@splinetool/runtime@latest/build/runtime.js'
        )) as SplineRuntime;

        if (!isMounted) return;

        const app = new runtimeModule.Application(canvas);
        await app.load(SCENE_URL);

        if (!isMounted) return;

        const object3d = app.findObjectById(OBJECT_ID);

        scaleCanvas();
        window.addEventListener('resize', scaleCanvas);
        setIsSplineReady(true);

        if (!object3d) return;

        let lastTime = 0;

        const animate = (time: number): void => {
          const delta = (time - lastTime) / 1000;
          lastTime = time;

          object3d.rotation.y += delta * 1.5;
          animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
      } catch {
        setIsSplineReady(false);
      }
    };

    void initSpline();

    return () => {
      isMounted = false;
      window.removeEventListener('resize', scaleCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="home-consult" aria-label="Consult with our specialists">
      <div className="container home-consult-grid">
        <div className="home-consult-visual">
          <div ref={wrapperRef} className="spline-wrapper">
            <canvas ref={canvasRef} id="canvas3d" width={600} height={600} />
            {!isSplineReady ? <img src={consultIcon} alt="Consult graphic" className="consult-fallback" /> : null}
          </div>
        </div>

        <div className="home-consult-content">
          <h2>CONSULT WITH OUR SPECIALISTS</h2>

          <a href="#" className="home-consult-download-btn">
            Download Company Profile
          </a>

          <form className="home-consult-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              <input type="text" name="name" placeholder="Name" required />
            </label>

            <label>
              <input type="text" name="company" placeholder="Company" />
              <span className="optional">optional</span>
            </label>

            <label>
              <input type="email" name="email" placeholder="Email" required />
            </label>

            <label>
              <input type="tel" name="phone" placeholder="Phone" required />
            </label>

            <div className="home-consult-form-bottom">
              <p>By submitting, you agree to our Terms and Privacy Policy.</p>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
