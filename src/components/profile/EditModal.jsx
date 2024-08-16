import styled from "styled-components";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

import useEditableText from "src/shared/hooks/useEditableText";

const Container = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  svg {
    cursor: pointer;
  }
`;

const Title = styled.h2`
  margin: 0;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const EditableText = styled.div`
  margin-left: 10px;
  flex-grow: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ProfileEdit = ({ handleClose }) => {
  const {
    value: bioText,
    isEditing: isEditingBio,
    show: showBio,
    handleToggle: handleShowBio,
    handleEdit: handleBioEdit,
    handleChange: handleBioChange,
    handleSave: handleBioSave,
  } = useEditableText("blank");

  const {
    value: workText,
    isEditing: isEditingWork,
    show: showWork,
    handleToggle: handleShowWork,
    handleEdit: handleWorkEdit,
    handleChange: handleWorkChange,
    handleSave: handleWorkSave,
  } = useEditableText("Làm việc tại CMC Global");

  const {
    value: educationText,
    isEditing: isEditingEducation,
    show: showEducation,
    handleToggle: handleShowEducation,
    handleEdit: handleEducationEdit,
    handleChange: handleEducationChange,
    handleSave: handleEducationSave,
  } = useEditableText("Đại học Công Nghệ - ĐHQGHN");

  const {
    value: currentCity,
    isEditing: isEditingCurrentCity,
    show: showCurrentCity,
    handleToggle: handleShowCurrentCity,
    handleEdit: handleCurrentCityEdit,
    handleChange: handleCurrentCityChange,
    handleSave: handleCurrentCitySave,
  } = useEditableText("Cầu Giấy, Hà Nội");

  const {
    value: homeTown,
    isEditing: isEditingHomeTown,
    show: showHomeTown,
    handleToggle: handleShowHomeTown,
    handleEdit: handleHomeTownEdit,
    handleChange: handleHomeTownChange,
    handleSave: handleHomeTownSave,
  } = useEditableText("Lạc Thuỷ, Hoà Bình");

  return (
    <Container>
      <Header>
        <Title>Chỉnh sửa chi tiết</Title>
        <CloseIcon onClick={handleClose} />
      </Header>

      <Section>
        <h3>Tiểu sử</h3>
        <Item>
          <Switch checked={showBio} onChange={handleShowBio} />
          <EditableText>
            {isEditingBio ? (
              <TextField
                value={bioText}
                onChange={handleBioChange}
                onBlur={handleBioSave}
                autoFocus
                fullWidth
              />
            ) : (
              <span>{bioText}</span>
            )}
          </EditableText>
          <EditIcon onClick={handleBioEdit} style={{ cursor: "pointer" }} />
        </Item>
      </Section>

      <Section>
        <h3>Công việc</h3>
        <Item>
          <Switch checked={showWork} onChange={handleShowWork} />
          <EditableText>
            {isEditingWork ? (
              <TextField
                value={workText}
                onChange={handleWorkChange}
                onBlur={handleWorkSave}
                autoFocus
                fullWidth
              />
            ) : (
              <span>{workText}</span>
            )}
          </EditableText>
          <EditIcon onClick={handleWorkEdit} style={{ cursor: "pointer" }} />
        </Item>
      </Section>

      <Section>
        <h3>Học vấn</h3>
        <Item>
          <Switch checked={showEducation} onChange={handleShowEducation} />
          <EditableText>
            {isEditingEducation ? (
              <TextField
                value={educationText}
                onChange={handleEducationChange}
                onBlur={handleEducationSave}
                autoFocus
                fullWidth
              />
            ) : (
              <span>{educationText}</span>
            )}
          </EditableText>
          <EditIcon
            onClick={handleEducationEdit}
            style={{ cursor: "pointer" }}
          />
        </Item>
      </Section>

      <Section>
        <h3>Tỉnh/Thành phố hiện tại</h3>
        <Item>
          <Switch checked={showCurrentCity} onChange={handleShowCurrentCity} />
          <EditableText>
            {isEditingCurrentCity ? (
              <TextField
                value={currentCity}
                onChange={handleCurrentCityChange}
                onBlur={handleCurrentCitySave}
                autoFocus
                fullWidth
              />
            ) : (
              <span>{currentCity}</span>
            )}
          </EditableText>
          <EditIcon
            onClick={handleCurrentCityEdit}
            style={{ cursor: "pointer" }}
          />
        </Item>
      </Section>

      <Section>
        <h3>Quê quán</h3>
        <Item>
          <Switch checked={showHomeTown} onChange={handleShowHomeTown} />
          <EditableText>
            {isEditingHomeTown ? (
              <TextField
                value={homeTown}
                onChange={handleHomeTownChange}
                onBlur={handleHomeTownSave}
                autoFocus
                fullWidth
              />
            ) : (
              <span>{homeTown}</span>
            )}
          </EditableText>
          <EditIcon
            onClick={handleHomeTownEdit}
            style={{ cursor: "pointer" }}
          />
        </Item>
      </Section>

      <ButtonContainer>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginRight: "10px" }}
          onClick={handleClose}
        >
          Hủy
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Lưu
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default ProfileEdit;
