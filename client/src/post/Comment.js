import React, { Component } from 'react';
import { comment, uncomment } from './apiPost';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DefaultProfile from '../images/avatar.jpg';
import Picker from 'emoji-picker-react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {timeDifference} from './timeDifference';

import '../css/Comment.css';

clss 