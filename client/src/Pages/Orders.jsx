import React, { useEffect, useState } from 'react'
import { NavBar } from '../Components/NavBar'
import { UserNotLogin } from '../Components/UserNotLogin';

export const Orders = () => {

  const [userID, SetUserID] = useState("");

  useEffect(() => {
    if (localStorage.getItem("ShopZa")) {
      SetUserID(localStorage.getItem("ShopZa"))
    }
  })

  return (
    <>
      <NavBar page="Orders" />
      {userID===""?
      <UserNotLogin />
      :
      null
      }
    </>
  )
}