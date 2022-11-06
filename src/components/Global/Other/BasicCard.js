import React from 'react'

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


function BasicCard({ typeItem, item, count, note, id, ...props }) {

  return (
    <Card sx={{ minWidth: 80 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {typeItem}
        </Typography> */}
        <Typography color="primary.main" variant="h5" component="div">
          {item}
        </Typography>
        {count >= 0 && (
          <Typography color="text.secondary">
            Počet položek: {count}
          </Typography>
        )}
          {/* {{ note } !== "" && <Typography variant="body2">{note}</Typography>} */}
      </CardContent>
      <CardActions>
        <Button
          disabled
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => props.edit(id)}
        >
          Upravit
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={(e) => props.delete(id, e)}
        >
          Vymazat
        </Button>
      </CardActions>
    </Card>
  );
}

export default BasicCard;