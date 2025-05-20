export default function Loader() {
  return (
    <div className="flex items-center space-x-2 text-center justify-center px-4 py-10">
      <span className="loading loading-spinner loading-md"></span>
      <span className="text-sm text-gray-600">
        AIが採点しています。しばらくお待ちください。
      </span>
    </div>
  );
}
