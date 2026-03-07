'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './page.module.css';

export default function Collaborate() {
  const [formData, setFormData] = useState({
    organization: '',
    email: '',
    role: '',
    useCase: '',
    cloudPlatforms: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          organization: '',
          email: '',
          role: '',
          useCase: '',
          cloudPlatforms: '',
          message: ''
        });
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className={styles['collaborate-hero']}>
        <h1>Interested in evaluating or shaping the framework?</h1>
        <p className={styles.subtitle}>We are seeking early collaborators to help review, evaluate, and refine draft framework components for real-world healthcare AI use cases</p>
      </section>

      {/* Who We Want Section */}
      <section id="who-we-want" className={styles['who-section']}>
        <h2>Who We're Looking For</h2>
        <p className={styles['section-description']}>We're seeking partners across the healthcare ecosystem to validate and improve the framework</p>
        
        <div className={styles['who-grid']}>
          <div className={styles['who-card']}>
            <h3>U.S. Hospitals</h3>
            <p>Healthcare systems of any size looking to implement AI solutions</p>
          </div>

          <div className={styles['who-card']}>
            <h3>Pharmaceutical Companies</h3>
            <p>Pharma organizations developing AI for drug discovery and clinical trials</p>
          </div>

          <div className={styles['who-card']}>
            <h3>Healthtech Startups</h3>
            <p>Innovators building AI-powered healthcare products and services</p>
          </div>

          <div className={styles['who-card']}>
            <h3>Education Partners</h3>
            <p>Academic institutions and training organizations for curriculum development</p>
          </div>
        </div>
      </section>

      {/* Collaboration Types Section */}
      <section id="collaboration-types" className={styles['types-section']}>
        <h2>Collaboration Types</h2>
        <p className={styles['section-description']}>There are several ways organizations and practitioners can contribute to framework development</p>
        
        <div className={styles['types-grid']}>
          <div className={styles['type-card']}>
            <h3>Evaluation / Early Adoption</h3>
            <p>Review draft framework components in the context of real organizational needs, provide feedback on implementation challenges, and help identify gaps, priorities, and practical improvements.</p>
          </div>

          <div className={styles['type-card']}>
            <h3>Education and Curriculum Collaboration</h3>
            <p>Co-develop educational materials, implementation examples, and training pathways that make healthcare AI implementation more accessible to technical teams.</p>
          </div>

          <div className={styles['type-card']}>
            <h3>Implementation Experience Sharing</h3>
            <p>Share lessons learned, non-confidential implementation patterns, and practical observations that may help improve future framework releases.</p>
          </div>

          <div className={styles['type-card']}>
            <h3>Advisory Input</h3>
            <p>Provide subject matter feedback on priorities, scope, and future framework directions.</p>
          </div>
        </div>
      </section>

      {/* Intake Form Section */}
      <section id="intake-form" className={styles['form-section']}>
        <h2>Start Collaborating</h2>
        <p className={styles['section-description']}>Tell us about your organization and how you'd like to engage</p>
        
        {submitSuccess ? (
          <div className={styles['success-message']}>
            <h3>Thank you for your interest!</h3>
            <p>We've received your collaboration request and will be in touch within 3-5 business days.</p>
            <button 
              onClick={() => setSubmitSuccess(false)}
              className={styles['submit-button']}
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles['collaborate-form']}>
            <div className={styles['form-group']}>
              <label htmlFor="organization">
                Organization *
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                placeholder="Your organization name"
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="email">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="role">
                Role *
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                placeholder="Your role/title"
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="useCase">
                Primary Use Case *
              </label>
              <select
                id="useCase"
                name="useCase"
                value={formData.useCase}
                onChange={handleChange}
                required
              >
                <option value="">Select a use case</option>
                <option value="report-writing">Report Writing</option>
                <option value="document-processing">Intelligent Document Processing</option>
                <option value="nlp-querying">Natural Language Database Querying</option>
                <option value="medical-imaging">Medical Imaging Analysis</option>
                <option value="predictive-analytics">Predictive Analytics</option>
                <option value="other">Other (specify in message)</option>
              </select>
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="cloudPlatforms">
                Cloud Platforms
              </label>
              <div className={styles['checkbox-group']}>
                <label className={styles['checkbox-label']}>
                  <input
                    type="checkbox"
                    name="cloudPlatforms"
                    value="aws"
                    checked={formData.cloudPlatforms.includes('aws')}
                    onChange={(e) => {
                      const value = e.target.value;
                      const current = formData.cloudPlatforms.split(',').filter(v => v);
                      const updated = e.target.checked 
                        ? [...current, value].join(',')
                        : current.filter(v => v !== value).join(',');
                      setFormData(prev => ({ ...prev, cloudPlatforms: updated }));
                    }}
                  />
                  AWS
                </label>
                <label className={styles['checkbox-label']}>
                  <input
                    type="checkbox"
                    name="cloudPlatforms"
                    value="azure"
                    checked={formData.cloudPlatforms.includes('azure')}
                    onChange={(e) => {
                      const value = e.target.value;
                      const current = formData.cloudPlatforms.split(',').filter(v => v);
                      const updated = e.target.checked 
                        ? [...current, value].join(',')
                        : current.filter(v => v !== value).join(',');
                      setFormData(prev => ({ ...prev, cloudPlatforms: updated }));
                    }}
                  />
                  Azure
                </label>
                <label className={styles['checkbox-label']}>
                  <input
                    type="checkbox"
                    name="cloudPlatforms"
                    value="gcp"
                    checked={formData.cloudPlatforms.includes('gcp')}
                    onChange={(e) => {
                      const value = e.target.value;
                      const current = formData.cloudPlatforms.split(',').filter(v => v);
                      const updated = e.target.checked 
                        ? [...current, value].join(',')
                        : current.filter(v => v !== value).join(',');
                      setFormData(prev => ({ ...prev, cloudPlatforms: updated }));
                    }}
                  />
                  Google Cloud
                </label>
                <label className={styles['checkbox-label']}>
                  <input
                    type="checkbox"
                    name="cloudPlatforms"
                    value="other"
                    checked={formData.cloudPlatforms.includes('other')}
                    onChange={(e) => {
                      const value = e.target.value;
                      const current = formData.cloudPlatforms.split(',').filter(v => v);
                      const updated = e.target.checked 
                        ? [...current, value].join(',')
                        : current.filter(v => v !== value).join(',');
                      setFormData(prev => ({ ...prev, cloudPlatforms: updated }));
                    }}
                  />
                  Other
                </label>
              </div>
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your interest, timeline, or any specific questions..."
              />
            </div>

            <button 
              type="submit" 
              className={styles['submit-button']}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Collaboration Request'}
            </button>
          </form>
        )}
      </section>

      <Footer />
    </>
  );
}