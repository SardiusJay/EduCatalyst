import { BookOpen, Search, ShieldCheck, Users, BarChart2, Globe, Layers, FileText } from 'lucide-react';

const features = [
  {
    title: "Find Your Perfect Match",
    description: "Our smart matching algorithm connects educators with relevant sponsors, ensuring a higher success rate for funding requests.",
    icon: <Search className="text-blue-600" />,
  },
  {
    title: "Track your Funding Progress",
    description: "Our real-time tracking feature allows educators to monitor their funding progress, receive updates, and make adjustments as needed.",
    icon: <BookOpen className="text-purple-600" />,
  },
  {
    title: "Secure and Reliable Payment Processing",
    description: "Our secure payment processing feature ensures safe and reliable transactions, protecting educators and sponsors from fraud and financial loss.",
    icon: <ShieldCheck className="text-red-500" />,
  },
  {
    title: "Dedicated Support for Your Funding Needs",
    description: "Our personalized support feature provides dedicated assistance, guidance, and support throughout the funding process.",
    icon: <Users className="text-indigo-600" />,
  },
  {
    title: "Data-Driven Funding Insights",
    description: "Our funding analytics feature provides educators with valuable insights and data to inform their funding strategies and optimize their results.",
    icon: <BarChart2 className="text-green-600" />,
  },
  {
    title: "Connect with Our Community",
    description: "Our community forum provides a platform for educators and sponsors to connect, share ideas, and collaborate on funding initiatives.",
    icon: <Globe className="text-gray-700" />,
  },
  {
    title: "Diversify Your Funding Channels",
    description: "Our multi-channel funding feature allows educators to access multiple funding sources and channels, increasing their chances of securing funding.",
    icon: <Layers className="text-teal-600" />,
  },
  {
    title: "Streamline Your Funding Reporting",
    description: "Our automated reporting feature provides educators with streamlined and automated reporting, saving time and reducing administrative burdens.",
    icon: <FileText className="text-amber-600" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white py-16 px-4" id="features">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-800">Explore our Amazing Features</h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Learn How Our Features Can Transform Your Funding Experience.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-md font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
