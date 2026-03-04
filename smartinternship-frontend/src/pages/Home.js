import InternshipCard from "../components/InternshipCard";

const internships = [
  {
    title: "Frontend Developer Intern",
    company: "Google",
    location: "Remote",
    stipend: "₹20,000/month",
  },
  {
    title: "Backend Developer Intern",
    company: "Amazon",
    location: "Bangalore",
    stipend: "₹25,000/month",
  },
  {
    title: "AI/ML Intern",
    company: "TCS",
    location: "Mumbai",
    stipend: "₹18,000/month",
  },
  {
    title: "Data Analyst Intern",
    company: "Infosys",
    location: "Pune",
    stipend: "₹15,000/month",
  },
  {
    title: "Software Engineer Intern",
    company: "Microsoft",
    location: "Hyderabad",
    stipend: "₹30,000/month",
  },
  {
    title: "Web Developer Intern",
    company: "Flipkart",
    location: "Remote",
    stipend: "₹22,000/month",
  },
  {
    title: "Cloud Intern",
    company: "IBM",
    location: "Bangalore",
    stipend: "₹28,000/month",
  },
  {
    title: "Cyber Security Intern",
    company: "Wipro",
    location: "Chennai",
    stipend: "₹17,000/month",
  },
  {
    title: "DevOps Intern",
    company: "Accenture",
    location: "Gurgaon",
    stipend: "₹24,000/month",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white pt-24 px-10">

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          Launch Your Career With{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Top Internships
          </span>
        </h1>

        <p className="text-gray-300 max-w-xl mx-auto">
          Discover high-quality internship opportunities from leading companies.
          Apply instantly and take the first step towards your dream career.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
            Browse Internships
          </button>

          <button className="border border-white/30 px-6 py-3 rounded-lg hover:bg-white/10 transition">
            Learn More
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-10 mt-10 text-center text-white">

  <div>
    <h3 className="text-3xl font-bold text-purple-400">120+</h3>
    <p className="text-gray-300">Internships</p>
  </div>

  <div>
    <h3 className="text-3xl font-bold text-pink-400">45+</h3>
    <p className="text-gray-300">Companies</p>
  </div>

  <div>
    <h3 className="text-3xl font-bold text-purple-400">300+</h3>
    <p className="text-gray-300">Applications</p>
  </div>

</div>
      <h2 className="text-2xl font-semibold text-center mt-16 mb-8 text-white">
Featured Internships
</h2>

      {/* Internship Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {internships.map((internship, index) => (
          <InternshipCard key={index} {...internship} />
        ))}
      </div>
    </div>
  );
}