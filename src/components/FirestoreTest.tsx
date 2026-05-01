import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function FirestoreTest() {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleWrite = async () => {
    setLoading(true);
    setStatus("Writing...");
    try {
      const testRef = doc(db, "test", "hello-world");
      await setDoc(
        testRef,
        {
          message: "Hello from SansiStore!",
          timestamp: serverTimestamp(),
          version: Date.now(),
        },
        { merge: true }
      );
      setStatus("Write successful!");
    } catch (err) {
      setStatus(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Firestore Test</h1>
      <p className="text-gray-600 mb-4">
        Click the button to write a test document to Firestore.
      </p>
      <button
        onClick={handleWrite}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Writing..." : "Write Test Document"}
      </button>
      {status && (
        <p className={`mt-4 ${status.startsWith("Error") ? "text-red-600" : "text-green-600"}`}>
          {status}
        </p>
      )}
    </div>
  );
}
