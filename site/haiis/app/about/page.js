import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './page.module.css';

export default function About() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className={styles['about-hero']}>
        <h1>About the Framework</h1>
        <p className={styles['hero-subtitle']}>How we're bridging the gap between policy and practice in healthcare AI</p>
      </section>

      {/* Project Status Section */}
      <section id="status" className={styles['origin-section']}>
        <h2>Project Status</h2>
        <div className={styles['origin-content']}>
          <p>
            HAIIS is an early-stage, open-access framework initiative focused on practical implementation guidance for healthcare AI. The project is currently in its foundation phase, with initial framework components, documentation, and collaboration pathways being developed for public release.
          </p>
        </div>
      </section>

      {/* Origin Story Section */}
      <section id="origin" className={styles['origin-section']}>
        <h2>The Problem We're Solving</h2>
        <div className={styles['origin-content']}>
          <p>
            Healthcare AI Implementation Standards (HAIIS) was created to address a recurring implementation gap in healthcare AI: many organizations understand the policy and compliance requirements, but lack concrete technical guidance for putting them into practice across real systems and cloud environments.
          </p>
          
          <div className={styles['problem-list']}>
            <div className={styles['problem-item']}>
              <span className={styles['problem-icon']}>⚠️</span>
              <div>
                <h3>The Regulatory Gap</h3>
                <p>HIPAA, GxP, and FDA requirements were documented in policy documents but rarely translated into actionable technical patterns. Organizations knew <em>what</em> to comply with, but not <em>how</em> to implement it.</p>
              </div>
            </div>

            <div className={styles['problem-item']}>
              <span className={styles['problem-icon']}>🔒</span>
              <div>
                <h3>Security Inconsistency</h3>
                <p>Each cloud platform had different security controls, creating gaps when organizations used multiple providers. There was no unified approach to securing AI workloads across AWS, Azure, and GCP.</p>
              </div>
            </div>

            <div className={styles['problem-item']}>
              <span className={styles['problem-icon']}>📊</span>
              <div>
                <h3>Data Governance Challenges</h3>
                <p>Sensitive healthcare data required special handling throughout the AI lifecycle, but existing frameworks didn't address the unique needs of training, inference, and monitoring AI models.</p>
              </div>
            </div>

            <div className={styles['problem-item']}>
              <span className={styles['problem-icon']}>🎯</span>
              <div>
                <h3>Lack of Actionable Guidance</h3>
                <p>Most available resources were high-level principles without concrete implementation steps. Organizations needed playbooks, not just policy documents.</p>
              </div>
            </div>
          </div>

          <div className={styles['solution-statement']}>
            <h3>Our Approach</h3>
            <p>
              This initiative is informed by implementation challenges observed in regulated healthcare and life sciences environments, including issues related to compliance architecture, multicloud security, data governance, and AI risk management. HAIIS aims to translate those recurring challenges into practical, reusable patterns and documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className={styles['origin-section']}>
        <h2>Founder</h2>
        <div className={styles['origin-content']}>
          <p>
            HAIIS is being developed by Kaizad Wadia, a Cloud and AI architect with experience in regulated healthcare environments and multicloud implementation. The initiative reflects a broader goal: making practical healthcare AI implementation guidance more accessible across organizations.
          </p>
        </div>
      </section>

      {/* Scope Section */}
      <section id="scope" className={styles['origin-section']}>
        <h2>What HAIIS is (and is not)</h2>
        <div className={styles['origin-content']}>
          <p>
            HAIIS is not a regulatory authority, certification body, or substitute for legal or compliance review. It is an open-access implementation framework intended to help organizations operationalize healthcare AI more consistently and responsibly.
          </p>
        </div>
      </section>

      {/* Principles Section */}
      <section id="principles" className={styles['principles-section']}>
        <h2>Our Guiding Principles</h2>
        <div className={styles['principles-grid']}>
          <div className={styles['principle-card']}>
            <h3>Problem-First Approach</h3>
            <p>Every component starts with a concrete healthcare AI implementation challenge</p>
          </div>

          <div className={styles['principle-card']}>
            <h3>Regulatory by Design</h3>
            <p>Compliance requirements are embedded into technical patterns from the start</p>
          </div>

          <div className={styles['principle-card']}>
            <h3>Vendor Neutral</h3>
            <p>Patterns work across clouds and other platforms with consistent security</p>
          </div>

          <div className={styles['principle-card']}>
            <h3>Open and Accessible</h3>
            <p>Freely available to all healthcare organizations, with no licensing barriers</p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className={styles['community-section']}>
        <h2>Built for the Healthcare Community</h2>
        <div className={styles['community-content']}>
          <p>
            The framework is intended to evolve through practical feedback, implementation experience, and collaboration across the healthcare ecosystem.
          </p>
          <p>
            Our approach is: identify common challenges, develop practical solutions, 
            document them clearly, and make them available to everyone. The framework grows through 
            real-world implementation and community feedback.
          </p>
          <div className={styles['cta-container']}>
            <a href="/collaborate" className={styles['community-cta']}>Join and Collaborate →</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}