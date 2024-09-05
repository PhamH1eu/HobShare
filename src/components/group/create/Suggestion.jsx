import React, { useState } from 'react';
import { Avatar, TextField, Typography, Box, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';

// Sample data for friend suggestions
const suggestions = [
  { name: 'Nguyen Trung Hieu', mutualFriends: 19, avatar: 'link-to-avatar-1' },
  { name: 'Thụ Nhân', mutualFriends: 51, avatar: 'link-to-avatar-2' },
  { name: 'Tuấn Anh-nichan', mutualFriends: 44, avatar: 'link-to-avatar-3' },
  { name: 'Thu Hieu', mutualFriends: 5, avatar: 'link-to-avatar-4' },
  { name: 'Nguyễn Đăng Hải', mutualFriends: 69, avatar: 'link-to-avatar-5' },
];

// Styled suggestion list container
const SuggestionBox = styled(Box)({
  position: 'absolute',
  top: '60px',
  left: 0,
  right: 0,
  backgroundColor: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  maxHeight: '200px',
  overflowY: 'auto',
  zIndex: 1000,
});

const SuggestionItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const AvatarWrapper = styled(Avatar)({
  marginRight: '10px',
});

const FriendSuggestions = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleClickAway = () => {
    setShowSuggestions(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box position="relative" width="100%">
        <TextField
          label="Mời bạn bè"
          placeholder="Nhập tên hoặc địa chỉ email"
          fullWidth
          onFocus={handleFocus}
        />
        {showSuggestions && (
          <SuggestionBox>
            <Typography variant="body2" color="textSecondary" style={{ padding: '10px' }}>
              Gợi ý
            </Typography>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem key={index}>
                <AvatarWrapper src={suggestion.avatar} />
                <Box>
                  <Typography variant="body1">{suggestion.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {suggestion.mutualFriends} bạn chung
                  </Typography>
                </Box>
              </SuggestionItem>
            ))}
          </SuggestionBox>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default FriendSuggestions;
