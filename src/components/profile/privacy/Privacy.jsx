import { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { UserService } from "src/services/DatabaseService";
import { useUserStore } from "src/store/userStore";
import { geohashForLocation } from "geofire-common";
import useUserInfo from "src/shared/hooks/fetch/useUserInfo";
import { useQueryClient } from "react-query";

const Container = styled.div`
  width: 50vw;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  font-family: Arial, sans-serif;
  margin-bottom: 32px;
`;

const Privacy = () => {
  const queryClient = useQueryClient();
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);

  const [deny, setDeny] = useState(false);
  const [location, setLocation] = useState({
    latitude: currentUser.location.latitude,
    longitude: currentUser.location.longitude,
  });

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setDeny(false);
        },
        (_error) => {
          console.log(_error);
          setDeny(true);
        }
      );
    } else {
      setDeny(true);
    }
  };

  const save = async () => {
    await UserService.update(currentUserId, {
      location: {
        ...location,
        denyExposingLocation: deny,
        geohash: deny
          ? null
          : geohashForLocation([location.latitude, location.longitude]),
      },
    });
    queryClient.invalidateQueries(["user", currentUserId]);
  };

  return (
    <Container>
      <h2>Quyền riêng tư</h2>
      <div className="privacy-content">
        <p className="info">
          Để cung cấp trải nghiệm tốt nhất, chúng tôi sẽ thu thập và sử dụng vị
          trí của bạn. Bằng cách nhấn vào nút dưới đây, bạn đồng ý với chính
          sách bảo mật của chúng tôi.
          <br />1 vài tính năng có thể không hiện hữu nếu bạn bỏ qua bước này.
        </p>
        <p style={{ fontWeight: "600" }}>
          {currentUser.location.denyExposingLocation
            ? "Bạn đã từ chối cung cấp vị trí"
            : `Vị trí hiện tại của bạn: ${location.latitude} - ${location.longitude}`}
        </p>
        <div className="action">
          <Button variant="contained" className="button" onClick={getLocation}>
            Cập nhật vị trí
          </Button>
          <Button variant="contained" className="button" onClick={save}>
            Lưu
          </Button>
        </div>
        <span>
          Nếu bạn từ chối, vui lòng làm theo hướng dẫn tại
          <a href="https://support.google.com/chrome/answer/142065?hl=en">
            Chrome Location Guide
          </a>
          và bấm lại nút.
        </span>
      </div>
    </Container>
  );
};

export default Privacy;
