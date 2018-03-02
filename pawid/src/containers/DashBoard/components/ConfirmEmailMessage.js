import React from 'react';
import Result from '../../../components/result'
import styled from 'styled-components';

const DivTitle = styled.div`
   margin-top: 32px;
    font-size: 20px;
    line-height: 28px;
`;

export const ConfrimEmailMessage = () => {



   return  <Result
        type="error"
        title={
            <DivTitle>
                Please verify your email
            </DivTitle>
        }
        description='please check your email and click the link we sent to you'
    />


}




