import { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

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
  const [deny, setDeny] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setDeny(false);
        },
        // eslint-disable-next-line no-unused-vars
        (_error) => {
          setDeny(true);
        }
      );
    } else {
      setDeny(true);
    }
  };

  const handleDeny = () => {
    setDeny(true);
  }

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
        <div className="action">
          <Button variant="contained" className="button" onClick={getLocation}>
            Đồng ý
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
