import React from 'react'

import styled from 'styled-components'

const StyledFooter = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
`

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        Created by <em>Joel Hassan</em> © 2019
      </p>
    </StyledFooter>
  )
}

export default Footer
