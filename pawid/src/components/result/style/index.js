import styled from 'styled-components';

export const DivResult = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -230px 0 0 -230px;
  width: 460px;
  height: 360px;
  padding: 36px;
  
  text-align: center;
  .description {
        font-size: 14px;
        line-height: 22px;
        color: @text-color-secondary;
        margin-bottom: 24px;
    }

`;

export const Divicon = styled.div`
  font-size: 72px;
  line-height: 72px;
  margin-bottom: 24px;

  & > .success {
    color: #52c41a;
  }

  & > .error {
    color: #f5222d;
  }
`;

export const DivTitle = styled.div`
  font-size: 24px;
  color: @heading-color;
  font-weight: 500;
  line-height: 32px;
  margin-bottom: 16px;
`;

//
// .result {
//     text-align: center;
//     width: 72%;
//     margin: 0 auto;
//
// .icon {
//         font-size: 72px;
//         line-height: 72px;
//         margin-bottom: 24px;
//
//     & > .success {
//             color: @success-color;
//         }
//
//     & > .error {
//             color: @error-color;
//         }
//     }
//
// .title {
//         font-size: 24px;
//         color: @heading-color;
//         font-weight: 500;
//         line-height: 32px;
//         margin-bottom: 16px;
//     }
//
// .description {
//         font-size: 14px;
//         line-height: 22px;
//         color: @text-color-secondary;
//         margin-bottom: 24px;
//     }
//
// .extra {
//         background: #fafafa;
//         padding: 24px 40px;
//         border-radius: @border-radius-sm;
//         text-align: left;
//     }
//
// .actions {
//         margin-top: 32px;
//
//         button:not(:last-child) {
//             margin-right: 8px;
//         }
//     }
// }
