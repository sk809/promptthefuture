import { SplineScene } from '@/components/ui/SplineScene';
import { useIsMobile } from '@/hooks/use-mobile';

const SplineRobot = () => {
  const isMobile = useIsMobile();

  // Hide on mobile to prevent white popup issue
  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 w-[400px] h-[400px] z-40 pointer-events-auto">
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
};

export default SplineRobot;
