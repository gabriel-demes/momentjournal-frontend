import React from "react"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@material-ui/core";

const NewGoalList = ({newGModOpen, setNewGModOpen, setTitle, makeList }) => {
    
      const handleClose = () => {
        setNewGModOpen(false);
      };


    return(
        <Dialog open={newGModOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Journal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a title for your new GoalList
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="title"
            fullWidth
            // value={newTitle}
            onChange={e=>setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e)=>{handleClose();makeList(e)}}color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default NewGoalList