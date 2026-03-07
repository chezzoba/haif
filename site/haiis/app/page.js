import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <h1>Healthcare AI Implementation Standards</h1>
        <h2>Practical, open-access guidance for secure and compliant healthcare AI implementation</h2>
        <p style={{ marginTop: '1rem', fontSize: '1.1rem', maxWidth: '800px', margin: '1rem auto' }}>
          A vendor-neutral framework in development to help healthcare organizations implement AI with stronger compliance, governance, security, and risk management.
        </p>
        <div className="hero-cta">
          <a href="/collaborate" role="button">Work with us →</a>
          <a href="/framework" role="button" className="secondary">Explore Framework →</a>
        </div>
        <p className="hero-tagline">
          Open-access • Compliance-by-design • Informed by work in regulated healthcare environments
        </p>
      </section>

      {/* Section 1: The Problem */}
      <section id="problem">
        <h2>Why Healthcare AI Implementation Fails</h2>
        <div className="grid-3">
          <div className="card">
            <h3>Regulatory Complexity</h3>
            <p>Navigating HIPAA, GxP, and FDA requirements without clear technical guidance</p>
          </div>
          <div className="card">
            <h3>Multicloud Security Gaps</h3>
            <p>Inconsistent security controls across different cloud providers</p>
          </div>
          <div className="card">
            <h3>Data Governance Uncertainty</h3>
            <p>Lack of standardized approaches for managing sensitive healthcare data in AI systems</p>
          </div>
        </div>
      </section>

      {/* Section 2: The Framework */}
      <section id="framework">
        <h2>The Core Components</h2>
        <div className="grid-4">
          <div className="card">
            <h3>Compliance-by-Design Architecture Patterns</h3>
            <p>Embed HIPAA/GxP directly into AI blueprints</p>
            <a href="/framework#components">Learn More →</a>
          </div>
          <div className="card">
            <h3>Security Controls & Data Governance</h3>
            <p>Consistent security controls across all cloud providers with secure data governance for AI lifecycle</p>
            <a href="/framework#components">Learn More →</a>
          </div>
          <div className="card">
            <h3>AI Risk Assessment Methodology</h3>
            <p>Healthcare-specific risk evaluation</p>
            <a href="/framework#components">Learn More →</a>
          </div>
          <div className="card">
            <h3>Implementation Playbooks</h3>
            <p>Step-by-step deployment guides</p>
            <a href="/framework#components">Learn More →</a>
          </div>
        </div>
      </section>

      {/* Section 3: Who It's For */}
      <section id="audience">
        <h2>Who this framework is for</h2>
        <div className="grid-3">
          <div className="card">
            <h3>Hospitals and Health Systems</h3>
            <p>Guidance for teams evaluating or implementing AI in regulated clinical and operational environments</p>
          </div>
          <div className="card">
            <h3>Pharma and Life Sciences Teams</h3>
            <p>Implementation patterns for compliant AI workflows in research, documentation, and regulated data environments</p>
          </div>
          <div className="card">
            <h3>Healthtech and Medical Device Builders</h3>
            <p>Practical guidance for secure, governed AI deployment in healthcare products and platforms</p>
          </div>
        </div>
      </section>

      {/* Section 5: How to Start */}
      <section id="quickstart">
        <h2>Your Next Step</h2>
        <div className="grid-3">
          <div className="card">
            <h3>📖 Read Quickstart</h3>
            <p>Get started</p>
            <a href="/documentation" role="button">Start Reading</a>
          </div>
          <div className="card">
            <h3>💡 See Use Cases</h3>
            <p>Explore example healthcare AI use cases</p>
            <a href="https://ep.jhu.edu/news/ai-in-healthcare-applications-and-impact" role="button" target='_blank' >View Use Cases</a>
          </div>
          <div className="card">
            <h3>🤝 Collaborate</h3>
            <p>Become an early adopter and shape the framework</p>
            <a href="/collaborate" role="button">Collaborate</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
