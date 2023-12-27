import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  color: ${({ theme }) => theme.COLORS.GREY_300};

  margin-bottom: 8px;
  border-radius: 10px;

  > input {
    height: 56px;
    width: 100%;
    padding: 12px;

    border: none;
    color: ${({ theme }) => theme.COLORS.WHITE};
    background-color: transparent;

    &:placeholder {
      color: ${({ theme }) => theme.COLORS.GREY_300};
    }
  }
  > svg {
    margin-left: 16px;
  }
`
