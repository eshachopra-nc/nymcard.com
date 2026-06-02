import { Section } from "@/components/sections/Section";

// ── Privacy Policy — /legal/privacy ────────────────────────────────────────
//
// The Global Privacy Policy, mirrored VERBATIM from 02-copy/Global-Privacy-
// Policy.md (fetched from the live WordPress). Legal copy: kept in its own
// first-person voice, not the marketing third-person rule. Static long-form
// document → server component. Clean reading column with a sticky table of
// contents on desktop. Tokens only, light + dark.

type Block =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "h3"; text: string };

type Sec = { n: number; title: string; blocks: Block[] };

const p = (text: string): Block => ({ kind: "p", text });
const ul = (items: string[]): Block => ({ kind: "ul", items });
const h3 = (text: string): Block => ({ kind: "h3", text });

const CONTENT: Sec[] = [
  {
    n: 1,
    title: "Introduction",
    blocks: [
      p(`This Privacy Policy ("Policy") outlines how NymCard Payment Services LLC (UAE), NymCard Payments LTD (UAE), Nym Technologies Holding Limited (UAE), NymCard Payment Technologies (Egypt), NymCard SAL (Lebanon), NymCard Technologies (Private) Limited (Pakistan), Nym For Information Technology (Saudi Arabia), NymCard Payments Tech LLC (Qatar), and NymCard LTD (UK) (collectively referred to as "NymCard," "we," "us," or "our") collect, use, share, and protect your information when you access our website at www.nymcard.com and any associated services (collectively, the "Platform" or "Services").`),
      p(`We are committed to respecting your privacy and maintaining the security of your personal information. This Policy outlines our data collection, processing, and security practices across all the countries where we operate in compliance with applicable data protection laws in the United Arab Emirates (UAE), United Kingdom (UK), Egypt, Saudi Arabia, Pakistan, Lebanon, Oman, and Qatar.`),
    ],
  },
  {
    n: 2,
    title: "Why We Collect and Process Personal Data",
    blocks: [
      p(`We collect and process personal data to ensure the secure and efficient operation of our services while maintaining compliance with legal and regulatory requirements. Our data processing activities support essential business functions, safeguard user information, and enhance service quality.`),
      p(`Specifically, we collect and process personal data to:`),
      ul([
        `Provide our services as a third-party payments processor, including transaction facilitation, identity verification, and fraud prevention.`,
        `Manage relationships with suppliers and service providers to ensure seamless operations.`,
        `Conduct recruitment and hiring processes for evaluating candidates and maintaining employment records.`,
        `Maintain employee, contractor, and staff relationships to fulfill payroll, benefits, and administrative obligations.`,
        `Comply with legal, regulatory, and fraud prevention requirements, including anti-money laundering (AML) and data protection laws.`,
        `Enhance security, risk assessment, and customer service by protecting against unauthorized access, improving user experience, and resolving inquiries effectively.`,
      ]),
      p(`By processing personal data lawfully and transparently, we aim to protect privacy, uphold regulatory obligations, and deliver reliable services.`),
    ],
  },
  {
    n: 3,
    title: "Who is Your Data Controller?",
    blocks: [
      p(`The NymCard entity responsible for your personal data depends on your location and the services you use. Each entity within NymCard operates in compliance with applicable data protection laws and acts as the data controller when processing personal data for its own purposes.`),
      p(`However, when NymCard processes personal data on behalf of a bank, fintech, or financial institution, those entities serve as the data controllers, determining how personal data is collected, used, and shared. In such cases, NymCard acts as a data processor, handling personal data strictly in accordance with contractual agreements and the instructions of the data controller.`),
    ],
  },
  {
    n: 4,
    title: "Personal Information We Collect",
    blocks: [
      p(`We might collect different categories of personal data, including:`),
      h3(`4.1 Standard Personal Data`),
      ul([
        `Full name`,
        `Contact details (email, phone number, address)`,
        `Government-issued identification (passport, national ID)`,
        `Payment card details (card number, expiry date, CVV)`,
        `Bank account details`,
        `Bank account statements`,
        `Tax identification numbers`,
      ]),
      h3(`4.2 Special Personal Data (Processed Only With Consent)`),
      ul([`Race or ethnic origin`, `Biometric data`]),
      h3(`4.3 Automatically Collected Data`),
      ul([
        `Technical Data: IP address, device type, operating system`,
        `Usage Data: Website session details, interactions, navigation patterns`,
        `Location Data: Only with your consent`,
      ]),
      h3(`4.4 Data from Third Parties`),
      ul([
        `Credit bureaus`,
        `Financial institutions`,
        `Fraud detection services`,
        `Public databases`,
      ]),
    ],
  },
  {
    n: 5,
    title: "How We Use Your Personal Information",
    blocks: [
      p(`We use the personal data we collect to deliver secure, compliant, and efficient services while protecting users from fraud and ensuring regulatory adherence. Our data processing practices are designed to enhance service quality, improve security, and support business operations.`),
      p(`Specifically, we use personal data for:`),
      ul([
        `Providing our services, including card issuance, transaction processing, and payment facilitation.`,
        `Fraud detection and risk management to prevent unauthorized transactions and enhance security.`,
        `Identity verification and compliance with Know Your Customer (KYC) and Anti-Money Laundering (AML) regulations.`,
        `Improving customer experience and support through service enhancements, issue resolution, and communication.`,
      ]),
      p(`It is important to note that we do not use your personal data for marketing purposes. We do not send promotional materials, newsletters, or advertisements, and we do not share your personal information with third parties for their marketing purposes.`),
      p(`Any use of tracking technologies or cookies for content personalization is conducted using anonymous data and does not involve marketing or profiling based on personally identifiable information.`),
    ],
  },
  {
    n: 6,
    title: "Bases for Processing Personal Information",
    blocks: [
      p(`We process personal data based on the following lawful grounds:`),
      ul([
        `Consent: When you provide explicit consent for specific processing activities, such as marketing communications or the handling of special categories of data.`,
        `Legal Obligations: To comply with regulatory requirements, including anti-money laundering (AML) laws, tax regulations, and data protection laws.`,
        `Legitimate Interests: To support essential business functions such as fraud prevention, security enhancement, and operational efficiency, ensuring our services remain reliable and secure.`,
        `Contractual Necessity: To fulfill agreements with our customers, including processing transactions, issuing payment instruments, and providing requested services.`,
      ]),
      p(`Each processing activity is conducted in accordance with applicable privacy laws to ensure data protection, transparency, and accountability.`),
    ],
  },
  {
    n: 7,
    title: "Who Has Access to Your Personal Data?",
    blocks: [
      p(`Access to your personal data is strictly controlled and limited to authorized parties necessary for service delivery, security, and compliance. These include:`),
      ul([
        `NymCard employees and contractors who require access to perform their job responsibilities, all bound by strict confidentiality agreements.`,
        `Trusted service providers, such as payment processors, fraud detection agencies, and identity verification firms, who assist in securely processing transactions and mitigating risks.`,
        `Regulatory authorities and law enforcement agencies when disclosure is legally required to comply with applicable laws and regulations.`,
      ]),
      p(`We do not sell your personal data to third parties for commercial purposes.`),
    ],
  },
  {
    n: 8,
    title: "Data Breach Notification",
    blocks: [
      p(`We take data breaches seriously and have measures in place to detect, mitigate, and respond to any security incidents. In the event of a data breach involving personal data, we will:`),
      ul([
        `Assess the nature and extent of the breach.`,
        `Contain and mitigate the breach to prevent further unauthorized access.`,
        `Notify affected financial institutions and partners promptly.`,
        `Report the breach to relevant regulatory authorities as required by law.`,
        `Provide guidance and support to affected parties, including recommended security measures.`,
      ]),
      p(`Our response process aligns with applicable data protection regulations, including UK GDPR, UAE data protection laws, and regional financial sector guidelines.`),
    ],
  },
  {
    n: 9,
    title: "Information Sharing and Disclosure",
    blocks: [
      p(`We may share personal data with authorized entities to facilitate our services, ensure compliance, and maintain security. These include:`),
      ul([
        `Customers (banks and fintechs): To support service delivery, including transaction processing and identity verification.`,
        `Affiliates within our corporate group: For operational efficiency, compliance, and internal business processes.`,
        `Third-party service providers: Including IT infrastructure providers, KYC verification services, and fraud monitoring solutions that assist in secure and compliant service execution.`,
        `Regulators and law enforcement agencies: When legally required to comply with regulatory obligations, investigations, or lawful requests.`,
      ]),
      p(`All data-sharing activities are conducted in accordance with applicable privacy laws and contractual safeguards to protect personal information.`),
    ],
  },
  {
    n: 10,
    title: "Transfers to Third-Party Countries",
    blocks: [
      p(`We may transfer personal data across international borders while ensuring:`),
      ul([
        `Compliance with local data protection regulations in all relevant jurisdictions.`,
        `Implementation of Standard Contractual Clauses (SCCs) or other legally recognized safeguards to protect data during transfers.`,
        `Robust encryption and access controls to maintain the confidentiality and security of transferred data.`,
        `All data transfers are conducted securely and in accordance with applicable privacy laws to ensure the protection of personal information.`,
      ]),
    ],
  },
  {
    n: 11,
    title: "How We Protect and Retain Your Personal Data",
    blocks: [
      h3(`Data Security Measures`),
      p(`We implement industry-recognized security standards and frameworks to safeguard personal data against unauthorized access, disclosure, alteration, and destruction. Our approach aligns with international best practices and includes the following controls:`),
      ul([
        `Encryption protocols to ensure secure storage and transmission of sensitive data, both at rest and in transit.`,
        `Strict access controls, including role-based permissions and multi-factor authentication (MFA), to limit access to authorized personnel only.`,
        `Continuous monitoring, vulnerability assessments, and regular security audits to detect and respond to potential threats in a timely manner.`,
        `Adherence to ISO/IEC 27001 standards for information security management and PCI DSS 4.0 requirements for the protection of payment card data.`,
        `Ongoing security awareness training and incident response planning to reduce operational risks and promote a strong security culture.`,
      ]),
      p(`These technical and organizational measures are reviewed and updated regularly to remain compliant with evolving regulations and threats.`),
      h3(`Data Retention`),
      ul([
        `We retain personal data "only for as long as necessary" to fulfill legal, contractual, or regulatory requirements.`,
        `Once the retention period expires, data is "securely deleted or anonymized" in accordance with compliance guidelines.`,
      ]),
      p(`Our approach ensures data confidentiality, integrity, and compliance with applicable privacy laws.`),
    ],
  },
  {
    n: 12,
    title: "Automated Decision Making",
    blocks: [
      p(`We may use automated processes to:`),
      ul([`Approve or deny applications`, `Prevent fraud`, `Assess risk`]),
      p(`You have the right to request human intervention if automated decisions impact you.`),
    ],
  },
  {
    n: 13,
    title: "Cookies and Tracking Technologies",
    blocks: [
      p(`We do not use cookies or tracking technologies to collect personally identifiable information for marketing purposes, nor do we share personal data with third parties for advertising or promotional activities.`),
    ],
  },
  {
    n: 14,
    title: "Your Rights and Choices",
    blocks: [
      p(`Your rights may vary based on your location and applicable data protection laws. Depending on your jurisdiction, you may have the right to:`),
      ul([
        `Access the personal data we hold about you.`,
        `Request corrections to any inaccurate or outdated information.`,
        `Request deletion of your personal data, subject to legal and regulatory requirements.`,
        `Object to the processing of your data for specific purposes.`,
        `Withdraw consent where data processing is based on your prior authorization.`,
      ]),
      p(`To exercise any of these rights, please contact us at dpo@nymcard.com.`),
    ],
  },
  {
    n: 15,
    title: "Supplemental Notices",
    blocks: [
      p(`We may issue additional privacy notices tailored to specific products, services, or jurisdictions to address unique regulatory requirements or data processing practices.`),
    ],
  },
  {
    n: 16,
    title: "Changes to This Privacy Policy",
    blocks: [
      p(`We update this Policy periodically. Any changes will be posted on www.nymcard.com.`),
    ],
  },
  {
    n: 17,
    title: "Third-Party Website Links",
    blocks: [
      p(`Our website may contain links to third-party sites. We are not responsible for their privacy policies.`),
    ],
  },
];

const anchor = (n: number) => `section-${n}`;

export function PrivacyPolicy() {
  return (
    <Section bg="white" ariaLabel="Global Privacy Policy">
      {/* Header */}
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl dark:text-text-on-brand">
          Global Privacy Policy
        </h1>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* Sticky table of contents — desktop only. */}
        <nav aria-label="Sections" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
              Contents
            </p>
            <ol className="flex flex-col gap-2">
              {CONTENT.map((s) => (
                <li key={s.n}>
                  <a
                    href={`#${anchor(s.n)}`}
                    className="font-body text-[13px] leading-snug text-text-secondary transition-colors hover:text-brand-primary dark:text-text-dark-secondary dark:hover:text-accent-cyan"
                  >
                    {s.n}. {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="font-body text-[13px] leading-snug text-text-secondary transition-colors hover:text-brand-primary dark:text-text-dark-secondary dark:hover:text-accent-cyan"
                >
                  18. Contact Us
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* Document body */}
        <div className="min-w-0 max-w-3xl">
          {CONTENT.map((s) => (
            <section key={s.n} id={anchor(s.n)} className="scroll-mt-28 border-t border-surface-border-subtle pt-10 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-10 dark:border-surface-dark-border">
              <h2 className="font-display text-xl font-semibold tracking-tight text-text-primary sm:text-2xl dark:text-text-on-brand">
                {s.n}. {s.title}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {s.blocks.map((b, i) => {
                  if (b.kind === "h3") {
                    return (
                      <h3 key={i} className="mt-2 font-display text-base font-semibold text-text-primary dark:text-text-on-brand">
                        {b.text}
                      </h3>
                    );
                  }
                  if (b.kind === "ul") {
                    return (
                      <ul key={i} className="flex flex-col gap-2 pl-1">
                        {b.items.map((it, j) => (
                          <li key={j} className="flex gap-3 font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                            <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-brand-primary/60 dark:bg-accent-cyan/60" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={i} className="font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                      {b.text}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}

          {/* §18 Contact — email + office address. */}
          <section id="contact" className="scroll-mt-28 mt-10 border-t border-surface-border-subtle pt-10 dark:border-surface-dark-border">
            <h2 className="font-display text-xl font-semibold tracking-tight text-text-primary sm:text-2xl dark:text-text-on-brand">
              18. Contact Us
            </h2>
            <div className="mt-4 flex flex-col gap-4 font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              <p>
                Email:{" "}
                <a
                  href="mailto:dpo@nymcard.com"
                  className="font-medium text-brand-primary underline underline-offset-4 transition-colors hover:text-brand-purple dark:text-accent-cyan"
                >
                  dpo@nymcard.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-text-primary dark:text-text-on-brand">Office Address:</span>
                <br />
                Office #2703, Al Salam Tecom Tower, Sheikh Zayed Rd, Al Sufouh,
                P.O. Box 451240, Dubai, United Arab Emirates
              </p>
            </div>
          </section>
        </div>
      </div>
    </Section>
  );
}
