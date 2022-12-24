import styled from 'styled-components'

export const CommonModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export const StyledQuestionModal = styled.div`
  max-height: calc(100vh - 100px);
`

export const StyledRegexWhole = styled.div`
  background-color: #edf2f7;
  height: calc(100% - 96px);
`

export const StyledRegexContent = styled.div`
  min-height: calc(100% - 96px);
`
