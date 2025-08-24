import React from 'react'
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
     <>
      {(
        <div className="flex justify-center items-center h-40">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      )}
    </>
  )
}

export default Loading
