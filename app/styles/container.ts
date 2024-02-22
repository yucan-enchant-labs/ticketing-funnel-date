import styled, { css } from 'styled-components';
import { fadeIn } from './animation';

interface ContainerProps {
  containerSize?: 'lg' | 'md' | 'sm';
}

interface FlexStart {
  gap?: number;
}

const boxShadowValue = '0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.03), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.05), 0px 100px 80px 0px rgba(0, 0, 0, 0.07)';


export const ContainerWrapper = styled.div<ContainerProps>`
  width: 100%;
  max-width: 100%; /* default */
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 16px;
  background: #FFF;
  box-shadow: ${boxShadowValue};
  ${props =>
    props.containerSize === 'lg' &&
    css`
      @media (min-width: 1200px) {
        max-width: 1140px; /* large (1200px) */
      }
    `}

  ${props =>
    props.containerSize === 'md' &&
    css`
      @media (min-width: 992px) {
        max-width: 960px; /md (992px - 1199px) */
      }
    `}

  ${props =>
    props.containerSize === 'sm' &&
    css`
      @media (min-width: 768px) {
        max-width: 720px; /* small (768px - 991px) */
      }
    `}
`;

export const ColCTCard = styled.div`
    display: flex;
    width: 100%;
    // height: 46px;
    padding: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    border: 1px solid #D5D4DF;
    cursor: pointer;

    &:hover{
      padding-left: 32px;
      padding-right: 20px;
      // animation: ${fadeIn} 0.3s ease;
      transition: 0.5s;
    };
`;

export const RowSBCard = styled.div`
    display: flex;
    width: 100%;
    // height: 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // flex-shrink: 0;
    align-self: stretch;
`;

export const RowFSCard = styled.div<FlexStart>`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const PaymentOptContainer = styled.div`
  font-family: "Proxima Nova";
  font-size: 16px;
  line-height: 20px;
  box-sizing: border-box;
  border: 1px solid #bbbbbb;
  border-radius: 8px;

  .el-collapse-item__header {
    padding: 0 16px;
  }

  .el-collapse-item__arrow {
    display: none;
  }
`;

export const PaymentOptContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 10px;
  background: rgb(242, 239, 234);
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #bbbbbb;
  text-align: center;
`;

export const StripeContainer = styled.div`
width: calc(100% - 32px);
padding: 12px 1rem 12px 1rem;
background-color: #ffffff;
color: #041c2c !important;
border-radius: 4px;
`;