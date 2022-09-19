import { Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';

import { database } from '../../util/firebaseFunctions';
import {
  CircularProgress,
  DialogActions,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

// Mui Icons
import AddIcon from '@mui/icons-material/Add';
import { collection } from 'firebase/firestore';
import { db } from '../../firebaseSetup';
import { useCollection } from 'react-firebase-hooks/firestore';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';

// Style
import './index.css';
import { getAuth } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router';

const AddGroup = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const auth = getAuth();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearForm();
  };

  const [fourm, setFourm] = React.useState({});
  const [isDisabled, setIsDisabled] = React.useState(false);
  const clearForm = () => setFourm({});

  const handleSubmit = () => {
    setIsDisabled(true);
    database
      .addGroup(
        {
          ...fourm,
        },
        auth
      )
      .then(() => {
        handleClose();
        enqueueSnackbar('Group added successfully', {
          variant: 'success',
        });
        setIsDisabled(false);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
        setIsDisabled(false);
      });
  };

  const handleChange = (event) => {
    setFourm({ ...fourm, [event.target.id]: event.target.value });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle>Add Group</DialogTitle>

        <DialogContent>
          <DialogContentText>
            fields marked with * are required
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Group Name'
            type='text'
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            margin='dense'
            id='description'
            label='Group Description'
            type='text'
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={isDisabled} onClick={handleSubmit} color='primary'>
            Add
          </Button>
          <Button onClick={handleClose} color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Fab
        color='primary'
        aria-label='add'
        sx={{ position: 'fixed', bottom: '8vh', right: 32 }}
        onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
    </>
  );
};

const Groups = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  // const location = useLocation();

  const [groups, loading, error] = useCollection(collection(db, 'groups'), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
      orderBy: 'name',
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteGroup = (id) => {
    handleGroupMenuClose();
    database
      .deleteGroup(id)
      .then(() => {
        enqueueSnackbar('Group deleted successfully', {
          variant: 'success',
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  const [selectedGroup, setSelectedGroup] = React.useState(null);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [error, enqueueSnackbar]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleGroupMenuClick = (event, group) => {
    setAnchorEl(event.currentTarget);
    setSelectedGroup(group);
  };
  const handleGroupMenuClose = () => {
    setAnchorEl(null);
    setSelectedGroup(null);
  };

  const menuOptions = [
    {
      requiresAuth: true,
      requiresOwner: true,
      label: 'Delete',
      icon: <DeleteIcon />,
      onClick: () => handleDeleteGroup(selectedGroup.id),
    },
  ];

  const isOptionsAvailable = (group) => {
    group = group.data();
    return menuOptions.filter((option) => {
      if (option.requiresAuth && !auth.currentUser) {
        return false;
      }
      if (option.requiresOwner && auth.currentUser.uid !== group.owner) {
        return false;
      }
      return true;
    }).length;
  };

  const handleGroupClick = (group) => {
    console.log(group.id);
    navigate(`/groups/${group.id}`);
  };

  const menuOptionsRender = menuOptions.map((option) => {
    const group = selectedGroup?.data();
    if (option.requiresAuth && !auth.currentUser) {
      return null;
    }
    if (option.requiresOwner && group?.owner !== auth.currentUser.uid) {
      return null;
    }
    return (
      <MenuItem key={option.label} onClick={option.onClick}>
        <ListItemIcon>{option.icon}</ListItemIcon>
        <ListItemText primary={option.label} />
      </MenuItem>
    );
  });

  const menuRender = () => {
    if (!selectedGroup) {
      return null;
    }
    if (menuOptionsRender?.[0] === null) {
      return null;
    }

    return (
      <Menu
        id='group-menu'
        MenuListProps={{
          'aria-labelledby': 'group-menu',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleGroupMenuClose}>
        {menuOptionsRender}
      </Menu>
    );
  };

  return (
    <main>
      <div className='center'>
        <h1>Groups 💌</h1>
        <Stack spacing={2} direction='column' className='groups'>
          {groups?.docs &&
            groups.docs.map((group) => {
              const { name } = group.data();
              return (
                <Stack key={group.id} direction='row' className='group'>
                  <h2
                    onClick={() => handleGroupClick(group)}
                    className='group__name'>
                    {name}
                  </h2>

                  <IconButton
                    disabled={!isOptionsAvailable(group)}
                    aria-label='group'
                    id='group-button'
                    aria-controls={open ? 'group-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup='true'
                    onClick={(event) => {
                      handleGroupMenuClick(event, group);
                    }}>
                    <MoreHorizIcon />
                  </IconButton>
                </Stack>
              );
            })}

          {loading && (
            <Stack direction='row' className='center'>
              <CircularProgress />
            </Stack>
          )}
        </Stack>
      </div>
      {menuRender()}
      <AddGroup />
    </main>
  );
};

export default Groups;
