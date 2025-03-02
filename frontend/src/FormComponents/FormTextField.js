import React from "react";
import { Grid2 as Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const FormTextField = ({name, control, label, autoFocus, half, type, handleShowPassword}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        return <Grid size={{ xs: 12, sm: half ? 6 : 12, md: half ? 6 : 12 }}>
          <TextField
            name={name}
            onChange={onChange}
            value={value}
            half
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            error={!!error}
            helperText={error?.message ?? null}
            slotProps={
              name === "password"
                ? {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword}>
                            {type === "password" ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }
                : null
            }
          />
        </Grid>
      }}
    />
  );
};

export default FormTextField;
