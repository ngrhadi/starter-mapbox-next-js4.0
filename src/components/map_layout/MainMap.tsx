'use client';
// eslint-disable-line import/no-webpack-loader-syntax, import/no-unresolved, import/no-extraneous-dependencies
import mapboxgl, { Map, Point } from 'mapbox-gl';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

export interface MainData {
  data: Data[];
  count: number;
}

export interface Data {
  coordinates: number[];
}

mapboxgl.accessToken =
  'pk.eyJ1IjoibmdyaGFkaSIsImEiOiJjbGFsNG9vM28wMjR3M3B1cnpscXFocTRsIn0.VWclpSU7K05hTYqDhx76Ig';

const MainMap = () => {
  const [mapRef, setMapRef] = useState<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [coordinates, setCoordinates] = useState<MainData>();

  const [lng, setLng] = useState<number | undefined>(-3.0019209);
  const [lat, setLat] = useState<number | undefined>(118.8067788);
  const [zoom, setZoom] = useState<number | undefined>(3);

  const getData = useCallback(async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/07e88d94-b1de-4e13-89c3-1851cc16019b',
      {
        method: 'GET',
      }
    );

    return response.json();
  }, []);

  useEffect(() => {
    if (mapRef !== null) return;

    mapboxgl.accessToken =
      process.env.MAPBOX_ACCESS_TOKEN ??
      'pk.eyJ1IjoibmdyaGFkaSIsImEiOiJjbDU4YjJnYXkwbnhvM2hxbjF4dzFxZ2NoIn0.iAlSXpOeV2pT4DJX2keLcA';

    const map = new mapboxgl.Map({
      container: mapContainerRef?.current!,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lat ?? 116.8067788, lng ?? -3.0019209],
      zoom: zoom ?? 4,
      minZoom: 3.5,
      doubleClickZoom: false,
      dragPan: true,
    });

    map.setProjection('equirectangular');

    map.on('load', () => {
      map.addControl(
        new mapboxgl.NavigationControl({
          showZoom: true,
          showCompass: false,
        }),
        'top-left'
      );

      getData().then((res) => {
        const coordinateList = res;

        setCoordinates(coordinateList);
      });

      if (coordinates === undefined) return;

      map?.addSource('poi-data', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: coordinates.data.map((item) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: item.coordinates,
            },
            properties: {},
          })),
        },
      });

      map?.addLayer({
        id: 'poi',
        type: 'circle',
        source: 'poi-data',
        paint: {
          'circle-radius': 7,
          'circle-color': 'rgba(30, 167, 224, 0.19)',
          'circle-stroke-color': 'blue',
          'circle-stroke-width': 2,
        },
      });

      map.on('click', 'poi', function (event) {
        new mapboxgl.Popup()
          .setLngLat(event.lngLat)
          .setHTML(`<h2 class='text-warning'>LIHAT DETAIL</h2>`)
          .addTo(map);

        setLng(event.lngLat.lng);
        setLat(event.lngLat.lat);
        setZoom(zoom ?? 4);

        map.setCenter([event.lngLat.lng, event.lngLat.lat]);
      });

      map.on('mouseenter', 'poi', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'poi', () => {
        map.getCanvas().style.cursor = '';
      });

      setMapRef(map);
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapContainerRef, lng, lat, coordinates]);

  return (
    <div className="min-w-full h-[30rem] bg-brand" ref={mapContainerRef}></div>
  );
};

export default MainMap;
