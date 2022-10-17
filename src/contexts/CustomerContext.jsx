import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../utils/config";

//creating the context
export const CustomerContext = createContext(null);

//initiating the context provider
const CustomerProvider = ({ children }) => {
  const [customerLists, setCustomerLists] = useState([]);
  const [customerListsById, setCustomerListsById] = useState();
  const [selectedIndex, setSelectedIndex] = React.useState();

  useEffect(() => {
    axios
      .get(`${API_URL}/selectCustomers`)
      .then((res) => {
        setCustomerLists(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  //getting data by id

  const getSingleData = (id, e) => {
    setSelectedIndex(id);
    axios
      .get(`${API_URL}/selectCustomerById/${id}`)
      .then((res) => {
        console.log(res.data);
        setCustomerListsById(res.data);
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
  };

  //delete
  const deleteData = (id) => {
    axios
      .delete(`${API_URL}/deleteCustomer/${id}`)
      .then((res) => {
        console.log("Deleted");
        alert("Deleted");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <CustomerContext.Provider
      value={{
        customerLists,
        setCustomerLists,
        getSingleData,
        customerListsById,
        deleteData,
        selectedIndex,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;

//consuming context
export function useAPI() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
