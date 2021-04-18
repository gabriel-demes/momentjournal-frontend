import React from "react"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@material-ui/core";

const NewGuest = ({newGuestModOpen, setNewGuestModOpen, setCode, addUser, errors }) => {
    
      const handleClose = () => {
        setNewGuestModOpen(false);
      };

      const handleErrors = () => {
        return (
          errors?.map(error => <DialogContentText style={{color:"red"}}>{error}</DialogContentText>)
          )
      }


    return(
        <Dialog open={newGuestModOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Guest</DialogTitle>
        <DialogContent>

          {handleErrors()}
        
        <DialogContentText>
            Please enter the unique User Code of the guest you want to add.
        </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Code"
            fullWidth
            onChange={e=>setCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e)=>{addUser(e)}}color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default NewGuest