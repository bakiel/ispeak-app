'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Global Error
            </h1>
            <p className="text-gray-600 mb-8">
              Something went wrong at the application level.
            </p>
            <button
              onClick={() => reset()}
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-yellow-300"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}