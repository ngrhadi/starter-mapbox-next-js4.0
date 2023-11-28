import MainMap from '@/components/map_layout/MainMap';

export default function Home() {
  return (
    <main className="">
      <div className="flex lg:h-64 h-24 min-w-screen flex-col items-center justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/kaleka-copyright 1.png"
          alt="banner-home"
          height={20}
        />
      </div>
      <div className="flex min-h-screen/10vh min-w-screen flex-col items-center justify-between lg:px-24 px-5">
        <MainMap />
      </div>
    </main>
  );
}
