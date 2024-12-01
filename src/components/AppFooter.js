import { CFooter } from '@coreui/react'
import React from 'react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          TUPT
        </a>
        <span className="ms-1">&copy; 2024.</span>
      </div>
      <div className="ms-auto">
        Technological University of the Philippines
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
