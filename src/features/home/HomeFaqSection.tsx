import { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: 'Which sectors does RACS serve?',
    answer:
      'RACS serves residential, commercial, hospitality, retail, mixed-use, industrial facilities, data centers, district cooling utilities, and large-scale outdoor developments across the GCC.',
  },
  {
    question: 'When should RACS be involved in a project?',
    answer:
      'RACS should ideally be involved from concept design to optimize performance, reduce lifecycle costs, and integrate cooling strategy early.',
  },
  {
    question: 'What services does RACS offer?',
    answer:
      'RACS provides design-build, retrofit, engineering analysis, controls optimization, simulation, and ongoing operations support.',
  },
  {
    question: 'Does RACS provide end-to-end project delivery?',
    answer:
      'Yes. RACS covers assessment, design, procurement, installation, commissioning, and post-handover support.',
  },
  {
    question: 'Does RACS use CFD and energy modeling?',
    answer:
      'Yes. RACS uses simulation tools including CFD and energy modeling for system performance validation and design decisions.',
  },
];

export const HomeFaqSection = (): JSX.Element => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="home-faq" aria-label="Frequently asked questions">
      <div className="container home-faq-grid">
        <div className="home-faq-title-wrap">
          <h2>FREQUENTLY ASKED QUESTIONS</h2>
        </div>

        <div className="home-faq-list">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <article key={item.question} className={isOpen ? 'home-faq-item is-open' : 'home-faq-item'}>
                <button
                  type="button"
                  className="home-faq-trigger"
                  onClick={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>

                <div className="home-faq-content" aria-hidden={!isOpen}>
                  <div className="home-faq-content-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
