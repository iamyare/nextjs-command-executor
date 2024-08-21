'use client'
export default function loading() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/80 z-50 animate-loading glow"></div>
      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        .animate-loading {
          animation: loading 2s infinite;
        }
      `}</style>
    </>
  );
}