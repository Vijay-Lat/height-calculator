let currentLocation = null;
let geoLocation = null;
let A = null;
let B = null;
let distanceVal = 1
function onLoad() {
  if (window?.navigator?.geolocation) {
    geoLocation = window?.navigator?.geolocation;
  }
  if (geoLocation) {
    geoLocation.watchPosition(onLocationUpdate, onError, {
      enableHighAccuracy: true,
      maximumAge: 1000,
    });
  } else {
    alert("Cannot access Location");
  }
  function onLocationUpdate(e) {
    currentLocation = e?.coords;
    document.getElementById("distance").innerHTML =
      "Your Location:<br>lat:" +
      currentLocation?.latitude +
      "<br> lon:" +
      currentLocation?.longitude;
  }
  function onError(err) {
    alert("Cannot access location :" + err);
  }

}
function setA() {
  A = currentLocation;
  updateInfo();
}
function setB() {
  B = currentLocation;
  updateInfo();
  // window.addEventListener("deviceorientation", deviceOrientationHandler);
  // navigator?.mediaDevices
  //   .getUserMedia({ video: { facingMode: "environment" } })
  //   .then((signal) => {
  //     const video = document.getElementById("myVideo");
  //     video.srcObject = signal;
  //     video.play();
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //   });
}
function updateInfo() {
  if (A !== null) {
    document.getElementById("start").innerHTML =
      A.latitude + "<br>" + A.longitude;
  }
  if (B !== null) {
    document.getElementById("end").innerHTML =
      B.latitude + "<br>" + B.longitude;
  }
  if (A !== null && B !== null) {
    let distanceVal = getDistance(A, B);
    document.getElementById("distance").innerHTML =
      "distance" + distanceVal + "meters";
  }
}
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}
function latlonToXYZ(latlon, R) {
  const xyz = { x: 0, y: 0, z: 0 };
  xyz.y = Math.sin(degToRad(latlon?.latitude)) * R;
  const r = Math.cos(degToRad(latlon?.latitude)) * R;
  xyz.x = Math.sin(degToRad(latlon?.longitude)) * r;
  xyz.z = Math.sin(degToRad(latlon?.longitude)) * r;
  return xyz;
}
function getDistance(latlon1,latlon2) {
  const R = 6371000; // radiusOfTheEarth in meters
  const xyz1 = latlonToXYZ(latlon1, R);
  const xyz2 = latlonToXYZ(latlon2, R);
  const eucl = euclidean(xyz1, xyz2);
  return eucl;
}
function euclidean (p1,p2){
  return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.z-p2.z)+(p1.z-p2.z)*(p1.z-p2.z))
}
function deviceOrientationHandler(e) {
  let angle = e.beta - 90;
  if (angle < 0) {
    angle = 0;
  }
  //   console.log(angle);
  // const rangeDistance = document.getElementById("slider")?.value;
  // console.log(rangeDistance, "dddd");
  // const showDistance = document.getElementById("distance");
  // showDistance.innerHTML = rangeDistance + "meters away";
  // triAngulation method
  //   Math.tan always expects radians therefore  multiply it with Math.PI/180
  const height = Math.tan(angle * (Math.PI / 180)) * distanceVal;
  document.getElementById("objHeight").textContent =
    (height * 3.281).toFixed(2) + "feet tall"
}

