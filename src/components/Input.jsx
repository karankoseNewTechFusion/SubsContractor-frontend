
import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const Input = ({ label, icon: Icon, ...props }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      fullWidth
      InputProps={{
        startAdornment: Icon && (
          <InputAdornment position="start">
            <Icon style={{ color: "#6B7280" }} />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default Input;
