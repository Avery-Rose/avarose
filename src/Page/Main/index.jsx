import { Avatar, IconButton, InputBase } from '@mui/material';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebaseSetup';
import SendIcon from '@mui/icons-material/Send';
import { UserContext } from '../../context/UserContext';

import './index.css';
import Tooltip from '@mui/material/Tooltip/Tooltip';

import { SnackbarProvider, useSnackbar } from 'notistack';

const Main = () => {
  const { enqueueSnackbar } = useSnackbar();

  const name = 'Avery Rose';

  return (
    <main>
      <span>Avery Rose</span>
    </main>
  );
};

export default Main;
