export default function ContactSection() {
    return (
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Contact Us</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="p-3 rounded-md border col-span-1"
              placeholder="First Name"
            />
            <input
              className="p-3 rounded-md border col-span-1"
              placeholder="Last Name"
            />
            <input
              className="p-3 rounded-md border md:col-span-2"
              placeholder="Email Address"
              type="email"
            />
            <textarea
              className="p-3 rounded-md border md:col-span-2"
              rows="5"
              placeholder="Leave a Message"
            ></textarea>
            <button
              type="submit"
              className="bg-purple-700 text-white rounded-md py-3 px-6 hover:bg-purple-800 md:col-span-2"
            >
              Send a Message
            </button>
          </form>
        </div>
      </section>
    );
  }
  