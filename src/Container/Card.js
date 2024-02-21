import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../css/dashboard.css";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

export default function Card() {
  return (
    <div className="total-completed-container">
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            gap: "20px",
          }}
        >
          <div>
            <Typography variant="h5" component="div">
              Card
            </Typography>
            <br />
            <Typography variant="body2" sx={{ fontSize: "20px" }}>
              100
            </Typography>
          </div>
          <div>
            <LibraryAddCheckIcon />
          </div>
        </div>
      </CardContent>
    </div>
  );
}
