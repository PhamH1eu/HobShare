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

import { useUserStore } from "src/store/userStore";

import "leaflet/dist/leaflet.css";
import "./map.css";
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
  return <Marker ref={leafletRef} {...props} />;
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
  const location = [21.0331457, 105.7932597];
  const location2 = [21.037059731294864, 105.79445387505912];

  const circleRef = useRef();
  const [loading, setLoading] = useState(false);
  const [defaultDistance, setDistance] = useState(2);
  const handleChange = (event, value) => {
    console.log(value);
    setLoading(true);
    animateCircleRadius(
      circleRef.current,
      defaultDistance * 1000,
      value * 1000
    );
    setDistance(value);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <LoadingCircleSlide loading={loading} />
      <MapContainer
        style={{
          height: "calc(100vh - 64px)",
          width: "100vw",
          marginTop: "64px",
        }}
        center={location}
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
            center={location}
            pathOptions={{ fillColor: "blue" }}
            radius={defaultDistance * 1000}
          />
        </LayerGroup>
        <AutoOpenMarkerPopup position={location}>
          <Popup
            autoClose={false}
            closeOnEscapeKey={false}
            closeOnClick={false}
          >
            <StyledLink to={`/profile/${currentUserId}`}>
              <UserCardWrapper>
                <Avatar src="https://firebasestorage.googleapis.com/v0/b/reactchat-3358f.appspot.com/o/users%2FuRWlcplqyQd42640j55iZtDOI4h1%2Favatar.jpg?alt=media&token=037b60b7-c75a-4d26-ac97-38d779de2c45" />
                <Username>Hieu321321312321321213231132</Username>
              </UserCardWrapper>
            </StyledLink>
          </Popup>
        </AutoOpenMarkerPopup>
        <AutoOpenMarkerPopup position={location2}>
          <Popup
            autoClose={false}
            closeOnEscapeKey={false}
            closeOnClick={false}
          >
            <UserCardWrapper>
              <Avatar src="https://firebasestorage.googleapis.com/v0/b/reactchat-3358f.appspot.com/o/users%2FuRWlcplqyQd42640j55iZtDOI4h1%2Favatar.jpg?alt=media&token=037b60b7-c75a-4d26-ac97-38d779de2c45" />
              <Username>Hieu</Username>
            </UserCardWrapper>
          </Popup>
        </AutoOpenMarkerPopup>
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
          disabled={loading}
        />
      </div>
    </>
  );
};

export default MapPage;
