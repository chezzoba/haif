import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import styles from './page.module.css';

export default function Framework() {
  const dwidth = 1200;
  const curYear = (new Date()).getFullYear();
  return (
    <>
      <Navbar />

      {/* Hero Diagram Section */}
      <section className={styles['framework-hero']}>
        <h1>HAIIS Core Pillars</h1>
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
          The HAIIS framework is organized around five draft components intended to address common implementation barriers in healthcare AI.
        </p>
        <div className={styles['diagram-container']}>
          <Image 
            src="/img/pillarsdiagram.png" 
            alt="Framework Five Pillars Diagram" 
            width={dwidth}
            height={dwidth / 2}
            priority
          />
        </div>
      </section>

      {/* Principles Section */}
      <section id="principles">
        <h2>Framework Principles</h2>
        <div className={styles['principles-list']}>
          <div className={styles['principle-item']}>
            <span className={styles.checkmark}>✓</span>
            <div>
              <h3>Vendor-Neutral</h3>
              <p>Built across AWS, Azure, GCP, and other platforms</p>
            </div>
          </div>
          <div className={styles['principle-item']}>
            <span className={styles.checkmark}>✓</span>
            <div>
              <h3>Compliance-by-design</h3>
              <p>HIPAA, GxP, and FDA requirements embedded from the start</p>
            </div>
          </div>
          <div className={styles['principle-item']}>
            <span className={styles.checkmark}>✓</span>
            <div>
              <h3>Open-access</h3>
              <p>Intended to be made publicly available without restrictive licensing barriers</p>
            </div>
          </div>
          <div className={styles['principle-item']}>
            <span className={styles.checkmark}>✓</span>
            <div>
              <h3>Actionable</h3>
              <p>Patterns and playbooks, not just principles</p>
            </div>
          </div>
          <div className={styles['principle-item']}>
            <span className={styles.checkmark}>✓</span>
            <div>
              <h3>Education-first scaling</h3>
              <p>Train-the-trainer approach for widespread adoption</p>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Components Section */}
      <section id="components">
        <h2>The Five Core Components</h2>
        <div className={styles['components-accordion']}>
          
          <details className={styles['component-card']}>
            <summary>
              <h3>Compliance-by-Design Architecture Patterns</h3>
            </summary>
            <div className={styles['component-content']}>
              <h4>Problem Statement</h4>
              <p>Healthcare organizations struggle to implement AI while meeting regulatory requirements like HIPAA, GxP, and FDA standards.</p>
              
              <h4>Solution Overview</h4>
              <p>Draft implementation patterns designed to help teams embed HIPAA-, GxP-, and FDA-relevant considerations into system architecture from the outset.</p>
              
              <h4>Target Users</h4>
              <p>Cloud architects, IT leaders, compliance teams</p>
              
              <h4>Key Deliverables</h4>
              <ul>
                <li>Architecture templates for common AI use cases</li>
                <li>Compliance checklists integrated into design patterns</li>
                <li>Reference implementations across cloud platforms</li>
              </ul>
              
              <a href="/documentation" className={styles['cta-link']}>View Documentation →</a>
            </div>
          </details>

          <details className={styles['component-card']}>
            <summary>
              <h3>Security Control Mapping System</h3>
            </summary>
            <div className={styles['component-content']}>
              <h4>Problem Statement</h4>
              <p>Inconsistent security controls across different cloud providers create gaps and compliance risks.</p>
              
              <h4>Solution Overview</h4>
              <p>Cross-cloud guidance for aligning security controls across AI workloads and healthcare data environments.</p>
              
              <h4>Target Users</h4>
              <p>Security architects, cloud engineers, compliance officers</p>
              
              <h4>Key Deliverables</h4>
              <ul>
                <li>Cross-cloud security control matrices</li>
                <li>Implementation guides for each cloud platform</li>
                <li>Security validation checklists</li>
              </ul>
              
              <a href="/documentation" className={styles['cta-link']}>View Documentation →</a>
            </div>
          </details>

          <details className={styles['component-card']}>
            <summary>
              <h3>Data Governance Protocols</h3>
            </summary>
            <div className={styles['component-content']}>
              <h4>Problem Statement</h4>
              <p>Managing sensitive healthcare data across AI training, inference, and monitoring lacks standardized approaches.</p>
              
              <h4>Solution Overview</h4>
              <p>Reusable approaches for data handling, access, lineage, and oversight across the AI lifecycle.</p>
              
              <h4>Target Users</h4>
              <p>Data governance teams, AI engineers, privacy officers</p>
              
              <h4>Key Deliverables</h4>
              <ul>
                <li>Data classification frameworks</li>
                <li>Access control templates</li>
                <li>Audit and monitoring protocols</li>
              </ul>
              
              <a href="/documentation" className={styles['cta-link']}>View Documentation →</a>
            </div>
          </details>

          <details className={styles['component-card']}>
            <summary>
              <h3>AI Risk Assessment Methodology</h3>
            </summary>
            <div className={styles['component-content']}>
              <h4>Problem Statement</h4>
              <p>AI introduces unique risks in healthcare that traditional risk frameworks don't adequately address.</p>
              
              <h4>Solution Overview</h4>
              <p>A structured approach for identifying and mitigating healthcare-specific AI implementation risks.</p>
              
              <h4>Target Users</h4>
              <p>Risk managers, compliance teams, AI project leads</p>
              
              <h4>Key Deliverables</h4>
              <ul>
                <li>Risk assessment worksheets</li>
                <li>Mitigation strategy templates</li>
                <li>Healthcare-specific risk catalogs</li>
              </ul>
              
              <a href="/documentation" className={styles['cta-link']}>View Documentation →</a>
            </div>
          </details>

          <details className={styles['component-card']}>
            <summary>
              <h3>Implementation Playbooks</h3>
            </summary>
            <div className={styles['component-content']}>
              <h4>Problem Statement</h4>
              <p>Healthcare organizations need concrete, step-by-step guidance for implementing AI solutions.</p>
              
              <h4>Solution Overview</h4>
              <p>Step-by-step guides intended to help teams move from concept to controlled deployment.</p>
              
              <h4>Target Users</h4>
              <p>Project managers, implementation teams, technical leads</p>
              
              <h4>Key Deliverables</h4>
              <ul>
                <li>Use case-specific implementation guides</li>
                <li>Step-by-step deployment checklists</li>
                <li>Troubleshooting and optimization tips</li>
              </ul>
              
              <a href="/documentation" className={styles['cta-link']}>View Documentation →</a>
            </div>
          </details>

        </div>
      </section>

      {/* Implementation Roadmap Section */}
      <section id="roadmap" className={styles['evolution-section']}>
        <h2>Framework Roadmap</h2>
        <div className={styles['timeline']}>
          <div className={styles['timeline-item']}>
            <div className={styles['timeline-year']}>{curYear}</div>
            <div className={styles['timeline-content']}>
              <h3>Foundation</h3>
              <p>Define the initial framework structure, publish draft concepts, and open collaboration channels</p>
            </div>
          </div>

          <div className={styles['timeline-item']}>
            <div className={styles['timeline-year']}>{curYear + 1}-{curYear + 2}</div>
            <div className={styles['timeline-content']}>
              <h3>Validation</h3>
              <p>Review and refine draft framework components through feedback and early implementation discussions</p>
            </div>
          </div>

          <div className={styles['timeline-item']}>
            <div className={styles['timeline-year']}>{curYear + 2}-{curYear + 3}</div>
            <div className={styles['timeline-content']}>
              <h3>Documentation Expansion</h3>
              <p>Publish implementation guides, templates, and practical examples</p>
            </div>
          </div>

          <div className={styles['timeline-item']}>
            <div className={styles['timeline-year']}>{curYear + 3}+</div>
            <div className={styles['timeline-content']}>
              <h3>Scaling</h3>
              <p>Support education, partnerships, and broader grams, and continuous refinement based on community input</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
