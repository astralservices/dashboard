import { Region } from "../../../types";
import { useState, useEffect } from "react";

export default function RegionPingChecker({ region }: { region: Region }) {
  const [ping, setPing] = useState<number>();

  useEffect(() => {
    let loaded = false;
    const start = new Date().getTime();
    const image = new Image();
    image.src = `https://speedtest-${region.id.replace(".", "-")}.astralapp.io`;
    image.onload = () => {
      setPing(new Date().getTime() - start);
      loaded = true;
    };
    image.onerror = () => {
      setPing(new Date().getTime() - start);
      loaded = true;
    };
    setTimeout(() => {
      if (!loaded) {
        setPing(-1);
        image.remove();
      }
    }, 5000);
  }, []);

  return (
    <>
      {ping && (
        <>
          {ping === -1 && (
            <span className="text-xs text-red-500">Ping: {ping} ms</span>
          )}
          {ping > 500 && (
            <span className="text-xs text-orange-500">Ping: {ping} ms</span>
          )}
          {ping > 0 && ping < 500 && (
            <span className="text-xs text-green-500">Ping: {ping} ms</span>
          )}
        </>
      )}
    </>
  );
}
