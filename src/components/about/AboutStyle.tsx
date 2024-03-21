import styled from 'styled-components'

const AboutStyle = styled.div`
  h1 {
    ${({ theme }) => theme.textStyleH1};
    color: ${({ theme }) => theme.common.colors.textPrimary};
  }

  h2 {
    ${({ theme }) => theme.textStyleH2};
    color: ${({ theme }) => theme.common.colors.textPrimary};
    padding: 30px 0 0 0;
    border-top: 3px solid ${({ theme }) => theme.common.colors.surfaceGray100};
    margin-top: 30px;
  }

  h3 {
    ${({ theme }) => theme.textStyleParagraphSemibold};
    color: ${({ theme }) => theme.common.colors.textPrimary};
    margin-top: 35px;
  }

  p {
    ${({ theme }) => theme.textStyleParagraph};
    color: ${({ theme }) => theme.common.colors.textPrimary};
    margin-bottom: 0;
  }

  ol {
    margin-top: 0;

    li {
      ${({ theme }) => theme.textStyleParagraph};
      color: ${({ theme }) => theme.common.colors.textPrimary};

      ol {
        ${({ theme }) => theme.textStyleParagraph};
        list-style-type: lower-alpha;
      }
    }
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.common.colors.textLink};

    &:hover {
      text-decoration: underline;
    }
  }
`

export default AboutStyle
