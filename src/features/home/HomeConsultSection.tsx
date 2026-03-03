import { useEffect, useRef, useState } from "react";

import consultIcon from "@/assets/icons/services/consult.svg";

const serviceOptions = [
  { id: "outdoor-cooling", label: "Outdoor Cooling Design and Build" },
  {
    id: "engineering-services",
    label: "Engineering Services for Existing Buildings",
  },
  { id: "mep-services", label: "MEP Services for New Buildings" },
  { id: "district-cooling", label: "District-Cooling Solutions" },
  { id: "cooling-as-service", label: "Cooling as a Service" },
  { id: "modeling", label: "Modeling Services" },
  { id: "sustainability", label: "Sustainability & Decarbonization" },
  { id: "digitalization", label: "Digitalization & Smart Systems" },
  { id: "data-centers", label: "Data Centers-Specific Services" },
  { id: "other", label: "Other" },
];

const SCENE_URL =
  "https://prod.spline.design/gXcQP6l55ruwhGI0/scene.splinecode";
const OBJECT_ID = "4d4ea24f-5f17-45f8-a3b6-427bea394694";
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
          /* @vite-ignore */ "https://unpkg.com/@splinetool/runtime@latest/build/runtime.js"
        )) as SplineRuntime;

        if (!isMounted) return;

        const app = new runtimeModule.Application(canvas);
        await app.load(SCENE_URL);

        if (!isMounted) return;

        const object3d = app.findObjectById(OBJECT_ID);

        scaleCanvas();
        window.addEventListener("resize", scaleCanvas);
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
      window.removeEventListener("resize", scaleCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [selectedService, setSelectedService] = useState("");
  const [otherMessage, setOtherMessage] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      relatedService: formData.get("relatedService"),
      ...(selectedService === "other" && {
        otherMessage: formData.get("otherMessage"),
      }),
    };

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");

      setSubmitStatus("success");
      setSelectedService("");
      setOtherMessage("");
      form.reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="home-consult" aria-label="Consult with our specialists">
      <div className=" home-consult-grid">
        <div className="home-consult-visual">
          <div ref={wrapperRef} className="spline-wrapper">
            <canvas ref={canvasRef} id="canvas3d" width={600} height={600} />
            {!isSplineReady ? (
              <img
                src={consultIcon}
                alt="Consult graphic"
                className="consult-fallback"
              />
            ) : null}
          </div>
        </div>

        <div className="home-consult-content">
          <h2>CONSULT WITH OUR SPECIALISTS</h2>

          <a href="#" className="home-consult-download-btn">
            Download Company Profile
          </a>

          <form className="home-consult-form" onSubmit={handleSubmit}>
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
              <input type="tel" name="phone" placeholder="Mobile" required />
            </label>

            <label className="home-consult-select-label">
              <select
                name="relatedService"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className={selectedService ? "has-value" : ""}
                required
              >
                <option value="" disabled>
                  Related Services
                </option>
                {serviceOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            {selectedService === "other" ? (
              <label>
                <textarea
                  name="otherMessage"
                  placeholder="Please describe your inquiry..."
                  value={otherMessage}
                  onChange={(e) => setOtherMessage(e.target.value)}
                  rows={4}
                  required
                  className="home-consult-form-textarea"
                />
              </label>
            ) : null}

            <div className="home-consult-form-bottom">
              <p>
                By submitting, you agree to our <a href="#">Terms</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </p>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Submit"}
              </button>
            </div>

            {submitStatus === "success" ? (
              <p className="home-consult-form-status home-consult-form-status--success">
                Thank you. We will contact you shortly.
              </p>
            ) : null}

            {submitStatus === "error" ? (
              <p className="home-consult-form-status home-consult-form-status--error">
                Something went wrong. Please try again.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
};
