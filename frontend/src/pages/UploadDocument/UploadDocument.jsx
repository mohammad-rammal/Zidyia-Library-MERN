import "./uploadDocument.css";

const UploadDocument = () => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg rounded-lg shadow-md">
    <h1 className="text-3xl text-center text-white mb-4">Upload Document</h1>
    <form className="space-y-4">
      <div>
        <label htmlFor="library" className="block font-medium text-white">Library</label>
        <select id="library" name="library" className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50">
          <option value="lebanese_university">Lebanese University</option>
          <option value="liu">LIU</option>
          <option value="aub">AUB</option>
        </select>
      </div>
      <div>
        <label htmlFor="file" className="block font-medium text-white">Upload File</label>
        <input type="file" id="file" name="file" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50" />
      </div>
      <div>
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Submit
        </button>
      </div>
    </form>
  </div>
  );
};

export default UploadDocument;
