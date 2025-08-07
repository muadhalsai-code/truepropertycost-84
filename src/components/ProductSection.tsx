import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Scan, FileText, Star, Users, DollarSign } from "lucide-react";
import aiDashboard from "@/assets/ai-dashboard.jpg";
const ProductSection = () => {
  const steps = [{
    icon: Upload,
    title: "Upload",
    description: "Property docs or developer contracts",
    detail: "Drag & drop any PDF, image, or document"
  }, {
    icon: Scan,
    title: "Scan",
    description: "AI analyzes 37+ fee categories and regulatory traps",
    detail: "Advanced ML algorithms detect hidden costs"
  }, {
    icon: FileText,
    title: "Get Report",
    description: "Cost breakdown + risk score in 5 minutes",
    detail: "Comprehensive analysis with actionable insights"
  }];
  const stats = [{
    icon: Users,
    number: "4,200+",
    label: "Professionals Served"
  }, {
    icon: DollarSign,
    number: "87K AED",
    label: "Average Client Savings"
  }, {
    icon: Star,
    number: "4.9/5",
    label: "Professional Rating"
  }];
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Founder Message */}
      </div>
    </section>
  );
};
export default ProductSection;