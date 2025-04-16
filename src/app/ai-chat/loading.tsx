import { RiRobot2Line } from 'react-icons/ri';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg animate-pulse"></div>
          <div className="w-16 h-16 bg-black flex items-center justify-center rounded-full border-2 border-blue-400/50 relative z-10">
            <RiRobot2Line className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
          <p className="text-white/60 text-sm">Loading AI Chat...</p>
        </div>
      </div>
    </div>
  );
}
