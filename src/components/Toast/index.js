import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { COLOR_BG } from '@utils/color';

const ToastWrapper = styled.div`
  position: absolute;
  top: -16px;
  width: 98%;
  z-index: 10000;
  text-align: center;
  font-size: 0.5rem;
  padding: 0.5rem;
  background-color: ${COLOR_BG};
  border-radius: 0.5rem;
`;

function Toast({ children }) {
  return <ToastWrapper>{children}</ToastWrapper>;
}

Toast.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Toast;
