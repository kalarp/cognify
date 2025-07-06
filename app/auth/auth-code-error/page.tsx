export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 shadow-xl p-8">
        <h1 className="text-2xl font-bold text-error mb-4">
          Authentication Error
        </h1>
        <p className="text-base-content/70">
          There was a problem with your authentication code. Please try signing
          in again.
        </p>
      </div>
    </div>
  );
}
