import { SplineScene } from '@/components/ui/SplineScene';

const SplineRobot = () => {
  return (
    <div className="fixed bottom-0 right-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] z-40 pointer-events-auto">
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
};

export default SplineRobot;
