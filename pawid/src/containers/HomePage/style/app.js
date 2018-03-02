/**
 * Created by leichen on 12/02/2018.
 */
import styled ,{ keyframes } from 'styled-components';



export const DivApp = styled.div`
  text-align: center;
`;

export const HeaderAPP = styled.header`
  background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
`;


const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const ImgLogo = styled.img`
   animation: ${spin} infinite 20s linear;
   height: 80px;

`;

export const TitleH1 = styled.h1`
 font-size: 1.5em;
`;

export const IntroP = styled.p`
  font-size: large;
`;





