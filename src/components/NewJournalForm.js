import React, {useState} from "react"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@material-ui/core";

const NewJournalForm = ({modOpen, setModOpen,  newJournal }) => {
    // const [open, setOpen] = useState(false)

    // const handleClickOpen = () => {
    //     setOpen(true);
    //   };
    // const [newTitle, setNewTitle] = useState("")
    
        const [newTitle, setNewTitle] = useState("")
      const handleClose = () => {
        setModOpen(false);
      };


    return(
        <Dialog open={modOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="test">New Journal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a title for your new MomentJournal
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="title"
            fullWidth
            // value={newTitle}
            onChange={e=>setNewTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e)=>{handleClose();newJournal(e, newTitle)}}color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default NewJournalForm