import React, { useState } from 'react';

function Workspace() {
  const [formData, setFormData] = useState({
    method: 'GET',
    url: '',
    body: '',
    headers: [{ key: '', value: '' }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'method') {
      setFormData((prev) => ({
        ...prev,
        method: value,
        body: value === 'GET' ? '' : prev.body,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Header input change
  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const updatedHeaders = [...formData.headers];
    updatedHeaders[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      headers: updatedHeaders,
    }));
  };

  // Add header
  const addHeader = () => {
    setFormData((prev) => ({
      ...prev,
      headers: [...prev.headers, { key: '', value: '' }],
    }));
  };

  // Remove header
  const removeHeader = (index: number) => {
    const updatedHeaders = formData.headers.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      headers: updatedHeaders.length ? updatedHeaders : [{ key: '', value: '' }],
    }));
  };

  // Send request
  const handleSend = () => {
    console.log(formData);
  };

  // =========================
  // JSX
  // =========================
  return (
    <div className="h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-5xl mx-auto bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        {/* Request Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
          <select
            name="method"
            value={formData.method}
            onChange={handleChange}
            className="bg-zinc-800 px-4 py-2 rounded-md"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
          </select>

          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Enter request URL..."
            className="flex-1 bg-zinc-800 px-4 py-2 rounded-md"
          />

          <button onClick={handleSend} className="bg-blue-600 px-5 py-2 rounded-md">
            Send
          </button>
        </div>

        {/* Headers */}
        <div className="p-4 border-b border-zinc-800">
          <p className="font-semibold mb-3">Headers</p>

          <div className="space-y-3">
            {formData.headers.map((header, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Key"
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                  className="w-1/2 bg-zinc-800 px-3 py-2 rounded-md"
                />

                <input
                  type="text"
                  placeholder="Value"
                  value={header.value}
                  onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                  className="w-1/2 bg-zinc-800 px-3 py-2 rounded-md"
                />

                <button onClick={() => removeHeader(index)} className="bg-red-500 px-3 rounded-md">
                  X
                </button>
              </div>
            ))}
          </div>

          <button onClick={addHeader} className="mt-3 text-blue-400 text-sm">
            + Add Header
          </button>
        </div>

        {/* Body (Only if not GET) */}
        {formData.method !== 'GET' && (
          <div className="p-4">
            <p className="font-semibold mb-3">Body</p>

            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder='{\n  "name": "John"\n}'
              className="w-full h-72 bg-zinc-800 rounded-md p-4 resize-none font-mono"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Workspace;
