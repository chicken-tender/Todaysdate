import { Link } from "react-router-dom";
import styled from "styled-components";
import MuiCheckbox from "../../Join/Checkbox";

export const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap || ""};
  margin-left: 1rem;
`;

export const StyledCheckbox = styled(MuiCheckbox)`
  width: 1rem;
  height: 1rem;
`;

export const SelectAllButton = styled.button`
  display: flex;
  align-items: center;
  margin: 10px 0 0 -8px;
  line-height: 1.4rem;
  background-color: var(--line-color);
  border: 1px solid var(--hover-color);
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: var(--hover-color);
  }
`;

export const TitleLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text-color);
  &:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  margin-top: 10px;
  align-self: flex-start;
  line-height: 1.4rem;
  background-color: var(--line-color);
  border: 1px solid var(--hover-color);
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: var(--point-color);
    color: #ffffff;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid var(--line-color);
  padding: 10px 0;
  gap: 10px;
  margin: 0 auto;
  p {
    color: var(--input-text-color);
    font-size: 0.8rem;
  }
`;