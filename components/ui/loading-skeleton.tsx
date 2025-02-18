export default function LoadingSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse">
            <div className="bg-gray-200 h-48 rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductLoadingSkeleton() {
  return (
    <div className="container grid grid-cols-1 gap-8 py-8 lg:grid-cols-2">
      <div className="aspect-square animate-pulse rounded-lg bg-gray-200" />
      <div className="space-y-4">
        <div className="h-8 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200" />
        <div className="h-24 w-full animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}