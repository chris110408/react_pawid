import styled from 'styled-components';
import { COLOR_MAP, BTN_HEIGHT_MAP } from '../../../CONSTANTS';

export const Divform = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -180px 0 0 -180px;
  width: 360px;
  height: 360px;
  padding: 36px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);

  h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }
  button {
    width: 50%;
  }
  .title {
    margin: -10px 0 20px 0;
    color: #000000;
  }
  .homepage {
    float: right;
    line-height: ${BTN_HEIGHT_MAP.lg};
    margin: 0 10px 0 0;
  }
`;

export const SuccessDiv = styled.div`
  color: ${COLOR_MAP.success};
  transition: color 0.3s;
`;

export const WarningDiv = styled.div`
  color: ${COLOR_MAP.warn};
  transition: color 0.3s;
`;

export const ErrorDiv = styled.div`
  color: ${COLOR_MAP.error};
  transition: color 0.3s;
`;
