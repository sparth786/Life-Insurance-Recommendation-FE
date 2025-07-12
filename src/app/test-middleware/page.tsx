export default function TestMiddlewarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Middleware Test Page
        </h1>
        <p className="text-gray-600">
          If you can see this page, the middleware is working correctly!
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Check the browser console for middleware logs.
        </p>
      </div>
    </div>
  );
}
