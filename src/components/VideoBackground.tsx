export default function VideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      crossOrigin="anonymous"
      className="fixed top-0 left-0 min-w-full min-h-full object-cover -z-10"
    >
      <source src="https://res.cloudinary.com/dkgjl08a5/video/upload/v1736328057/login-bg_g9jlfv.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
