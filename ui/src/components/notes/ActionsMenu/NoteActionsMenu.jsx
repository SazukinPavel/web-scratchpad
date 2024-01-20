import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router-dom";

export default function NoteActionsMenu() {
  const navigate = useNavigate();

  const onAddClick = () => {
    navigate("/notes/add");
  };

  const actions = [{ icon: <AddBoxIcon />, name: "New", onClick: onAddClick }];

  return (
    <SpeedDial
      ariaLabel="SpeedDial controlled open example"
      sx={{ position: "fixed  ", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          onClick={action.onClick}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
