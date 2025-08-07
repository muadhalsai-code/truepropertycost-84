import { Calendar, Shield, Scale, User, MapPin, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import logo from "@/assets/logo.png";

const Privacy = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={logo} alt="True Property Cost Calculator" className="h-16 w-auto mr-4" />
              <div>
                <h1 className="text-3xl font-bold">
                  True<span className="text-accent">Property</span> Cost Calculator
                </h1>
                <p className="text-primary-foreground/80">Privacy Policy & Data Protection</p>
              </div>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Effective Date: July 20, 2024</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1 h-full bg-primary"></div>
          <CardContent className="p-8 md:p-12">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pl-4 relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                Introduction
              </h2>
              <p className="text-muted-foreground mb-4">
                True Property Cost Calculator ("we", "us", or "our") operates the website https://truepropertycostcalculator.com/ (the "Service"). We are committed to protecting your privacy and handling your personal information in compliance with the UAE Data Protection Law (Federal Decree-Law No. 45 of 2021) and other applicable regulations.
              </p>
              
              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                <p className="font-medium">
                  <strong>Key Principle:</strong> We collect minimal personal data required to provide our property cost calculation services. Your information is securely stored and never sold to third parties.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pl-4 relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                Information We Collect
              </h2>
              <p className="text-muted-foreground mb-4">
                To provide accurate property cost calculations in the UAE, we collect:
              </p>
              <ul className="list-none space-y-2 ml-6">
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  <strong>Property Information:</strong> Location, property type, value, size, and other details you input for calculation purposes
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  <strong>Technical Data:</strong> IP address, browser type, device information, and usage patterns
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  <strong>Optional Account Data:</strong> If you create an account, we collect name, email address, and encrypted password
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  <strong>Communication Data:</strong> If you contact us, we may retain correspondence information
                </li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pl-4 relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-4">
                We use collected information exclusively for:
              </p>
              <ul className="list-none space-y-2 ml-6">
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Providing accurate property cost calculations for UAE real estate
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Improving our calculator algorithms and user experience
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Responding to inquiries and providing customer support
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Sending service-related communications (if you opt-in)
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Complying with UAE legal obligations and regulations
                </li>
              </ul>
            </section>

            {/* UAE Compliance Badge */}
            <div className="bg-muted/50 p-6 rounded-lg flex items-start gap-4 mb-8">
              <Scale className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">UAE Data Protection Compliance</h3>
                <p className="text-muted-foreground">
                  Our privacy practices fully comply with UAE Federal Decree-Law No. 45 of 2021. We adhere to data minimization, purpose limitation, and security principles required by UAE law.
                </p>
              </div>
            </div>

            {/* Legal Basis */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pl-4 relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                Legal Basis for Processing (UAE Compliance)
              </h2>
              <p className="text-muted-foreground mb-4">
                Under UAE law, we process your data based on:
              </p>
              <ul className="list-none space-y-2 ml-6">
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  <strong>Consent:</strong> When you voluntarily provide information for calculations
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  <strong>Contractual Necessity:</strong> To provide the services you request
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  <strong>Legal Obligation:</strong> To comply with UAE regulatory requirements
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  <strong>Legitimate Interests:</strong> For service improvement and security, balanced with your rights
                </li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pl-4 relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                Data Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal data. Limited sharing occurs only with:
              </p>
              <ul className="list-none space-y-2 ml-6">
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Service providers who assist in operating our website (under strict confidentiality agreements)
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Legal authorities when required by UAE law or to protect our rights
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Business transfer recipients in case of merger or acquisition, with prior notice
                </li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pl-4 relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                Your Rights Under UAE Law
              </h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-none space-y-2 ml-6 mb-6">
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Access your personal information
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Correct inaccurate data
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Request deletion of your data
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Withdraw consent for processing
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Object to certain processing activities
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Request data portability (where applicable)
                </li>
                <li className="relative">
                  <span className="absolute -left-6 text-primary font-bold">•</span>
                  Lodge complaints with UAE data protection authorities
                </li>
              </ul>
              
              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                <p className="font-medium">
                  <strong>To exercise these rights</strong>, please contact our Data Protection Officer using the information below. We respond to all legitimate requests within 30 days as required by UAE law.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 pl-4 relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-accent"></div>
                Contact Us
              </h2>
              <p className="text-muted-foreground mb-6">
                For privacy-related inquiries or to exercise your rights:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Data Protection Officer
                    </h3>
                    <p className="text-muted-foreground mb-2">Email: dpo@truepropertycostcalculator.com</p>
                    <p className="text-muted-foreground">Phone: +971 4 123 4567</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Registered Office
                    </h3>
                    <p className="text-muted-foreground mb-1">True Property Cost Calculator FZCO</p>
                    <p className="text-muted-foreground mb-1">Dubai Internet City</p>
                    <p className="text-muted-foreground mb-1">Building 12, Office 301</p>
                    <p className="text-muted-foreground">Dubai, UAE</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button onClick={handlePrint} className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print This Policy
              </Button>
            </section>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2024 True Property Cost Calculator. All rights reserved.</p>
          <p className="text-primary-foreground/80 mb-4">
            Compliant with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="/" className="text-accent hover:underline">Home</a>
            <a href="/privacy-ar" className="text-accent hover:underline">العربية</a>
            <a href="#" className="text-accent hover:underline">Terms of Service</a>
            <a href="#" className="text-accent hover:underline">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;