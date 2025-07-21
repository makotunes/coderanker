import Footer from "~/components/footer";

export default function Contact() {
  return (
    <>
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="mb-2">For questions or inquiries, please contact us at the email address below.</p>
          <p className="font-semibold text-blue-700">info@example.com (temporary)</p>
        </div>
      </div>
      <Footer />
    </>
  );
} 