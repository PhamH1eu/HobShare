// @ts-nocheck
import { useRef, useEffect, useState } from "react";
import {
  Circle,
  LayerGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import styled from "styled-components";
import StyledLink from "src/shared/components/StyledLink";
import DiscreteSlider from "./Slider";
import LoadingCircleSlide from "./Loading";

import L from "leaflet";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import "./map.css";

import { useUserStore } from "src/store/userStore";
import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";
import useMapDistance from "src/shared/hooks/fetch/map/useMapDistance";

const icon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const UserCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
`;

const Username = styled.span`
  font-weight: 600;
  font-saize: 1.2rem;
  max-width: 80px;
  word-break: break-word;
`;

const AutoOpenMarkerPopup = (props) => {
  const leafletRef = useRef();
  useEffect(() => {
    leafletRef.current.openPopup();
  }, []);
  return <Marker ref={leafletRef} {...props} icon={icon} />;
};

const animateCircleRadius = (circle, startRadius, endRadius) => {
  const duration = 300; // duration in milliseconds
  const startTime = performance.now();

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentRadius = startRadius + (endRadius - startRadius) * progress;

    if (circle) {
      circle.setRadius(currentRadius);
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

const MapPage = () => {
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);
  const [defaultDistance, setDistance] = useState(2);
  const { users, isLoading, isRefetching } = useMapDistance(
    defaultDistance,
    currentUser.location.latitude,
    currentUser.location.longitude
  );

  const circleRef = useRef();

  const handleChange = async (event, value) => {
    animateCircleRadius(
      circleRef.current,
      defaultDistance * 1000,
      value * 1000
    );
    setDistance(value);
  };

  return (
    <>
      <LoadingCircleSlide loading={isRefetching || isLoading} />
      <MapContainer
        style={{
          height: "calc(100vh - 64px)",
          width: "100vw",
          marginTop: "64px",
        }}
        center={[currentUser.location.latitude, currentUser.location.longitude]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayerGroup>
          <Circle
            ref={circleRef}
            center={[
              currentUser.location.latitude,
              currentUser.location.longitude,
            ]}
            pathOptions={{ fillColor: "blue" }}
            radius={defaultDistance * 1000}
          />
        </LayerGroup>
        {users?.map((user, index) => {
          return (
            <AutoOpenMarkerPopup
              key={index}
              position={[user.location.latitude, user.location.longitude]}
            >
              <Popup
                autoClose={false}
                closeOnEscapeKey={false}
                closeOnClick={false}
              >
                <StyledLink to={`/profile/${user.id}`}>
                  <UserCardWrapper>
                    <Avatar src={user.avatar}></Avatar>
                    <Username>{user.username}</Username>
                  </UserCardWrapper>
                </StyledLink>
              </Popup>
            </AutoOpenMarkerPopup>
          );
        })}
        {}
      </MapContainer>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "calc((100vw - 320px)/2)",
          zIndex: 1000,
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          padding: "10px 20px",
          textAlign: "center",
        }}
      >
        Phạm vi khoảng cách
        <DiscreteSlider
          defaultDistance={defaultDistance}
          handleChange={handleChange}
          disabled={isLoading || isRefetching}
        />
      </div>
    </>
  );
};

export default MapPage;
