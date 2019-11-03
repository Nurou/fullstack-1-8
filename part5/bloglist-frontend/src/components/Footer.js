import React from 'react'

import styled from 'styled-components'

const StyledFooter = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  background-color: #999da8;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  grid-gap: 1rem;
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
