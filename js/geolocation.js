function geolocationSupport() {
  return "geolocation" in navigator;
}

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 100000,
};

export function getCurrentPosition(options = defaultOptions) {
  if (!geolocationSupport())
    throw new Error("No hay soporte de geolocalizacion en tu navegador");

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const location = {
          latitude,
          longitude,
        };
        resolve(location);
      },
      () => {
        reject("no hemos podido obtener tu ubicacion");
      },
      options
    );
  });
}
