import styled from 'styled-components';
import { Link } from 'react-router-dom'
import symbol from '../../resource/symbol.png'

const StyledLink = styled(Link)`
  .symbol {
    width: ${props => props.sizes || '6rem'}
  }
`;

const Symbol = ({ size }) => {
  return(
    <StyledLink to='/' size={size}>
      <img className='symbol' src={symbol} alt='오늘의 데이트 심볼' />
    </StyledLink>  
);
}
export default Symbol;
